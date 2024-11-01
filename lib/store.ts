import { atom } from 'jotai';
import { CartItem, Product } from './types';

export const cartAtom = atom<CartItem[]>([]);
export const isCartOpenAtom = atom<boolean>(false);
export const productsAtom = atom<Product[]>([]);