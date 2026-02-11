import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return notFound();
  }

  try {
    const product = (await api.get<Product>(`/products/${id}`)).data;
    const { title, price, description, images, category } = product;
    const mainImage = images?.[0] || "/images/placeholder.svg";
    const priceLabel = `$${price.toLocaleString()}`;

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl p-6">
          <div className="rounded-2xl border bg-white p-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl border bg-gray-100">
                <Image
                  src={mainImage}
                  alt={title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>

              {/* Info */}
              <div>
                <p className="text-sm text-gray-500">
                  Category: {category?.name}
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {title}
                </h1>

                <p className="mt-4 text-2xl font-bold text-gray-900">
                  {priceLabel}
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-700">
                  {description}
                </p>

                <div className="mt-8 flex gap-3">
                  <AddToCart product={product} withQty />

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
  } catch (error: any) {
    if (error.response?.status === 404) {
      return notFound();
    }

    throw new Error("Failed to fetch product detail");
  }
}
