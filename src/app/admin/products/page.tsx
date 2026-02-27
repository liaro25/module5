import { headers } from "next/headers";
import ProductTable from "@/components/admin/ProductTable";
import type { Product } from "@/types/product";
import Button from "@/app/ui/button";

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
    <main className="flex-1 relative overflow-hidden">
      {/* Background like Admin/Dashboard */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/18 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/16 blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* HEADER */}
        <div className="mb-8 space-y-4">
          {/* Row 1 */}
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight
      bg-linear-to-r from-[#A896FF] to-[#82E0FF]
      bg-clip-text text-transparent"
            >
              Admin — Products
            </h1>

            <Button href="/admin/products/new" variant="primary" size="md">
              + Add Product
            </Button>
          </div>

          {/* Row 2 */}
          <div>
            <Button href="/admin" variant="secondary" size="md">
              ← Back to Admin Panel
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(168,150,255,0.14)]">
          <ProductTable products={products} />
        </div>
      </div>
    </main>
  );
}
