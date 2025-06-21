<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import type { IAnuncio } from "~/types";

const apiStore = useApiStore();
const anuncios = computed(() => apiStore.anuncios);

onMounted(async () => {
  await apiStore.getAnuncios();
});
</script>

<template>
  <section
    class="flex flex-col md:flex-row items-stretch gap-6 px-4 sm:px-8 lg:px-16 py-16 w-full"
  >
    <div
      v-for="(anuncio, index) in anuncios"
      :key="index"
      class="flex-1 w-full bg-[#e9e9e9] rounded-[20px] overflow-hidden border-[#eaeaea]"
    >
      <a :href="anuncio.link">
        <div
          class="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[520px] group"
        >
          <img
            :src="anuncio.image"
            :alt="anuncio.title"
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
              {{ anuncio.title }}
            </h3>
            <p
              class="text-sm sm:text-base mt-3 max-w-[300px] md:max-w-[324px] leading-snug"
            >
              {{
                anuncio.description.length > 150
                  ? anuncio.description.slice(0, 150) + "..."
                  : anuncio.description
              }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
