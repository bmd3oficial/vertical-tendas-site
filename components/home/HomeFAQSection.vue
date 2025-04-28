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
  <section class="px-16 py-[100px] relative w-full" id="duvidas">
    <div class="bg-[#1062c4] rounded-[20px] px-[100px] py-[45px]">
      <h2
        class="text-[30px] font-bold text-white text-center tracking-[-1.50px] mb-11"
      >
        Principais dúvidas
      </h2>

      <Accordion
        v-if="!loading"
        type="single"
        collapsible
        class="max-w-[854px] mx-auto"
      >
        <AccordionItem
          v-for="(item, index) in questions"
          :key="index"
          :value="`item-${index}`"
          :class="[
            'mb-6 p-6 rounded-[10px]',
            index === 0 ? 'bg-[#4185d6]' : 'bg-white',
          ]"
        >
          <AccordionTrigger
            :class="[
              'cursor-pointer flex items-center justify-between w-full text-sm  tracking-[-0.24px] ',
              index === 0
                ? 'font-bold text-white'
                : 'font-medium text-[#1b1e1e]',
            ]"
          >
            {{ item.title }}
          </AccordionTrigger>
          <AccordionContent
            v-if="item.description"
            class="mt-3 text-sm"
            :class="index === 0 ? 'text-white' : 'text-[#1b1e1e]'"
          >
            {{ item.description }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div v-else class="grid gap-4">
        <Skeleton
          v-for="index in 3"
          :key="index"
          class="h-[50px] sm:h-[80px] md:h-[110px] overflow-hidden rounded-[20px] w-full"
        />
      </div>
    </div>
  </section>
</template>
