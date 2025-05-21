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

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Produtos", href: "/produtos" },
  { name: "Dúvidas", href: "/duvidas" },
  { name: "Fale Conosco", href: "/#contato" },
];
</script>

<template>
  <Sheet>
    <SheetTrigger class="flex md:hidden cursor-pointer"><Menu /></SheetTrigger>
    <SheetContent class="max-w-full w-full">
      <SheetHeader>
        <SheetTitle>
          <SheetClose>
            <NuxtLink
              :to="{ name: 'index' }"
              class="mr-6 flex items-center space-x-2"
            >
              <img src="/logo.png" alt="Logo" class="h-6" />
            </NuxtLink>
          </SheetClose>
        </SheetTitle>
        <SheetDescription> </SheetDescription>
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

          <Button variant="default2"> Fale Conosco </Button>
          <Button variant="default2" @click="userLogout"> logout </Button>
        </div>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
