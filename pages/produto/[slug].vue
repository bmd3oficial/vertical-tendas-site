<script setup lang="ts">
import { useApiStore } from "@/stores/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const route = useRoute();
const router = useRouter();

const apiStore = useApiStore();
const product = computed(() => apiStore.product);
const loadingProduct = computed(() => apiStore.loadingProduct);
const products = computed(() => apiStore.products);

// Lightbox state
const isLightboxOpen = ref(false);
const currentImageIndex = ref(0);

// Product selection state
const selectedColor = ref<string>('');
const selectedSize = ref<string>('');

const useCases = ref<
  {
    id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
  }[]
>([]);

// Function to get color name from hex/color value
function getColorName(color: string): string {
  const colorMap: { [key: string]: string } = {
    // Cores básicas
    '#ffffff': 'Branco',
    '#000000': 'Preto',
    '#ff0000': 'Vermelho',
    '#00ff00': 'Verde',
    '#0000ff': 'Azul',
    '#ffff00': 'Amarelo',
    '#ff00ff': 'Magenta',
    '#00ffff': 'Ciano',
    '#808080': 'Cinza',
    '#800000': 'Marrom',
    '#008000': 'Verde Escuro',
    '#000080': 'Azul Marinho',
    '#808000': 'Oliva',
    '#800080': 'Roxo',
    '#008080': 'Verde Azulado',
    '#c0c0c0': 'Prata',
    
    // Tons de azul
    '#1e90ff': 'Azul Dodger',
    '#4169e1': 'Azul Royal',
    '#0066cc': 'Azul',
    '#87ceeb': 'Azul Céu',
    '#4682b4': 'Azul Aço',
    '#6495ed': 'Azul Milho',
    '#00bfff': 'Azul Céu Profundo',
    
    // Tons de verde
    '#32cd32': 'Verde Lima',
    '#228b22': 'Verde Floresta',
    '#90ee90': 'Verde Claro',
    '#00ff7f': 'Verde Primavera',
    '#98fb98': 'Verde Pálido',
    '#20b2aa': 'Verde Mar',
    
    // Tons de vermelho
    '#dc143c': 'Vermelho Carmesim',
    '#b22222': 'Vermelho Tijolo',
    '#ff6347': 'Vermelho Tomate',
    '#ff4500': 'Vermelho Laranja',
    '#cd5c5c': 'Vermelho Indiano',
    
    // Tons de amarelo/laranja
    '#ffa500': 'Laranja',
    '#ff8c00': 'Laranja Escuro',
    '#ffd700': 'Dourado',
    '#ffff99': 'Amarelo Claro',
    '#ffe135': 'Amarelo Banana',
    
    // Tons de roxo/rosa
    '#dda0dd': 'Rosa Ameixa',
    '#ee82ee': 'Violeta',
    '#da70d6': 'Orquídea',
    '#ba55d3': 'Orquídea Média',
    '#9370db': 'Roxo Médio',
    '#8a2be2': 'Azul Violeta',
    
    // Tons de marrom/bege
    '#d2691e': 'Chocolate',
    '#cd853f': 'Peru',
    '#daa520': 'Vara de Ouro',
    '#b8860b': 'Vara de Ouro Escura',
    '#bc8f8f': 'Rosa Marrom',
    '#f4a460': 'Marrom Arenoso',
    '#d2b48c': 'Bronzeado',
    '#deb887': 'Madeira Escura',
    
    // Tons de cinza
    '#696969': 'Cinza Escuro',
    '#778899': 'Cinza Ardósia Claro',
    '#708090': 'Cinza Ardósia',
    '#2f4f4f': 'Cinza Ardósia Escuro',
    '#a9a9a9': 'Cinza Escuro',
    '#d3d3d3': 'Cinza Claro',
    
    // Nomes de cores em inglês (caso venham assim)
    'white': 'Branco',
    'black': 'Preto',
    'red': 'Vermelho',
    'green': 'Verde',
    'blue': 'Azul',
    'yellow': 'Amarelo',
    'orange': 'Laranja',
    'purple': 'Roxo',
    'pink': 'Rosa',
    'brown': 'Marrom',
    'gray': 'Cinza',
    'grey': 'Cinza',
  };
  
  // Converte para lowercase para comparação
  const lowerColor = color.toLowerCase();
  
  // Verifica se existe no mapa
  if (colorMap[lowerColor]) {
    return colorMap[lowerColor];
  }
  
  // Se não encontrar, tenta aproximar por similaridade de hex
  if (color.startsWith('#')) {
    const hex = color.toLowerCase();
    
    // Aproximações básicas por faixas de cor
    if (hex.includes('ff0000') || hex.includes('f00')) return 'Vermelho';
    if (hex.includes('00ff00') || hex.includes('0f0')) return 'Verde';
    if (hex.includes('0000ff') || hex.includes('00f')) return 'Azul';
    if (hex.includes('ffff00') || hex.includes('ff0')) return 'Amarelo';
    if (hex.includes('ffffff') || hex.includes('fff')) return 'Branco';
    if (hex.includes('000000') || hex.includes('000')) return 'Preto';
    
    // Aproximações por padrões
    if (hex.match(/^#[0-9a-f]{2}0{4}$/)) return 'Vermelho';
    if (hex.match(/^#0{2}[0-9a-f]{2}0{2}$/)) return 'Verde';
    if (hex.match(/^#0{4}[0-9a-f]{2}$/)) return 'Azul';

    // Categorização adicional por matiz (HSL) para cores não mapeadas
    const categoryName = categorizeHexColor(hex);
    if (categoryName) return categoryName;
  }
  
  // Se não conseguir identificar, retorna o valor original
  return color;
}

// Função auxiliar para converter um código hexadecimal em um nome de cor genérico em português
function categorizeHexColor(hex: string): string | null {
  // Remove o caractere '#'
  let value = hex.startsWith('#') ? hex.slice(1) : hex;
  // Converte notação curta (#abc) para longa (#aabbcc)
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (value.length !== 6) return null;

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }

  // Baixa saturação: decidir entre branco, preto ou cinza
  if (s < 0.1) {
    if (l > 0.9) return 'Branco';
    if (l < 0.1) return 'Preto';
    return 'Cinza';
  }

  if (h < 15 || h >= 345) return 'Vermelho';
  if (h < 45) return 'Laranja';
  if (h < 70) return 'Amarelo';
  if (h < 155) return 'Verde';
  if (h < 195) return 'Ciano';
  if (h < 255) return 'Azul';
  if (h < 285) return 'Roxo';
  if (h < 345) return 'Rosa';

  return null;
}

// WhatsApp link computed property
const whatsappLink = computed(() => {
  if (!product.value?.name) return '';
  
  const phone = '5511958430884';
  let message = `Olá! Gostaria de mais informações sobre ${product.value.name}.`;
  
  // Add selected characteristics to message
  const characteristics = [];
  if (selectedColor.value) {
    characteristics.push(`Cor: ${getColorName(selectedColor.value)}`);
  }
  if (selectedSize.value) {
    characteristics.push(`Tamanho: ${selectedSize.value}`);
  }
  
  if (characteristics.length > 0) {
    message += `\n\nCaracterísticas selecionadas:\n${characteristics.join('\n')}`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
});

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Lightbox functions
function openLightbox(index: number) {
  currentImageIndex.value = index;
  isLightboxOpen.value = true;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  isLightboxOpen.value = false;
  document.body.style.overflow = "";
}

function nextImage() {
  if (product.value?.images) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % product.value.images.length;
  }
}

function prevImage() {
  if (product.value?.images) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? product.value.images.length - 1
        : currentImageIndex.value - 1;
  }
}

// Handle keyboard navigation
function handleKeydown(event: KeyboardEvent) {
  if (!isLightboxOpen.value) return;

  switch (event.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowRight":
      nextImage();
      break;
    case "ArrowLeft":
      prevImage();
      break;
  }
}

watchEffect(() => {
  if (products.value.length >= 2) {
    const selected = getRandomItems(products.value, 3);
    useCases.value = selected.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      slug: product.slug,
      image: product.images[0]?.image || "/fallback.png",
    }));
  }
});

// Reset selections when product changes
watch(() => product.value, () => {
  selectedColor.value = '';
  selectedSize.value = '';
});

onMounted(async () => {
  if (route.params.slug) {
    await apiStore.getProduct(`${route.params.slug}`);
    await apiStore.getProducts();
  } else {
    router.push({ name: "index" });
  }

  // Add keyboard event listener
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  // Cleanup
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="max-w-[1400px] mx-auto">
    <!-- Main container with improved responsive padding -->
    <section
      class="px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 grid gap-8 sm:gap-12 lg:gap-16 text-[#000000]"
    >
      <!-- Product title with better responsive text sizing -->
      <p class="text-[#1B1E1E] text-3xl sm:text-4xl lg:text-5xl font-bold">
        {{ product?.name }}
      </p>

      <!-- Product details with improved spacing and column behavior -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
        <!-- Product images carousel with better responsive height -->
        <div>
          <div v-if="loadingProduct">
            <Skeleton class="w-full h-48 sm:h-56 md:h-64 rounded-lg" />
          </div>

          <div v-else>
            <Carousel class="w-full">
              <CarouselContent>
                <CarouselItem
                  v-for="(image, index) in product?.images"
                  :key="index"
                >
                  <img
                    :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${image.image}`"
                    alt="Imagem do Produto"
                    class="w-full h-64 sm:h-80 md:h-96 lg:h-[472px] object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    @click="openLightbox(index)"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious class="hidden sm:flex" />
              <CarouselNext class="hidden sm:flex" />
            </Carousel>
          </div>
        </div>

        <!-- Product details container with improved vertical spacing -->
        <div
          class="flex flex-col justify-start mt-4 md:mt-0 md:justify-center text-[#000000]"
        >
          <div v-if="loadingProduct" class="space-y-4">
            <Skeleton class="h-6 sm:h-8 w-3/4" />
            <Skeleton class="h-4 sm:h-6 w-full" />
            <Skeleton class="h-4 w-5/6" />
          </div>

          <div v-else>
            <span v-if="product?.description">
              <div
                class="text-sm sm:text-base"
                v-html="product?.description.replace(/\n/g, '<br>')"
              ></div>

              <!-- Product attributes with improved responsive spacing -->
              <div
                class="mt-6 sm:mt-8 lg:mt-10 max-w-md space-y-4 sm:space-y-6 text-sm text-[#665244]"
              >
                <div v-if="product.colors && product.colors.length > 0">
                  <h2 class="font-semibold mb-1">Cores:</h2>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="(color, index) in product.colors"
                      :key="index"
                      @click="selectedColor = color"
                      class="w-8 h-8 rounded border-2 transition-all duration-200 hover:scale-110"
                      :class="{
                        'border-gray-300': selectedColor !== color,
                        'border-black border-4': selectedColor === color,
                      }"
                      :style="{ backgroundColor: color }"
                      :title="`Selecionar cor: ${getColorName(color)}`"
                    >
                      <span v-if="selectedColor === color" class="block w-full h-full rounded flex items-center justify-center">
                        <svg class="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <p v-if="selectedColor" class="text-xs text-gray-600 mt-1">
                    Cor selecionada: {{ getColorName(selectedColor) }}
                  </p>
                </div>

                <div v-if="product.sizes && product.sizes?.length > 0">
                  <h2 class="font-semibold mb-1">Medidas:</h2>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="(size, index) in product.sizes"
                      :key="index"
                      @click="selectedSize = size"
                      class="px-3 py-1 border-2 rounded transition-all duration-200 text-xs sm:text-sm hover:scale-105"
                      :class="{
                        'border-gray-300 bg-white text-black': selectedSize !== size,
                        'border-green-500 bg-green-500 text-white': selectedSize === size,
                      }"
                      :title="`Selecionar tamanho: ${size}`"
                    >
                      {{ size }}
                    </button>
                  </div>
                  <p v-if="selectedSize" class="text-xs text-gray-600 mt-1">
                    Tamanho selecionado: {{ selectedSize }}
                  </p>
                </div>

                <div v-if="product.materials">
                  <h2 class="font-semibold mb-1 text-[#000000]">Materiais:</h2>
                  <div
                    class="text-sm text-[#000000"
                    style="color: #000"
                    v-html="product.materials.replace(/\n/g, '<br>')"
                  ></div>
                </div>
              </div>

              <!-- Selected characteristics summary -->
              <div v-if="selectedColor || selectedSize" class="mt-4 p-3 bg-gray-50 rounded-lg border">
                <h3 class="font-semibold text-sm text-gray-700 mb-2">Suas seleções:</h3>
                <div class="space-y-1">
                  <div v-if="selectedColor" class="flex items-center gap-2 text-sm">
                    <span class="font-medium">Cor:</span>
                    <div class="flex items-center gap-1">
                      <div 
                        class="w-4 h-4 rounded border"
                        :style="{ backgroundColor: selectedColor }"
                      ></div>
                      <span>{{ getColorName(selectedColor) }}</span>
                    </div>
                  </div>
                  <div v-if="selectedSize" class="flex items-center gap-2 text-sm">
                    <span class="font-medium">Tamanho:</span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{{ selectedSize }}</span>
                  </div>
                </div>
              </div>

              <!-- CTA button with improved responsive sizing -->
              <a 
                :href="whatsappLink" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button
                  class="mt-6 sm:mt-8 lg:mt-10 bg-[#18ab1a] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <svg
                    width="16"
                    height="16"
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

                  Solicite seu orçamento
                </button>
              </a>
            </span>
          </div>
        </div>
      </div>

      <!-- Use cases section with improved responsive grid -->
      <div class="flex flex-col pt-4 gap-8">
        <template v-if="!loadingProduct">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(useCase, index) in useCases"
              :key="index"
              class="flex flex-col h-full"
            >
              <NuxtLink
                :to="{ name: 'produto-slug', params: { slug: useCase.slug } }"
              >
                <div class="rounded-[20px] overflow-hidden">
                  <div
                    class="relative w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] group"
                  >
                    <img
                      :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${useCase.image}`"
                      :alt="useCase.title"
                      class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                    />

                    <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30"
                    />
                  </div>
                </div>
              </NuxtLink>

              <div class="mt-3">
                <h3
                  class="text-lg sm:text-xl md:text-2xl font-bold text-[#1b1e1e] mb-1"
                >
                  {{ useCase.title }}
                </h3>
                <p class="text-[#6a6a6a] text-sm sm:text-base leading-6">
                  {{
                    useCase.description.length > 100
                      ? useCase.description.slice(0, 100) + "..."
                      : useCase.description
                  }}
                </p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton
              class="h-80 sm:h-96 lg:h-[450px] w-full overflow-hidden rounded-[20px]"
            />
            <Skeleton
              class="h-80 sm:h-96 lg:h-[450px] w-full overflow-hidden rounded-[20px] hidden sm:block"
            />
            <Skeleton
              class="h-80 sm:h-96 lg:h-[450px] w-full overflow-hidden rounded-[20px] hidden lg:block"
            />
          </div>
        </template>
      </div>

      <!-- FAQ section -->
    </section>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-90"
        @click.self="closeLightbox"
      >
        <!-- Close button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- Navigation buttons -->
        <button
          v-if="product?.images && product.images.length > 1"
          @click="prevImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <button
          v-if="product?.images && product.images.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <!-- Image container -->
        <div class="w-full h-full flex items-center justify-center">
          <img
            v-if="product?.images?.[currentImageIndex]"
            :src="`https://dbs-minio.b5gal9.easypanel.host/verticaltendas/${product.images[currentImageIndex].image}`"
            alt="Imagem do Produto"
            class="max-w-full max-h-full object-contain"
          />
        </div>

        <!-- Image counter -->
        <div
          v-if="product?.images && product.images.length > 1"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
        >
          {{ currentImageIndex + 1 }} / {{ product.images.length }}
        </div>
      </div>
    </Teleport>
  </div>
  <FAQSection />
</template>
