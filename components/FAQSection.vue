<script setup lang="ts">
import { useApiStore } from "@/stores/api";

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

onMounted(async () => {
  await apiStore.getQuestions();
});
</script>
<template>
  <div
    class="bg-[#1062c4] px-4 sm:px-8 md:px-12 lg:px-[100px] py-8 sm:py-10 md:py-[45px]"
  >
    <h2
      class="text-[50px] font-bold text-white text-center tracking-[-1px] sm:tracking-[-1.50px] mb-6 sm:mb-8 md:mb-11"
    >
      Principais dúvidas
    </h2>

    <Accordion
      v-if="!loading"
      type="single"
      collapsible
      class="w-full max-w-[854px] mx-auto"
    >
      <AccordionItem
        v-for="(item, index) in questions"
        :key="index"
        :value="`item-${index}`"
        :class="[
          'mb-4 sm:mb-6 p-4 sm:p-6 rounded-[10px]',
          index === 0 ? 'bg-[#4185d6]' : 'bg-white',
        ]"
      >
        <AccordionTrigger
          :class="[
            'cursor-pointer flex items-center justify-between w-full text-xs sm:text-sm tracking-[-0.24px] ',
            index === 0 ? 'font-bold text-white' : 'font-medium text-[#1b1e1e]',
          ]"
        >
          {{ item.title }}
        </AccordionTrigger>
        <AccordionContent
          v-if="item.description"
          class="mt-2 sm:mt-3 text-xs sm:text-sm"
          :class="index === 0 ? 'text-white' : 'text-[#1b1e1e]'"
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
</template>
