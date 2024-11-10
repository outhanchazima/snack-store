import { fetchProductById, fetchProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { Metadata } from "next";
import ProductDisplay from "../product-display";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
}

export default async function ProductPage({ params }: Awaited<PageProps>) {
  const product: Product | null = await fetchProductById((await params).id);

  if (!product) {
    // Return a 404 page, an error message, or a fallback component
    return <div>Product not found</div>;
  }

  return <ProductDisplay initialProduct={product} />;
}

export async function generateStaticParams() {
  const products: Product[] = await fetchProducts();

  return products.map((product) => ({
    id: product.id.toString(),  // Remove params wrapper, just return id directly
  }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product: Product | null = await fetchProductById((await params).id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  };
}
