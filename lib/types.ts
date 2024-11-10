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

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
}

export interface Location {
  id: string;
  name: string;
  zoneId: string; // Reference to the parent zone
}

export interface LocationsByZone {
  [zoneId: string]: Location[];
}

// Helper type to get all locations as a flat array
export type AllLocations = Location[];
