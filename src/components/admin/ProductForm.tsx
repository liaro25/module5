"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";

type FormMode = "create" | "edit";

type ProductFormProps = {
  mode: FormMode;
  initial?: Partial<Product>;
  productId?: number; // required for edit
};

export default function ProductForm({
  mode,
  initial,
  productId,
}: ProductFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState<number>(Number(initial?.price ?? 1));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [images, setImages] = useState<string>(
    (initial?.images?.[0] as string) ?? "",
  );
  const [categoryId, setCategoryId] = useState<number>(
    Number((initial as any)?.category?.id ?? 1),
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (mode === "edit" && !productId) {
      setError("Missing productId for edit mode");
      setSaving(false);
      return;
    }

    const payload = {
      title,
      price: Number(price),
      description,
      images: images ? [images] : [],
      categoryId: Number(categoryId),
    };

    try {
      const url =
        mode === "create" ? "/api/products" : `/api/products/${productId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="text-sm font-semibold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Price</label>
        <input
          type="number"
          min={1}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          rows={5}
          required
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Image URL (first image)</label>
        <input
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Category ID</label>
        <input
          type="number"
          min={1}
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving
          ? "Saving..."
          : mode === "create"
            ? "Create Product"
            : "Save Changes"}
      </button>
    </form>
  );
}
