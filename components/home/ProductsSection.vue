<script setup lang="ts">
import { useApiStore } from "@/stores/api";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { IProduct } from "~/types";

const apiStore = useApiStore();
const products = computed(() => apiStore.products);
const loadingProduct = computed(() => apiStore.loadingProduct);

const currentIndex = ref(0);
const visibleProducts = ref<IProduct[]>([]);
const itemsToShow = ref(1);

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsToShow.value);
});

const currentPage = computed(() => {
  return Math.floor(currentIndex.value / itemsToShow.value);
});

const updateVisibleProducts = () => {
  visibleProducts.value = products.value.slice(
    currentIndex.value,
    currentIndex.value + itemsToShow.value
  );
};

const handleNext = () => {
  if (loadingProduct.value) {
    return;
  }

  const nextPage = currentPage.value + 1;
  currentIndex.value =
    nextPage >= totalPages.value ? 0 : nextPage * itemsToShow.value;
};

const handlePrev = () => {
  if (loadingProduct.value) {
    return;
  }

  const prevPage = currentPage.value - 1;
  currentIndex.value =
    prevPage < 0
      ? (totalPages.value - 1) * itemsToShow.value
      : prevPage * itemsToShow.value;
};

const updateItemsToShow = () => {
  itemsToShow.value =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  updateVisibleProducts();
};

onMounted(async () => {
  await apiStore.getProducts();
  updateItemsToShow();
  updateVisibleProducts();

  window.addEventListener("resize", updateItemsToShow);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItemsToShow);
});

watch([currentIndex, products], updateVisibleProducts);
</script>

<template>
  <section
    class="flex flex-col gap-12 px-4 sm:px-8 lg:px-16 py-16 w-full"
    id="produtos"
  >
    <div
      class="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-8"
    >
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-40"
      >
        <h2
          class="text-4xl sm:text-5xl lg:text-[30px] font-bold leading-tight text-[#1b1e1e]"
        >
          Nossos<br class="hidden lg:block" />Produtos
        </h2>

        <div class="w-full max-w-xs flex flex-col gap-4">
          <p class="text-base sm:text-sm text-[#1b1e1e]">
            Tendas Profissionais para Eventos, Obras e Negócios
          </p>

          <div class="flex items-center gap-2">
            <div
              v-for="i in totalPages"
              :key="i"
              :class="[
                'w-2.5 h-2.5 rounded-[5px] cursor-pointer transition-all',
                i - 1 === currentPage ? 'bg-[#1b1e1e]' : 'bg-[#e1e1e1]',
              ]"
              @click="currentIndex = (i - 1) * itemsToShow"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 self-end">
        <Button
          variant="outline"
          size="icon"
          class="rounded-full p-4 border-[#cccccc]"
          @click="handlePrev"
        >
          <ChevronLeftIcon class="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="rounded-full p-4 border-[#1b1e1e]"
          @click="handleNext"
        >
          <ChevronRightIcon class="h-5 w-5" />
        </Button>
      </div>
    </div>

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
  </section>
</template>
