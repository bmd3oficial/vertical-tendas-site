<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { Menu } from "lucide-vue-next";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useApiStore } from "@/stores/api";
const apiStore = useApiStore();

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Produtos", href: "/produtos" },
  { name: "Dúvidas", href: "/duvidas" },
  { name: "Fale Conosco", href: "/contato" },
];
</script>

<template>
  <Sheet>
    <SheetTrigger class="flex md:hidden cursor-pointer"><Menu /></SheetTrigger>
    <SheetContent class="max-w-full w-full">
      <SheetHeader>
        
        <div class="grid gap-4 px-4 py-2">
          <div class="grid gap-4">
            <div v-for="item in navLinks" :key="item.href">
              <SheetClose>
                <NuxtLink
                  :to="item.href"
                  class="text-sm font-medium transition-colors hover:text-primary"
                >
                  {{ item.name }}
                </NuxtLink>
              </SheetClose>
            </div>
          </div>
          <SheetClose>
            <a
              v-if="apiStore.contact.whatsapp"
              :href="`https://wa.me/55${apiStore.contact.whatsapp.replace(
                /\D/g,
                ''
              )}`"
              target="_blank"
              class="w-full"
            >
              <Button
                variant="default2"
                class="bg-[#18ab1a] rounded-lg px-[30px] py-3 h-auto text-white flex items-center cursor-pointer w-full"
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
          </SheetClose>

          
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
