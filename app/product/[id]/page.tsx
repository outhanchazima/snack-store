// app/product/[id]/page.tsx
import { fetchProductById, fetchProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { Metadata } from "next";
import ProductDisplay from "../product-display";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product: Product = await fetchProductById(params.id);
  
  return <ProductDisplay initialProduct={product} />;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  
  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  };
}