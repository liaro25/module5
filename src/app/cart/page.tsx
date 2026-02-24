"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

const primaryButton =
  "rounded-xl px-4 py-2.5 text-sm font-semibold text-white " +
  "bg-linear-to-r from-[#A896FF] to-[#82E0FF] " +
  "transition-all duration-300 ease-out " +
  "shadow-[0_6px_18px_rgba(168,150,255,0.25)] " +
  "hover:scale-105 hover:shadow-[0_12px_28px_rgba(168,150,255,0.35)] " +
  "active:scale-95";

const secondaryButton =
  "rounded-xl px-4 py-2.5 text-sm font-semibold text-stone-700 text-center " +
  "border border-(--border) bg-white/70 backdrop-blur " +
  "transition-all duration-300 ease-out " +
  "hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] " +
  "active:scale-95";

const ghostButton =
  "text-sm font-semibold text-[#6D4DFF] hover:opacity-80 transition underline underline-offset-4";

const qtyButton =
  "h-9 w-9 rounded-xl border border-(--border) bg-white/70 backdrop-blur " +
  "font-semibold text-stone-700 " +
  "transition-all duration-300 ease-out " +
  "hover:scale-105 hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)] " +
  "active:scale-95";

export default function CartPage() {
  const { items, subtotal, totalItems, setQty, removeItem, clear } = useCart();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-extrabold tracking-tight
            bg-linear-to-r from-[#A896FF] to-[#82E0FF]
            bg-clip-text text-transparent"
          >
            Cart
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Review your items before checkout.
          </p>
        </div>

        {items.length > 0 && (
          <button type="button" className={ghostButton} onClick={clear}>
            Clear cart
          </button>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-(--border) bg-white/70 backdrop-blur p-6 shadow-[0_10px_30px_rgba(168,150,255,0.10)]">
          <p className="mb-4 text-stone-700">Your cart is empty.</p>
          <Link className={ghostButton} href="/products">
            Back to products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Items */}
          <section className="space-y-4 md:col-span-2">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-(--border) bg-white/70 backdrop-blur p-4 shadow-[0_10px_30px_rgba(168,150,255,0.08)]"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-(--border) bg-white/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/200x200?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-stone-800 line-clamp-2">
                          {it.title}
                        </p>
                        <p
                          className="text-sm font-extrabold
                          bg-linear-to-r from-[#A896FF] to-[#82E0FF]
                          bg-clip-text text-transparent"
                        >
                          {priceLabel(it.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className={ghostButton}
                        onClick={() => removeItem(it.id)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Qty row */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className={qtyButton}
                        onClick={() => setQty(it.id, it.quantity - 1)}
                      >
                        -
                      </button>

                      <input
                        className="h-9 w-16 rounded-xl border border-(--border) bg-white/70 backdrop-blur text-center text-sm font-semibold text-stone-700"
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) => {
                          const next = parseInt(e.target.value, 10);
                          if (Number.isNaN(next)) return;
                          setQty(it.id, Math.max(1, next));
                        }}
                      />

                      <button
                        type="button"
                        className={qtyButton}
                        onClick={() => setQty(it.id, it.quantity + 1)}
                      >
                        +
                      </button>

                      <div
                        className="ml-auto text-base font-extrabold
                        bg-linear-to-r from-[#A896FF] to-[#82E0FF]
                        bg-clip-text text-transparent"
                      >
                        {priceLabel(it.price * it.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-(--border) bg-white/70 backdrop-blur p-5 shadow-[0_10px_30px_rgba(168,150,255,0.10)]">
            <h2 className="text-lg font-extrabold text-stone-800">Summary</h2>

            <div className="mt-4 space-y-2 text-sm text-stone-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span
                  className="font-extrabold
                  bg-linear-to-r from-[#A896FF] to-[#82E0FF]
                  bg-clip-text text-transparent"
                >
                  {priceLabel(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">0</span>
              </div>

              <div className="border-t border-[#BFAEFF]/40 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span
                  className="font-extrabold
                  bg-linear-to-r from-[#A896FF] to-[#82E0FF]
                  bg-clip-text text-transparent"
                >
                  {priceLabel(subtotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className={`mt-5 inline-flex w-full items-center justify-center ${primaryButton}`}
            >
              Go to Checkout
            </Link>

            <Link
              href="/products"
              className={`mt-3 inline-flex w-full ${secondaryButton}`}
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
