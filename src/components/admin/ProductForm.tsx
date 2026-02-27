"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import Button from "@/app/ui/button";

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

  const submitLabel = useMemo(() => {
    if (saving) return "Saving...";
    return mode === "create" ? "Create Product" : "Save Changes";
  }, [mode, saving]);

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
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
      images: images.trim() ? [images.trim()] : [],
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

  const labelClass = "text-sm font-semibold text-stone-700";
  const inputClass =
    "mt-1 w-full rounded-2xl border border-white/50 bg-white/70 backdrop-blur " +
    "px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 " +
    "shadow-[0_10px_28px_rgba(168,150,255,0.08)] " +
    "outline-none transition " +
    "focus:border-[#BFAEFF]/70 focus:ring-2 focus:ring-[#A896FF]/30";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Grid: Title + Price */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. Classic Hoodie"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Price</label>
          <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          rows={6}
          placeholder="Short product description..."
          required
        />
        <p className="mt-2 text-xs text-stone-500">
          Tip: keep it simple—this is displayed on the detail page.
        </p>
      </div>

      {/* Grid: Image URL + Category */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Image URL (first image)</label>
          <input
            value={images}
            onChange={(e) => setImages(e.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>Category ID</label>
          <input
            type="number"
            min={1}
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/products")}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button type="submit" variant="primary" disabled={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
