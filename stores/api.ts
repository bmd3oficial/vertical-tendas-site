import { defineStore } from "pinia";
import axios from "axios";
import { toast } from "vue-sonner";

import { useRuntimeConfig, useCookie } from "#app";
import type {
  IAbout,
  IAnuncio,
  IBanner,
  IContact,
  IProduct,
  IQuestion,
  ITestimonial,
} from "~/types";

interface ISiteSettings {
  id: string;
  googleTagId: string | null;
  title: string | null;
  description: string | null;
  keywords: string | null;
}

export const useApiStore = defineStore("api", {
  state: () => ({
    loading: false,
    error: null as string | null,
    token: useCookie("access_token"),
    //
    products: [] as IProduct[],
    product: {} as IProduct,
    loadingProduct: false,
    //
    testimonials: [] as ITestimonial[],
    loadingTestimonial: false,
    //
    questions: [] as IQuestion[],
    loadingQuestion: false,
    //
    banners: [] as IBanner[],
    loadingBanner: false,
    //
    about: {},
    contact: {
      whatsapp: '',
      whatsappalternative: '',
      email: '',
      address: '',
      instagram: '',
      facebook: '',
      youtube: '',
      tiktok: '',
    } as IContact,
    anuncios: [] as IAnuncio[],
    siteSettings: {
      id: '',
      googleTagId: null,
      title: null,
      description: null,
      keywords: null,
    } as ISiteSettings,
    API_URL_PRODUCT: useRuntimeConfig().public.API_PRODUCT_URL as string,
  }),

  actions: {
    getHeaders() {
      const token = this.token;
      return {
        Authorization: token ? `Bearer ${token}` : undefined,
      };
    },

    async getBanners() {
      const apiBase = useRuntimeConfig().public.API_URL;

      try {
        this.loadingBanner = true;
        this.error = null;
        const response = await axios.get<IBanner[]>(`${apiBase}/banners`, {
          headers: this.getHeaders(),
        });
        this.banners = response.data;
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erro ao buscar banners";
        toast.error(this.error ?? "Erro ao buscar banners");
        throw this.error;
      } finally {
        this.loadingBanner = false;
      }
    },

    async getTestimonials() {
      const apiBase = useRuntimeConfig().public.API_URL;

      try {
        this.loadingTestimonial = true;
        this.error = null;
        const response = await axios.get<ITestimonial[]>(
          `${apiBase}/testimonials`,
          {
            headers: this.getHeaders(),
          }
        );

        this.testimonials = response.data;
        return response.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Erro ao buscar depoimentos";
        toast.error(this.error ?? "Erro ao buscar depoimentos");
        throw this.error;
      } finally {
        this.loadingTestimonial = false;
      }
    },

    async getQuestions() {
      const apiBase = useRuntimeConfig().public.API_URL;

      try {
        this.loadingQuestion = true;
        this.error = null;
        const response = await axios.get<IQuestion[]>(`${apiBase}/questions`, {
          headers: this.getHeaders(),
        });

        this.questions = response.data;
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erro ao buscar questões";
        toast.error(this.error ?? "Erro ao buscar questões");
        throw this.error;
      } finally {
        this.loadingQuestion = false;
      }
    },

    async getProducts() {
      const apiBase = useRuntimeConfig().public.API_URL;

      try {
        this.loadingProduct = true;
        this.error = null;
        const response = await axios.get<IProduct[]>(`${apiBase}/products`, {
          headers: this.getHeaders(),
        });
        this.products = response.data;
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erro ao buscar produtos";
        toast.error(this.error ?? "Erro ao buscar produtos");
        throw this.error;
      } finally {
        this.loadingProduct = false;
      }
    },

    async getProduct(slug: string) {
      const apiBase = useRuntimeConfig().public.API_URL;

      try {
        this.loadingProduct = true;
        this.error = null;
        const response = await axios.get<IProduct>(
          `${apiBase}/products/slug/${slug}`,
          {
            headers: this.getHeaders(),
          }
        );
        this.product = response.data;
        return response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || "Erro ao buscar produto";
        toast.error(this.error ?? "Erro ao buscar produto");
        throw this.error;
      } finally {
        this.loadingProduct = false;
      }
    },

    async getAbout() {
      const apiBase = useRuntimeConfig().public.API_URL;
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get<IAbout>(`${apiBase}/about`, {
          headers: this.getHeaders(),
        });

        this.about = response.data;
        return response.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Erro ao buscar informações";
        toast.error(this.error ?? "Erro ao buscar informações");
        throw this.error;
      } finally {
        this.loading = false;
      }
    },
    async getContact() {
      const apiBase = useRuntimeConfig().public.API_URL;
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get<IContact>(`${apiBase}/contact`, {
          headers: this.getHeaders(),
        });

        this.contact = response.data;
        return response.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Erro ao buscar informações";
        toast.error(this.error ?? "Erro ao buscar informações");
        throw this.error;
      } finally {
        this.loading = false;
      }
    },
    async getSiteSettings() {
      const apiBase = useRuntimeConfig().public.API_URL;
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get<ISiteSettings>(`${apiBase}/site-settings`, {
          headers: this.getHeaders(),
        });

        this.siteSettings = response.data;
        return response.data;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Erro ao buscar informações";
        toast.error(this.error ?? "Erro ao buscar informações");
        throw this.error;
      } finally {
        this.loading = false;
      }
    },
    async getAnuncios() {
      const apiBase = useRuntimeConfig().public.API_URL;
      const API_URL_PRODUCT = useRuntimeConfig().public.API_PRODUCT_URL;
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get<IAnuncio[]>(`${apiBase}/anuncios`, {
          headers: this.getHeaders(),
        });

        this.anuncios = response.data.map((anuncio) => ({
          ...anuncio,
          image: anuncio.image.startsWith("http")
            ? anuncio.image
            : `${API_URL_PRODUCT}/${anuncio.image}`,
        }));
        return this.anuncios;
      } catch (err: any) {
        this.error =
          err.response?.data?.message || "Erro ao buscar informações";
        toast.error(this.error ?? "Erro ao buscar informações");
        throw this.error;
      } finally {
        this.loading = false;
      }
    },
  },
});
