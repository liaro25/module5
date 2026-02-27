"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Button from "@/app/ui/button";

type Props = {
  product: Product;
  withQty?: boolean; // default: false (card)
};

export default function AddToCart({ product, withQty = false }: Props) {
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);

  // ✅ Added ✓ feedback (1–2s)
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const flashAdded = () => {
    setJustAdded(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setJustAdded(false), 1200);
  };

  const canDecrement = qty > 1;

  const onChangeQty = (raw: string) => {
    const next = parseInt(raw, 10);
    if (Number.isNaN(next)) return;
    setQty(Math.max(1, next));
  };

  const onAdd = (n: number) => {
    addItem(product, n);
    flashAdded();
  };

  // CARD (simple button)
  if (!withQty) {
    return (
      <Button
        type="button"
        variant={justAdded ? "secondary" : "primary"}
        size="sm"
        className="whitespace-nowrap min-w-28"
        onClick={() => onAdd(1)}
        disabled={justAdded}
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </Button>
    );
  }

  // PRODUCT DETAIL (with quantity)
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center overflow-hidden rounded-xl border border-white/40 bg-white/70 backdrop-blur shadow-sm">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={justAdded || !canDecrement}
          className="px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          –
        </button>

        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={qty}
          onChange={(e) => onChangeQty(e.target.value)}
          disabled={justAdded}
          className="w-16 bg-transparent py-3 text-center text-sm font-semibold text-stone-800 outline-none disabled:opacity-60"
          aria-label="Quantity"
        />

        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          disabled={justAdded}
          className="px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <Button
        type="button"
        variant={justAdded ? "secondary" : "primary"}
        size="md"
        onClick={() => onAdd(qty)}
        disabled={justAdded}
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </Button>
    </div>
  );
}
