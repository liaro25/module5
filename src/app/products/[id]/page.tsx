import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCart";
import Button from "@/app/ui/button";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (Number.isNaN(id)) return notFound();

  try {
    const product = (await api.get<Product>(`/products/${id}`)).data;

    const mainImage =
      product.images?.[0] || "https://placehold.co/600x600?text=No+Image";

    return (
      <main className="flex-1 relative overflow-hidden">
        {/* Soft pastel background */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A896FF]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#82E0FF]/20 rounded-full blur-3xl -z-10" />

        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(168,150,255,0.16)]">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/40 bg-white/60">
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <p className="text-sm text-stone-600">
                  Category:{" "}
                  <span className="font-semibold text-stone-800">
                    {product.category?.name ?? "—"}
                  </span>
                </p>

                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                  {product.title}
                </h1>

                <p className="mt-4 text-2xl font-extrabold bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] bg-clip-text text-transparent">
                  ${product.price.toLocaleString()}
                </p>

                <p className="mt-5 text-sm leading-6 text-stone-700">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <AddToCartButton product={product} withQty />
                  <Button
                    href="/products"
                    variant="secondary"
                    size="md"
                    className="whitespace-nowrap"
                  >
                    Back to Products
                  </Button>
                </div>

                {/* Optional helper text */}
                <p className="mt-4 text-xs text-stone-500">
                  Tips: adjust quantity then add to cart in one click.
                </p>
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
