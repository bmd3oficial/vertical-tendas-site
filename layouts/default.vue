<script setup lang="ts">
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Produtos", href: "/produtos" },
  { name: "Dúvidas", href: "/duvidas" },
  { name: "Fale Conosco", href: "/contato" },
];

const footerProducts = [
  "Tenda Sanfonada",
  "Tenda Piramidal",
  "Tenda Personalizada",
  "Geocarpa",
];
</script>

<template>
  <div>
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav class="flex justify-between w-full p-4 items-center">
        <NuxtLink
          :to="{ name: 'index' }"
          class="mr-6 flex items-center space-x-2"
        >
          <img src="/logo.png" alt="Logo" />
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
        <Button
          variant="default2"
          class="bg-[#18ab1a] rounded-lg px-[30px] py-3 h-auto text-white hidden md:flex"
        >
          Fale Conosco
        </Button>

        <HomeSheetNav />
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="w-full bg-[#fefaed] pt-20 pb-[54px] px-[68px]">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div>
            <img src="/logo.png" alt="Logo" class="mb-8" />
            <p class="text-[#7c7c7c] tracking-[-0.40px] text-sm max-w-[294px]">
              Cobertura Certa. Estrutura Forte. <br />
              Confiança Vertical.
            </p>
          </div>

          <div>
            <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
              Nossos Produtos
            </h3>
            <ul>
              <li v-for="product in footerProducts" :key="product">
                <a href="#" class="text-[#7c7c7c] tracking-[-0.40px]">
                  {{ product }}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
              Links úteis
            </h3>
            <ul>
              <li>
                <NuxtLink to="/sobre" class="text-[#7c7c7c] tracking-[-0.40px]">
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
              <a
                href="tel:+551142777799"
                class="text-[#7c7c7c] tracking-[-0.40px]"
              >
                +55 11 4277-7799
              </a>
            </div>

            <div class="mb-8">
              <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                Email
              </h3>
              <p class="text-[#7c7c7c] tracking-[-0.40px]">
                comercial@verticaltendas.com.br
              </p>
            </div>

            <div>
              <h3 class="font-medium text-[#1b1e1e] tracking-[-0.40px] mb-5">
                Endereço
              </h3>
              <p class="text-[#7c7c7c] tracking-[-0.40px]">
                Rua São Daniel, 309 – Vila Brasilio Machado<br />
                São Paulo – SP, CEP 04288-110
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
            <a href="#" class="text-[#7c7c7c] text-sm">Instagram</a>
            <a href="#" class="text-[#7c7c7c] text-sm">Facebook</a>
            <a href="#" class="text-[#7c7c7c] text-sm">YouTube</a>
            <a href="#" class="text-[#7c7c7c] text-sm">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
