<script lang="ts" setup>
import { Toaster } from "vue-sonner";
import { ref, onMounted } from "vue";
import { useApiStore } from "@/stores/api";
const showCookieBanner = ref(false);
const isHovering = ref(false);
const apiStore = useApiStore();
const acceptCookies = () => {
  showCookieBanner.value = false;
  localStorage.setItem("cookiesAccepted", "true");
};

const declineCookies = () => {
  showCookieBanner.value = false;
  localStorage.setItem("cookiesDeclined", "true");
};

onMounted(async () => {
  await apiStore.getContact();
  // Verificar se o usuário já aceitou ou recusou os cookies
  if (
    !localStorage.getItem("cookiesAccepted") &&
    !localStorage.getItem("cookiesDeclined")
  ) {
    // Mostrar o banner após 1 segundo (tempo para a página carregar)
    setTimeout(() => {
      showCookieBanner.value = true;

      // Fechar automaticamente após 5 segundos (5000ms)
      setTimeout(() => {
        if (!isHovering.value) {
          showCookieBanner.value = false;
        }
      }, 5000);
    }, 1000);
  }
});
</script>

<template>
  <Title>Vertical Tendas</Title>
  <Toaster />
  <NuxtLayout>
    <NuxtPage />

    <!-- Cookie Banner -->
    <div
      v-if="showCookieBanner"
      class="fixed bottom-4 left-4 z-50"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <div
        class="bg-white p-4 rounded-lg shadow-lg max-w-xs md:max-w-sm border border-gray-200 transition-all duration-300"
        :class="{ 'animate-fade-in': showCookieBanner }"
      >
        <div class="flex items-start">
          <div class="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-gray-800">Utilizamos cookies</h3>
            <p class="text-sm text-gray-600 mt-1">
              Nós usamos cookies para melhorar sua experiência no site.
            </p>
            <div class="mt-3 flex gap-2">
              <button
                @click="acceptCookies"
                class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded transition"
              >
                Aceitar
              </button>
              <button
                @click="declineCookies"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-1 px-3 rounded transition"
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
