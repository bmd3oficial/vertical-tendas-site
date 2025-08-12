<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { useHead } from "#imports";
const apiStore = useApiStore();
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Produtos", href: "/produtos" },
  { name: "Dúvidas", href: "/duvidas" },
  { name: "Fale Conosco", href: "/contato" },
];
await apiStore.getProducts();
const products = apiStore.products;

const footerProducts = products;

function ensureHttps(url: string): string {
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}
</script>

<template>
  <div>
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav
        class="flex justify-between w-full items-center px-4 py-2 sm:px-6 md:px-8 lg:px-12"
      >
        <NuxtLink
          :to="{ name: 'index' }"
          class="mr-6 flex items-center space-x-2"
        >
          <img src="/logo.svg" alt="Logo" />
        </NuxtLink>
        <div class="flex items-center justify-between space-x-2 md:justify-end">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <div class="hidden md:flex">
              <NuxtLink
                v-for="item in navLinks"
                :key="item.href"
                :to="item.href"
                class="px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <a
          v-if="apiStore.contact.whatsapp"
          :href="`https://wa.me/55${apiStore.contact.whatsapp.replace(
            /\D/g,
            ''
          )}`"
          target="_blank"
        >
          <Button
            id="estatico"
            variant="default2"
            class="bg-[#18ab1a] rounded-lg px-[30px] py-3 h-auto text-white hidden md:flex items-center cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              sm:width="20"
              sm:height="20"
              viewBox="0 0 76 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M64.5747 11.4497C57.519 4.39404 48.144 0.5 38.1587 0.5C17.5776 0.5 0.817384 17.248 0.817384 37.8291C0.805175 44.4087 2.52637 50.8296 5.79785 56.4937L0.5 75.8418L20.2998 70.6416C25.7441 73.6201 31.8965 75.1826 38.1465 75.1948H38.1587C58.7397 75.1948 75.4878 58.4468 75.5 37.8535C75.5 27.8804 71.6182 18.5054 64.5747 11.4497ZM38.1587 68.8838H38.1465C32.5801 68.8838 27.1113 67.3823 22.3506 64.5625L21.2153 63.8911L9.45996 66.9673L12.5972 55.5171L11.8647 54.3452C8.75195 49.4014 7.11621 43.6885 7.11621 37.8291C7.11621 20.7271 21.0444 6.81103 38.1709 6.81103C46.4595 6.81103 54.2476 10.0459 60.1069 15.9053C65.9663 21.7769 69.189 29.5649 69.189 37.8535C69.189 54.9678 55.2607 68.8838 38.1587 68.8838ZM55.1753 45.6416C54.2476 45.1777 49.6577 42.9194 48.8032 42.6143C47.9487 42.2969 47.3262 42.1504 46.7036 43.0781C46.0811 44.0181 44.2988 46.1177 43.7495 46.7402C43.2124 47.3506 42.6631 47.436 41.7354 46.9722C40.7954 46.5083 37.7925 45.5195 34.228 42.3335C31.457 39.8677 29.5772 36.8037 29.04 35.876C28.4907 34.936 28.979 34.4355 29.4429 33.9717C29.8701 33.5566 30.3828 32.8853 30.8467 32.3359C31.3105 31.7988 31.4692 31.4082 31.7866 30.7856C32.0918 30.1631 31.9331 29.6138 31.7012 29.1499C31.4692 28.686 29.6016 24.084 28.8203 22.2163C28.0635 20.3975 27.2944 20.6538 26.7207 20.6172C26.1836 20.5928 25.561 20.5928 24.9385 20.5928C24.3159 20.5928 23.3027 20.8247 22.4482 21.7647C21.5938 22.6924 19.189 24.9507 19.189 29.5405C19.189 34.1304 22.5337 38.5737 22.9976 39.1963C23.4614 39.8066 29.5772 49.2305 38.9399 53.271C41.1616 54.2354 42.895 54.8091 44.25 55.2363C46.4839 55.9443 48.5225 55.8467 50.1338 55.6147C51.9282 55.3462 55.6514 53.3564 56.4326 51.1714C57.2017 48.9985 57.2017 47.1309 56.9697 46.7402C56.7378 46.3496 56.1152 46.1177 55.1753 45.6416Z"
                fill="white"
              />
            </svg>
            <span class="ml-3"> Solicite seu orçamento </span>
          </Button>
        </a>

        <HomeSheetNav />
      </nav>
    </header>
    <main>
      <slot />
    </main>

    <footer
      class="w-full bg-[#fefaed] pt-20 pb-[54px] px-4 sm:px-6 md:px-8 lg:px-[68px]"
    >
      <div class="max-w-[1400px] mx-auto">
        <div class="container mx-auto">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            <div>
              <img src="/logo.svg" alt="Logo" class="mb-8" />
              <p
                class="text-[#7c7c7c] tracking-[-0.40px] text-sm max-w-[294px]"
              >
                Cobertura Certa. Estrutura Forte. <br />
                Confiança Vertical.
              </p>
            </div>

            <div>
              <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                Nossos Produtos
              </h3>

              <ul>
                <li>
                  <NuxtLink
                    to="/produto/tendapiramidal"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Tenda Piramidal</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/tendasanfonada"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Tenda Sanfonada</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/tenda_personalizada"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Tenda Personalizada</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/geocarpa"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Geocarpa</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/galpaoemlona"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Galpão em Lona</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/gradil"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Gradil</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/produto/pisos"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                    >Pisos</NuxtLink
                  >
                </li>
              </ul>
            </div>

            <div>
              <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                Links úteis
              </h3>
              <ul>
                <li>
                  <NuxtLink
                    to="/sobre"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                  >
                    Sobre
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink
                    to="/duvidas"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                  >
                    Dúvidas
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink
                    to="/contato"
                    class="text-[#7c7c7c] tracking-[-0.40px]"
                  >
                    Fale conosco
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <div class="mb-8">
                <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                  Fale Conosco
                </h3>

                <div class="space-y-3">
                  <div
                    v-if="apiStore.contact.whatsapp"
                    class="flex flex-col gap-2"
                  >
                    <div class="flex items-center gap-2">
                      <a
                        :href="`https://wa.me/55${apiStore.contact.whatsapp.replace(
                          /\D/g,
                          ''
                        )}`"
                        target="_blank"
                        class="text-[#7c7c7c] tracking-[-0.40px] hover:text-green-600 transition-colors"
                      >
                        <div class="flex items-center gap-2">
                          <svg
                            class="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"
                            />
                          </svg>
                          {{ apiStore.contact.whatsapp }}
                        </div>

                        <div class="flex items-center gap-2">
                          <svg
                            class="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"
                            /></svg
                          ><span>(11) 4109-3083</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                  Email
                </h3>
                <p class="text-[#7c7c7c] tracking-[-0.40px]">
                  {{ apiStore.contact.email }}
                </p>
              </div>

              <div>
                <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                  Endereço
                </h3>
                <p class="text-[#7c7c7c] tracking-[-0.40px]">
                  {{ apiStore.contact.address }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200"
          >
            <p class="text-[#7c7c7c] tracking-[-0.40px] text-sm">
              Copyright © Vertical Tendas
            </p>
            <div class="flex items-center gap-4 mt-4 md:mt-0">
              <a
                v-if="apiStore.contact.instagram !== ''"
                target="_blank"
                :href="ensureHttps(apiStore.contact.instagram)"
                class="text-[#7c7c7c] text-sm"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.72222 0C2.11839 0 0 2.11839 0 4.72222V12.2778C0 14.8816 2.11839 17 4.72222 17H12.2778C14.8816 17 17 14.8816 17 12.2778V4.72222C17 2.11839 14.8816 0 12.2778 0H4.72222ZM4.72222 1.88889H12.2778C13.8399 1.88889 15.1111 3.16011 15.1111 4.72222V12.2778C15.1111 13.8399 13.8399 15.1111 12.2778 15.1111H4.72222C3.16011 15.1111 1.88889 13.8399 1.88889 12.2778V4.72222C1.88889 3.16011 3.16011 1.88889 4.72222 1.88889ZM13.2222 2.83333C12.9717 2.83333 12.7315 2.93284 12.5544 3.10995C12.3773 3.28707 12.2778 3.5273 12.2778 3.77778C12.2778 4.02826 12.3773 4.26848 12.5544 4.4456C12.7315 4.62272 12.9717 4.72222 13.2222 4.72222C13.4727 4.72222 13.7129 4.62272 13.89 4.4456C14.0672 4.26848 14.1667 4.02826 14.1667 3.77778C14.1667 3.5273 14.0672 3.28707 13.89 3.10995C13.7129 2.93284 13.4727 2.83333 13.2222 2.83333ZM8.5 3.77778C5.89617 3.77778 3.77778 5.89617 3.77778 8.5C3.77778 11.1038 5.89617 13.2222 8.5 13.2222C11.1038 13.2222 13.2222 11.1038 13.2222 8.5C13.2222 5.89617 11.1038 3.77778 8.5 3.77778ZM8.5 5.66667C10.0621 5.66667 11.3333 6.93789 11.3333 8.5C11.3333 10.0621 10.0621 11.3333 8.5 11.3333C6.93789 11.3333 5.66667 10.0621 5.66667 8.5C5.66667 6.93789 6.93789 5.66667 8.5 5.66667Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </a>

              <a
                v-if="apiStore.contact.facebook !== ''"
                target="_blank"
                :href="ensureHttps(apiStore.contact.facebook)"
                class="text-[#7c7c7c] text-sm"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 0C4.25341 0 0 4.27527 0 9.54883C0 14.3363 3.50852 18.289 8.08018 18.9796V12.0797H5.7298V9.56966H8.08018V7.89949C8.08018 5.13423 9.42055 3.92023 11.707 3.92023C12.8021 3.92023 13.3812 4.00183 13.6554 4.03915V6.23018H12.0957C11.1249 6.23018 10.786 7.15511 10.786 8.19767V9.56966H13.6308L13.2447 12.0797H10.786V19C15.4228 18.3676 19 14.3827 19 9.54883C19 4.27527 14.7466 0 9.5 0Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </a>

              <a
                v-if="apiStore.contact.youtube !== ''"
                target="_blank"
                :href="ensureHttps(apiStore.contact.youtube)"
                class="text-[#7c7c7c] text-sm"
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3859 2.75C21.1825 1.65039 20.2135 0.849609 19.089 0.599609C17.4062 0.25 14.2918 0 10.9222 0C7.55465 0 4.39043 0.25 2.70564 0.599609C1.58311 0.849609 0.612108 1.59961 0.408737 2.75C0.203372 4 0 5.75 0 8C0 10.25 0.203372 12 0.458583 13.25C0.663948 14.3496 1.63295 15.1504 2.75548 15.4004C4.54196 15.75 7.6045 16 10.9741 16C14.3437 16 17.4062 15.75 19.1927 15.4004C20.3152 15.1504 21.2842 14.4004 21.4896 13.25C21.6929 12 21.9482 10.1992 22 8C21.8963 5.75 21.6411 4 21.3859 2.75ZM8.16676 11.5V4.5L14.3935 8L8.16676 11.5Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </a>

              <a
                v-if="apiStore.contact.tiktok !== ''"
                target="_blank"
                :href="ensureHttps(apiStore.contact.tiktok)"
                class="text-[#7c7c7c] text-sm"
              >
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.72728 14.5455V0H11.6364C11.6364 2.40616 13.5429 4.32962 15.9375 4.36364L15.8949 7.27272C14.268 7.24962 12.8405 6.58876 11.6364 5.65624V14.5455C11.6364 17.7416 9.0143 20.3636 5.81818 20.3636C2.62206 20.3636 0 17.7416 0 14.5455C0 11.3493 2.62206 8.72728 5.81818 8.72728V11.6364C4.19394 11.6364 2.9091 12.9212 2.9091 14.5455C2.9091 16.1697 4.19394 17.4545 5.81818 17.4545C7.44242 17.4545 8.72728 16.1697 8.72728 14.5455Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
