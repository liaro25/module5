import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCart";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id: rawId } = await params; // ✅ unwrap Promise
  const id = Number(rawId);

  if (Number.isNaN(id)) return notFound();

  try {
    const product = (await api.get<Product>(`/products/${id}`)).data;
    const mainImage =
      product.images?.[0] || "https://placehold.co/600x600?text=No+Image";

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl p-6">
          <div className="rounded-2xl border bg-white p-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-xl border bg-gray-100">
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Category: {product.category?.name}
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {product.title}
                </h1>

                <p className="mt-4 text-2xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-700">
                  {product.description}
                </p>

                <div className="mt-8 flex gap-3">
                  <AddToCartButton product={product} withQty />

                  <Link
                    href="/"
                    className="rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900"
                  >
                    Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch {
    return notFound();
  }
}
