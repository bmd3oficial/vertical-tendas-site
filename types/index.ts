export interface IProductImage {
  id: string;
  productId: string;
  image: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  materials?: string;
  sizes?: string[];
  colors?: string[];
  slug: string;
  createdAt: Date;
  images: IProductImage[];
}

export interface ITestimonial {
  id: string;
  name: string;
  description: string;
  stars: number;
}

export interface IQuestion {
  id: string;
  description: string;
  title: string;
  order: number;
}

export interface IBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IAbout {
  text: string;
}

export interface IContact {
  whatsapp: string;
  whatsappalternative?: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
}

export interface IAnuncio {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}
