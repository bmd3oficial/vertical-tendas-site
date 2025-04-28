<script setup lang="ts">
import { useApiStore } from "@/stores/api";

import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

const apiStore = useApiStore();
const testimonials = computed(() => apiStore.testimonials);
const loading = computed(() => apiStore.loadingTestimonial);

const currentIndex = ref(0);
const visibleTestimonial = ref(testimonials.value[0]);

const totalPages = computed(() => testimonials.value.length);

const updateVisibleTestimonial = () => {
  visibleTestimonial.value = testimonials.value[currentIndex.value];
};

const handleNext = () => {
  currentIndex.value =
    currentIndex.value + 1 >= totalPages.value ? 0 : currentIndex.value + 1;
};

const handlePrev = () => {
  currentIndex.value =
    currentIndex.value - 1 < 0 ? totalPages.value - 1 : currentIndex.value - 1;
};

onMounted(async () => {
  await apiStore.getTestimonials();
  updateVisibleTestimonial();
});

watch([currentIndex, testimonials], updateVisibleTestimonial);
</script>

<template>
  <section
    class="flex flex-col items-start pt-[50px] px-16 relative w-full bg-white"
  >
    <div class="relative w-full">
      <div class="relative grid gap-6">
        <h2 class="text-xl font-medium text-[#1b1e1e]">Depoimentos</h2>
        <template v-if="!loading">
          <div class="flex item gap-4">
            <svg
              width="114"
              height="114"
              viewBox="0 0 114 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M113.875 1.25124L111.252 22.0241C104.734 21.5235 99.8053 22.8583 96.4667 26.0285C93.1281 29.1986 90.9819 33.5367 90.028 39.0428C89.0742 44.5488 88.8357 50.6388 89.3126 57.3128H113.875V113.875H67.1349V49.8046C67.1349 32.2853 71.1889 19.1042 79.2969 10.2611C87.5639 1.25124 99.0899 -1.75206 113.875 1.25124ZM46.865 1.25124L44.2419 22.0241C37.7237 21.5235 32.7953 22.8583 29.4568 26.0285C26.1182 29.1986 23.972 33.5367 23.0181 39.0428C22.0642 44.5488 21.8257 50.6388 22.3027 57.3128H46.865V113.875H0.125V49.8046C0.125 32.2853 4.17898 19.1042 12.287 10.2611C20.5539 1.25124 32.0799 -1.75206 46.865 1.25124Z"
                fill="#1F2023"
                fill-opacity="0.1"
              />
            </svg>

            <div
              class="max-w-[999px] text-lg text-[#1b1e1e] tracking-[-0.96px]"
            >
              "{{ visibleTestimonial?.description }}"
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <Avatar class="size-12">
                <AvatarImage
                  :src="`https://api.dicebear.com/7.x/initials/svg?seed=${visibleTestimonial?.name}`"
                  :alt="visibleTestimonial?.name"
                />
                <AvatarFallback>
                  {{ visibleTestimonial?.name?.slice(0, 2).toUpperCase() }}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 class="font-bold text-[#1b1e1e]">
                  {{ visibleTestimonial?.name }}
                </h3>
                <div class="flex items-center gap-2 mt-3">
                  <div class="flex">
                    <StarIcon
                      v-for="i in 5"
                      :key="i"
                      class="w-6 h-6"
                      :fill="
                        i <= visibleTestimonial?.stars ? '#facc1534' : 'none'
                      "
                      :stroke="
                        i <= visibleTestimonial?.stars ? '#facc15' : '#e1e1e1'
                      "
                    />
                  </div>
                  <span class="text-lg font-medium text-[#1b1e1e]">
                    {{ visibleTestimonial?.stars?.toFixed(1) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                class="rounded-full p-5 border-[#cccccc]"
                @click="handlePrev"
              >
                <ChevronLeftIcon class="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                class="rounded-full p-5 border-[#1b1e1e]"
                @click="handleNext"
              >
                <ChevronRightIcon class="h-6 w-6" />
              </Button>
            </div>
          </div>
        </template>
        <template v-else>
          <Skeleton
            class="h-[250px] sm:h-[300px] md:h-[332px] overflow-hidden rounded-[20px]"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style></style>
