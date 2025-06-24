<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const apiStore = useApiStore();

const STORAGE_URL = 'https://dbs-minio.b5gal9.easypanel.host/verticaltendas';

const getFullImageUrl = (path: string | null | undefined): string => {
	if (!path) return '';
	if (path.startsWith('http')) return path;
	return `${STORAGE_URL}/${path}`;
};

const banners = computed(() => apiStore.banners);
const loadingBanner = computed(() => apiStore.loadingBanner);

onMounted(async () => {
  await apiStore.getBanners();
});

function splitTitle(title: string) {
  const words = title.trim().split(" ");
  return {
    part1: words.slice(0, 1).join(" "),
    part2: words.slice(1, 3).join(" "),
    part3: words.slice(3).join(" "),
  };
}
</script>

<template>
  <section class="relative w-full bg-white overflow-hidden">
    <div
      v-if="banners.length > 0"
      class="relative w-full overflow-hidden"
    >
      <Carousel
        class="w-full h-full"
        :opts="{
          loop: true,
        }"
      >
        <CarouselContent>
          <template v-if="!loadingBanner">
            <CarouselItem
              v-for="(banner, index) in banners"
              :key="index"
              class="relative w-full"
            >
              <a :href="banner.link" class="block w-full">
                <picture class="w-full">
                  <source
                    :srcset="getFullImageUrl(banner.imageMobile)"
                    media="(max-width: 768px)"
                  />
                  <img
                    :src="getFullImageUrl(banner.image)"
                    :alt="banner.alt"
                    class="w-full h-auto object-cover"
                  />
                </picture>
                <!-- TEXTO DESKTOP -->
                <div
                  class="absolute top-1/2 left-4 transform -translate-y-1/2 md:left-20 max-w-xl px-2 hidden md:block"
                >
                  <h1
                    class="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-snug tracking-tight"
                    v-if="banner.title"
                  >
                    <span class="font-bold">{{
                      splitTitle(banner.title).part1
                    }}</span>
                    <span class="text-[#efb511] font-bold ml-1">{{
                      splitTitle(banner.title).part2
                    }}</span>
                    <span class="ml-1">{{
                      splitTitle(banner.title).part3
                    }}</span>
                  </h1>
                  <p v-if="banner.subtitle" class="mt-4 text-white text-base md:text-xl">
                    {{ banner.subtitle }}
                  </p>
                </div>
                <!-- TEXTO MOBILE -->
                <div
                  class="absolute top-1/2 left-4 transform -translate-y-1/2 max-w-xl px-2 md:hidden"
                >
                  <h1
                    class="text-white text-2xl sm:text-3xl font-bold leading-snug tracking-tight"
                    v-if="banner.titleMobile"
                  >
                    {{ banner.titleMobile }}
                  </h1>
                  <p v-if="banner.subtitleMobile" class="mt-4 text-white text-base">
                    {{ banner.subtitleMobile }}
                  </p>
                </div>
              </a>
            </CarouselItem>
          </template>
          <template v-else>
            <CarouselItem class="relative w-full">
              <Skeleton class="w-full h-full" />
            </CarouselItem>
          </template>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
</template>
