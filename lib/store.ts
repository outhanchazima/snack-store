import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CartItem, Product, User } from "./types";

// Cart Atoms
export const cartAtom = atomWithStorage<CartItem[]>("cart", []);
export const isCartOpenAtom = atom<boolean>(false);
export const productsAtom = atom<Product[]>([]);

// Derived cart atoms
export const cartItemCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.quantity, 0);
});

export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Filter and Search Atoms
export const searchQueryAtom = atom("");
export const selectedCategoryAtom = atom<string | null>(null);

// User Atom
export const userAtom = atomWithStorage<User | null>("user", null);

// Type exports for usage in components
export type { CartItem, User };
