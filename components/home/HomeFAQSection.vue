<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { ref } from "vue";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Skeleton } from "@/components/ui/skeleton";

const apiStore = useApiStore();
const questions = computed(() => apiStore.questions);
const loading = computed(() => apiStore.loadingQuestion);

// Estado para controlar qual item está ativo
const activeItem = ref<string | null>(null);

// Função para atualizar o item ativo
const handleValueChange = (value: string | string[] | undefined) => {
  // Como estamos usando type="single", o valor sempre será string ou undefined
  activeItem.value = typeof value === "string" ? value : null;
};

onMounted(async () => {
  await apiStore.getQuestions();
});
</script>
<template>
  <section
    class="sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-[100px] relative w-full"
    id="duvidas"
  >
    <div
      class="bg-[#1062c4] rounded-[20px] px-4 sm:px-8 md:px-12 lg:px-[100px] py-8 sm:py-10 md:py-[45px]"
    >
      <h2
        class="text-2xl sm:text-[26px] md:text-[30px] font-bold text-white text-center tracking-[-1px] sm:tracking-[-1.50px] mb-6 sm:mb-8 md:mb-11"
      >
        Principais dúvidas
      </h2>

      <Accordion
        v-if="!loading"
        type="single"
        collapsible
        class="w-full max-w-[854px] mx-auto"
        @update:model-value="handleValueChange"
      >
        <AccordionItem
          v-for="(item, index) in questions"
          :key="index"
          :value="`item-${index}`"
          :class="[
            'mb-4 sm:mb-6 p-4 sm:p-6 rounded-[10px] transition-colors duration-200',
            activeItem === `item-${index}` ? 'bg-[#4185d6]' : 'bg-white',
          ]"
        >
          <AccordionTrigger
            :class="[
              'cursor-pointer flex items-center justify-between w-full text-xs sm:text-sm tracking-[-0.24px] transition-colors duration-200',
              activeItem === `item-${index}`
                ? 'font-bold text-white [&>svg]:text-white'
                : 'font-medium text-[#1b1e1e] [&>svg]:text-[#1b1e1e]',
            ]"
          >
            {{ item.title }}
          </AccordionTrigger>
          <AccordionContent
            v-if="item.description"
            class="mt-2 sm:mt-3 text-xs sm:text-sm transition-colors duration-200"
            :class="
              activeItem === `item-${index}` ? 'text-white' : 'text-[#1b1e1e]'
            "
          >
            {{ item.description }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div v-else class="grid gap-3 sm:gap-4 max-w-[854px] mx-auto">
        <Skeleton
          v-for="index in 3"
          :key="index"
          class="h-[50px] sm:h-[65px] md:h-[80px] lg:h-[110px] overflow-hidden rounded-[10px] sm:rounded-[20px] w-full"
        />
      </div>
    </div>
  </section>
</template>
