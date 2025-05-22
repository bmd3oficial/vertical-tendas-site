<script setup lang="ts">
const apiBase = useRuntimeConfig().public.API_URL;
// Form reactive data
const formData = reactive({
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
});

// Form state
const isSubmitting = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

// Form submission handler
const handleSubmit = async (event: Event) => {
  event.preventDefault();

  isSubmitting.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    // Send data to API using Nuxt 3's $fetch
    await $fetch(`${apiBase}/messages`, {
      method: "POST",
      body: {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      },
    });

    // Success - reset form and show success message
    submitSuccess.value = true;
    formData.name = "";
    formData.company = "";
    formData.phone = "";
    formData.email = "";
    formData.message = "";

    // Hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
  } catch (error: any) {
    console.error("Error submitting form:", error);
    submitError.value =
      error.data?.message || "Erro ao enviar mensagem. Tente novamente.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    class="bg-[#1062c4] px-4 sm:px-8 md:px-12 lg:px-[100px] py-8 sm:py-10 md:py-[45px]"
  >
    <h2
      class="text-[50px] font-bold text-white text-center tracking-[-1px] sm:tracking-[-1.50px] mb-6 sm:mb-8 md:mb-11"
    >
      Entre em contato!
    </h2>

    <div
      class="bg-[#347ACD] rounded-lg p-7 flex flex-col lg:flex-row gap-8 w-full md:w-[90%] lg:w-[70%] mx-auto"
    >
      <div class="w-full lg:w-1/2">
        <!-- Success Message -->
        <div
          v-if="submitSuccess"
          class="mb-4 p-4 bg-green-500 text-white rounded-lg"
        >
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>

        <!-- Error Message -->
        <div
          v-if="submitError"
          class="mb-4 p-4 bg-red-500 text-white rounded-lg"
        >
          {{ submitError }}
        </div>

        <form @submit="handleSubmit" class="space-y-4">
          <div>
            <label for="nome" class="block text-white font-medium mb-2"
              >Seu nome completo</label
            >
            <input
              type="text"
              id="nome"
              v-model="formData.name"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
            />
          </div>

          <div>
            <label for="empresa" class="block text-white font-medium mb-2"
              >Sua empresa, se houver</label
            >
            <input
              type="text"
              id="empresa"
              v-model="formData.company"
              :disabled="isSubmitting"
              class="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="telefone" class="block text-white font-medium mb-2"
                >Seu telefone de contato</label
              >
              <input
                type="tel"
                id="telefone"
                v-model="formData.phone"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label for="email" class="block text-white font-medium mb-2"
                >Seu e-mail</label
              >
              <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label for="mensagem" class="block text-white font-medium mb-2"
              >Escreva sua mensagem</label
            >
            <textarea
              id="mensagem"
              v-model="formData.message"
              rows="4"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSubmitting ? "Enviando..." : "Enviar mensagem" }}
          </button>
        </form>
      </div>

      <div class="w-full lg:w-1/2">
        <div class="h-full w-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.812731959228!2d-46.61377402466845!3d-23.61104817876568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5b98c44d21b5%3A0xe748d955ca60e5d9!2sR.%20S%C3%A3o%20Daniel%2C%20309%20-%20Vila%20Brasilio%20Machado%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004288-110!5e0!3m2!1spt-BR!2sbr!4v1747849973582!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
