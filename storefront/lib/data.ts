// Acceso a datos desde JSON local (rama "vercel": sin base de datos)
// Todo se consume desde ./data/*.json — compatible con Vercel (serverless)

import productsData from '@/data/products.json';
import collectionsData from '@/data/collections.json';
import faqsData from '@/data/faqs.json';

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  images: string[];
  variants: ProductVariant[];
  features: string[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  productCount: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export function getProducts(): Product[] {
  return productsData.products as Product[];
}

export function getProductByHandle(handle: string): Product | undefined {
  return getProducts().find((p) => p.handle === handle);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return getProducts().slice(0, limit);
}

export function getCollections(): Collection[] {
  return collectionsData.collections as Collection[];
}

export function getFAQs(): FAQ[] {
  return faqsData.faqs as FAQ[];
}

export function getSubscriptions() {
  return faqsData.subscriptions;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}