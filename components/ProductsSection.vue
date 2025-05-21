<script setup lang="ts">
import { useApiStore } from "@/stores/api";

import { Skeleton } from "@/components/ui/skeleton";
import type { IProduct } from "~/types";

const apiStore = useApiStore();
const products = computed(() => apiStore.products);
const loadingProduct = computed(() => apiStore.loadingProduct);

const currentIndex = ref(0);
const visibleProducts = ref<IProduct[]>([]);
const itemsToShow = ref(1);

const updateVisibleProducts = () => {
  visibleProducts.value = products.value.slice(
    currentIndex.value,
    currentIndex.value + itemsToShow.value
  );
};

const updateItemsToShow = () => {
  itemsToShow.value = 500;
  updateVisibleProducts();
};

onMounted(async () => {
  await apiStore.getProducts();
  updateItemsToShow();
});
</script>

<template>
  <div class="relative w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      <template v-if="!loadingProduct">
        <div
          v-for="(product, index) in visibleProducts"
          :key="index"
          class="border-[#eaeaea] overflow-hidden grid gap-4"
        >
          <div
            class="h-[250px] sm:h-[300px] md:h-[332px] overflow-hidden rounded-[20px]"
          >
            <NuxtLink
              :to="{ name: 'produto-slug', params: { slug: product.slug } }"
            >
              <img
                :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${product.images[0].image}`"
                :alt="product.name"
                class="w-full h-full object-cover shadow-md hover:scale-110 transition-all duration-300"
              />
            </NuxtLink>
          </div>
          <div class="grid gap-1">
            <h3
              class="text-xl sm:text-2xl md:text-[25px] font-bold text-[#1b1e1e]"
            >
              {{ product.name }}
            </h3>
            <p class="text-[#6a6a6a] text-base leading-6">
              {{
                product.description.length > 100
                  ? product.description.slice(0, 100) + "..."
                  : product.description
              }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <Skeleton
          v-for="index in 3"
          :key="index"
          class="h-[250px] sm:h-[300px] md:h-[332px] overflow-hidden rounded-[20px]"
        />
      </template>
    </div>
  </div>
</template>
