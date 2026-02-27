"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import Button from "@/app/ui/button";

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) {
        alert("Failed to delete product");
        return;
      }

      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-left">
        {/* lock widths so Title doesn't eat everything */}
        <colgroup>
          <col className="w-20" /> {/* ID */}
          <col /> {/* Title */}
          <col className="w-35" /> {/* Price */}
          <col className="w-45" /> {/* Category */}
          <col className="w-55" /> {/* Actions */}
        </colgroup>

        <thead className="border-b border-white/40 text-xs uppercase tracking-wide text-stone-500">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => {
            const isDeleting = deletingId === p.id;

            return (
              <tr
                key={p.id}
                className="border-b border-white/30 last:border-0 hover:bg-white/35 transition"
              >
                <td className="py-4 px-4 font-semibold text-stone-700 align-top">
                  {p.id}
                </td>

                <td className="py-4 px-4 align-top">
                  <div className="font-semibold text-stone-900 leading-snug line-clamp-2 wrap-break-word">
                    {p.title}
                  </div>
                </td>

                <td className="py-4 px-4 align-top">
                  <span className="text-lg font-extrabold bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] bg-clip-text text-transparent">
                    ${p.price}
                  </span>
                </td>

                <td className="py-4 px-4 align-top">
                  <span className="inline-flex rounded-full border border-white/50 bg-white/70 px-3 py-1 text-sm font-semibold text-stone-700">
                    {p.category?.name ?? "-"}
                  </span>
                </td>

                <td className="py-4 px-4 align-top">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Button
                      href={`/admin/products/${p.id}/edit`}
                      variant="secondary"
                      size="md"
                      className="px-4 py-2 text-sm whitespace-nowrap"
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      size="md"
                      className="px-4 py-2 text-sm whitespace-nowrap"
                      disabled={isDeleting}
                      onClick={() => handleDelete(p.id)}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}

          {products.length === 0 && (
            <tr>
              <td className="py-10 text-center text-stone-500" colSpan={5}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
