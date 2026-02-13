import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/dal";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

async function getProduct(id: number): Promise<Product> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function EditProductPage({ params }: PageProps) {
  await requireRole(["admin"]);

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (Number.isNaN(id)) return notFound();

  let product: Product;
  try {
    product = await getProduct(id);
  } catch {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Edit Product</h1>

        <Link
          href="/admin/products"
          className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <ProductForm mode="edit" initial={product} productId={id} />
      </div>
    </main>
  );
}
