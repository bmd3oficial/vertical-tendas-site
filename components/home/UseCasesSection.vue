<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import type { IProduct } from "~/types";
import { Skeleton } from "@/components/ui/skeleton";

const apiStore = useApiStore();
const products = computed(() => apiStore.products);
const loadingProduct = computed(() => apiStore.loadingProduct);

const useCases = ref<
  { id: string; title: string; description: string; image: string }[]
>([]);

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

watchEffect(() => {
  if (products.value.length >= 2) {
    const selected = getRandomItems(products.value, 2);
    useCases.value = selected.map((product: IProduct) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      image: product.images[0]?.image || "/fallback.png",
    }));
  }
});
</script>

<template>
  <section
    class="flex flex-col md:flex-row items-stretch gap-6 px-4 sm:px-8 lg:px-16 py-16 w-full"
  >
    <template v-if="!loadingProduct">
      <div
        v-for="(useCase, index) in useCases"
        :key="index"
        class="flex-1 w-full bg-[#e9e9e9] rounded-[20px] overflow-hidden border-[#eaeaea]"
      >
        <NuxtLink :to="{ name: 'product-id', params: { id: useCase.id } }">
          <div
            class="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[520px] group"
          >
            <img
              :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${useCase.image}`"
              :alt="useCase.title"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
            />

            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30"
            />

            <div
              class="absolute bottom-6 left-4 sm:bottom-10 sm:left-6 md:bottom-[111px] md:left-[50px] text-white z-10"
            >
              <h3
                class="text-2xl sm:text-3xl md:text-[50px] font-bold leading-tight max-w-[300px] md:max-w-[324px]"
              >
                {{ useCase.title }}
              </h3>
              <p
                class="text-sm sm:text-base mt-3 max-w-[300px] md:max-w-[324px] leading-snug"
              >
                {{
                  useCase.description.length > 150
                    ? useCase.description.slice(0, 150) + "..."
                    : useCase.description
                }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center gap-4 content-center w-full">
        <Skeleton class="h-[520px] w-full overflow-hidden rounded-[20px]" />
        <Skeleton class="h-[520px] w-full overflow-hidden rounded-[20px]" />
      </div>
    </template>
  </section>
</template>
