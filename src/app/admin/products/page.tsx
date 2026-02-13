import { headers } from "next/headers";
import Link from "next/link";
import ProductTable from "@/components/admin/ProductTable";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

async function getProducts(): Promise<Product[]> {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/products?offset=0&limit=50`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Admin — Products</h1>
          <Link
            href="/admin"
            className="text-sm font-semibold text-gray-600 hover:underline"
          >
            ← Back to Admin Panel
          </Link>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border bg-white p-4">
        <ProductTable products={products} />
      </div>
    </main>
  );
}
