import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Create Product</h1>
        <Link
          href="/admin/products"
          className="text-sm font-semibold text-blue-600"
        >
          Back
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6">
        <ProductForm mode="create" />
      </div>
    </main>
  );
}
