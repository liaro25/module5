"use client";

import { useCart } from "@/context/CartContext";
import Button from "@/app/ui/button";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

const qtyBtn =
  "h-9 w-9 rounded-xl border border-white/40 bg-white/70 backdrop-blur " +
  "font-semibold text-stone-700 outline-none transition " +
  "hover:bg-white active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A896FF]/40";

const qtyInput =
  "h-9 w-16 rounded-xl border border-white/40 bg-white/70 backdrop-blur text-center " +
  "text-sm font-semibold text-stone-700 outline-none transition " +
  "focus-visible:ring-2 focus-visible:ring-[#A896FF]/40";

export default function CartPage() {
  const { items, subtotal, totalItems, setQty, removeItem, clear } = useCart();

  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/18 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/16 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight
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
            <Button type="button" variant="secondary" size="md" onClick={clear}>
              Clear cart
            </Button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-6 shadow-[0_18px_40px_rgba(168,150,255,0.12)]">
            <p className="mb-4 text-stone-700">Your cart is empty.</p>
            <Button href="/products" variant="secondary" size="sm">
              ← Back to products
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Items */}
            <section className="space-y-4 md:col-span-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-4 shadow-[0_18px_40px_rgba(168,150,255,0.10)]"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/40 bg-white/50">
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

                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          className="text-rose-600 hover:text-rose-700"
                          onClick={() => removeItem(it.id)}
                        >
                          Remove
                        </Button>
                      </div>

                      {/* Qty row */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          className={qtyBtn}
                          onClick={() => setQty(it.id, it.quantity - 1)}
                        >
                          -
                        </button>

                        <input
                          className={qtyInput}
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
                          className={qtyBtn}
                          onClick={() => setQty(it.id, it.quantity + 1)}
                        >
                          +
                        </button>

                        <div
                          className="ml-auto text-base font-extrabold
                          
                    text-[#6D4DFF]"
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
            <aside className="h-fit rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-5 shadow-[0_18px_40px_rgba(168,150,255,0.12)]">
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
                    
                    text-[#6D4DFF]"
                  >
                    {priceLabel(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">$0</span>
                </div>

                <div className="border-t border-[#BFAEFF]/40 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span
                    className="font-extrabold
                    text-[#6D4DFF]"
                  >
                    {priceLabel(subtotal)}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button href="/checkout" variant="primary" fullWidth>
                  Go to Checkout
                </Button>

                <Button href="/products" variant="secondary" fullWidth>
                  Continue Shopping
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
