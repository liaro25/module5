"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

export default function CartPage() {
  const { items, subtotal, totalItems, setQty, removeItem, clear } = useCart();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        {items.length > 0 && (
          <button type="button" className="text-sm underline" onClick={clear}>
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 border rounded-xl p-6">
          <p className="mb-4">Your cart is empty.</p>
          <Link className="underline" href="/">
            Back to products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items */}
          <section className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="border rounded-xl p-4 flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden border shrink-0 bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/200x200?text=No+Image";
                    }}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{it.title}</p>
                      <p className="text-sm font-bold text-blue-600">
                        {priceLabel(it.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-sm underline"
                      onClick={() => removeItem(it.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 border rounded-lg"
                      onClick={() => setQty(it.id, it.quantity - 1)}
                    >
                      -
                    </button>

                    <input
                      className="w-16 text-center border rounded-lg py-1"
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
                      className="px-3 py-1 border rounded-lg"
                      onClick={() => setQty(it.id, it.quantity + 1)}
                    >
                      +
                    </button>

                    <div className="ml-auto font-bold text-blue-600">
                      {priceLabel(it.price * it.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Summary */}
          <aside className="border rounded-xl p-4 h-fit">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-blue-600">
                  {priceLabel(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>0</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="font-bold text-blue-600">
                  {priceLabel(subtotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-4 inline-flex w-full justify-center px-4 py-2 rounded-lg border hover:opacity-90"
            >
              Go to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
