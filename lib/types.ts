export interface ProductSize {
  id: string;
  name: string;
  weight: string;
  price: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  category: string;
  stock: number;
  sizes: ProductSize[];
  healthBenefits: string[];
  ingredients: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  sizeId: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
