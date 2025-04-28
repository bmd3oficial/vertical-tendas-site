<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const route = useRoute();
const router = useRouter();

const apiStore = useApiStore();
const product = computed(() => apiStore.product);
const loadingProduct = computed(() => apiStore.loadingProduct);
const products = computed(() => apiStore.products);

const useCases = ref<
  { id: string; title: string; description: string; image: string }[]
>([]);

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
  if (route.params.id) {
    await apiStore.getProduct(`${route.params.id}`);
    await apiStore.getProducts();
  } else {
    router.push({ name: "index" });
  }
});
</script>

<template>
  <section class="px-4 sm:px-8 lg:px-16 py-16 grid gap-16">
    <p class="text-[#1B1E1E] text-5xl text-[40px] font-bold">
      {{ product?.name }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-24">
      <div>
        <div v-if="loadingProduct">
          <Skeleton class="w-full h-64 rounded-lg" />
        </div>

        <div v-else>
          <Carousel class="w-full">
            <CarouselContent>
              <CarouselItem
                v-for="(image, index) in product?.images"
                :key="index"
              >
                <img
                  :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${image.image}`"
                  alt="Imagem do Produto"
                  class="w-full h-[472px] object-cover rounded-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <div v-if="loadingProduct" class="space-y-4">
          <Skeleton class="h-8 w-3/4" />
          <Skeleton class="h-6 w-full" />
          <Skeleton class="h-4 w-5/6" />
        </div>

        <div v-else>
          <h2 class="text-[#665244]">
            {{ product?.description }}
          </h2>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-stretch gap-6 w-full pt-4">
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
              class="text-xl sm:text-2xl md:text-[25px] font-bold text-[#1b1e1e]"
            >
              {{ useCase.title }}
            </h3>
            <p class="text-[#6a6a6a] text-base leading-6">
              {{ useCase.description }}
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

    <HomeFAQSection />
  </section>
</template>
