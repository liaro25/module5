"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    router.refresh(); // re-fetch server component data
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b text-xs uppercase text-gray-500">
          <tr>
            <th className="py-3 pr-4">ID</th>
            <th className="py-3 pr-4">Title</th>
            <th className="py-3 pr-4">Price</th>
            <th className="py-3 pr-4">Category</th>
            <th className="py-3 pr-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="py-3 pr-4">{p.id}</td>
              <td className="py-3 pr-4">{p.title}</td>
              <td className="py-3 pr-4">${p.price}</td>
              <td className="py-3 pr-4">{p.category?.name ?? "-"}</td>
              <td className="py-3 pr-4">
                <div className="flex gap-2">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td className="py-6 text-center text-gray-500" colSpan={5}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
