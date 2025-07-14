<script lang="ts" setup>
import { Toaster } from "vue-sonner";
import { ref, onMounted } from "vue";
import { useApiStore } from "@/stores/api";
import { useHead } from "#app";

const showCookieBanner = ref(false);
const isHovering = ref(false);
const apiStore = useApiStore();

const acceptCookies = () => {
  showCookieBanner.value = false;
  localStorage.setItem("cookiesAccepted", "true");
  location.reload();
};

const declineCookies = () => {
  showCookieBanner.value = false;
  localStorage.setItem("cookiesDeclined", "true");
};

const openWhatsApp = () => {
  const phoneNumber = `55${apiStore.contact.whatsapp.replace(/\D/g, "")}`;
  const message = "Olá! Gostaria de mais informações sobre as tendas.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

const handleWhatsAppClick = () => {
  // Enviar evento para GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'whatsapp_click',
      event_category: 'engagement',
      event_action: 'click',
      event_label: 'floating_button',
      value: 1
    });
  }
  console.log('WhatsApp button clicked - event sent to GTM');
};

onMounted(async () => {
  await apiStore.getContact();
  await apiStore.getSiteSettings();

  // Google Tag Manager
  useHead({
    script: [
      {
        key: "gtm",
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K3D2VK93');`,
      },
    ],
    noscript: [
      {
        key: "gtm-noscript",
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K3D2VK93"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        tagPosition: "bodyOpen",
      },
    ],
  });

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

  // Definir meta tags padrão do site
  const title = apiStore.siteSettings.title || "Vertical Tendas";
  const description =
    apiStore.siteSettings.description ||
    "Cobertura Certa. Estrutura Forte. Confiança Vertical.";
  const keywords = apiStore.siteSettings.keywords || undefined;
  const ogImage = apiStore.siteSettings.ogImage || undefined;
  const canonicalUrl = apiStore.siteSettings.canonicalUrl || undefined;
  const twitterHandle = apiStore.siteSettings.twitterHandle || undefined;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(twitterHandle
        ? [
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: twitterHandle },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
          ]
        : []),
    ],
    link: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
  });
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

    <!-- WhatsApp Floating Button -->
    <a
      href="https://wa.me/5511958430884"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 cursor-pointer right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Falar no WhatsApp"
      @click="handleWhatsAppClick"
    >
      <!-- WhatsApp Icon -->
      <svg
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"
        />
      </svg>

      <!-- Tooltip -->
      <div
        class="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
      >
        Fale conosco no WhatsApp
        <div
          class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </a>
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

/* Animação pulsante para o botão do WhatsApp */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.fixed button:hover {
  animation: pulse 2s infinite;
}
</style>
