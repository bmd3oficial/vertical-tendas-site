<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { Skeleton } from "@/components/ui/skeleton";

const apiStore = useApiStore();
const about = computed(() => {
  return apiStore.about;
});

const loadingProduct = computed(() => apiStore.loadingProduct);
const products = computed(() => apiStore.products);

const useCases = ref<{ title: string; description: string; image: string }[]>(
  []
);

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

watchEffect(() => {
  if (products.value.length >= 2) {
    const selected = getRandomItems(products.value, 3);
    useCases.value = selected.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      image: product.images[0]?.image || "/fallback.png",
    }));
  }
});

onMounted(async () => {
  await apiStore.getAbout();
  await apiStore.getProducts();
});

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
</script>

<template>
  <section class="px-4 sm:px-8 lg:px-16 py-16">
    <div>
      <h1 class="font-bold text-[40px] text-[#1B1E1E]">Sobre</h1>

      <span v-if="about">
        <span v-if="about.text">
          <p
            class="text-[#665244]"
            v-html="about.text.replace(/\n/g, '<br />')"
          ></p>
        </span>
      </span>
    </div>

    <div class="flex flex-col md:flex-row items-stretch gap-6 w-full pt-4 mt-5">
      <template v-if="!loadingProduct">
        <div
          v-for="(useCase, index) in useCases"
          :key="index"
          class="flex-1 w-full"
        >
          <NuxtLink :to="{ name: 'product-id', params: { id: useCase.id } }">
            <div class="rounded-[20px] overflow-hidden">
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
              </div>
            </div>
          </NuxtLink>
          <div>
            <h3
              class="text-xl sm:text-2xl mt-3 md:text-[25px] font-bold text-[#1b1e1e]"
            >
              {{ useCase.title }}
            </h3>
            <p class="text-[#6a6a6a] text-base leading-6">
              {{ truncateText(useCase.description, 100) }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center gap-4 content-center w-full">
          <Skeleton class="h-[520px] w-full overflow-hidden rounded-[20px]" />
          <Skeleton class="h-[520px] w-full overflow-hidden rounded-[20px]" />
          <Skeleton class="h-[520px] w-full overflow-hidden rounded-[20px]" />
        </div>
      </template>
    </div>
  </section>
</template>
