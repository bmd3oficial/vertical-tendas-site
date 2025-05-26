<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useApiStore } from "@/stores/api";

const apiStore = useApiStore();
const about = computed(() => apiStore.about);

onMounted(async () => {
  await apiStore.getAbout();
});
</script>

<template>
  <section class="px-4 sm:px-8 lg:px-16 py-16">
    <!-- Container com largura máxima de 1400px -->
    <div class="max-w-[1400px] mx-auto">
      <h1 class="font-bold text-[40px] text-[#1B1E1E]">Sobre</h1>

      <div v-if="about">
        <!-- Seção Sobre -->
        <div class="flex flex-col lg:flex-row justify-between gap-8">
          <div class="w-full order-2 lg:order-1" v-if="about.text">
            <p
              class="text-[#000000]"
              v-html="about.text.replace(/\n/g, '<br />')"
            ></p>
          </div>

          <div class="w-full order-1 lg:order-2">
            <img
              class="rounded-lg w-full"
              :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${about.image}`"
              :alt="about.name"
            />
          </div>
        </div>

        <!-- Missão, Visão e Valores -->
        <div class="flex flex-col lg:flex-row mt-16 gap-8">
          <div class="flex-1" v-if="about.mission">
            <h2 class="font-bold text-[40px] text-[#1B1E1E]">Missão</h2>
            <p
              class="text-[#665244]"
              v-html="about.mission.replace(/\n/g, '<br />')"
            ></p>
          </div>

          <div class="flex-1" v-if="about.vision">
            <h2 class="font-bold text-[40px] text-[#1B1E1E]">Visão</h2>
            <p
              class="text-[#665244]"
              v-html="about.vision.replace(/\n/g, '<br />')"
            ></p>
          </div>

          <div class="flex-1" v-if="about.values">
            <h2 class="font-bold text-[40px] text-[#1B1E1E]">Valores</h2>
            <p
              class="text-[#665244]"
              v-html="about.values.replace(/\n/g, '<br />')"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
