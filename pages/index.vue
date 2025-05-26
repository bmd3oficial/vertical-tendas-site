<script setup lang="ts">
// definePageMeta({
//   middleware: "auth",
// });
</script>

<template>
  <div class="flex flex-col items-start relative bg-white">
    <!-- Hero Section -->
    <HomeHeroSection />

    <div class="max-w-[1400px] mx-auto">
      <HomeProductsSection />

      <!-- Use Cases Section -->
      <HomeUseCasesSection />

      <!-- Testimonials Section -->
      <HomeTestimonialsSection />
    </div>

    <!-- FAQ Section -->
    <HomeFAQSection />
  </div>
</template>
