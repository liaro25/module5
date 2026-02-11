"use client";

import { useCart } from "@/context/CartContext";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <section className="border rounded-xl p-4 bg-white">
          <h2 className="font-semibold">Customer Info</h2>
          <div className="mt-4 space-y-3">
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Full name"
            />
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Email"
            />
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Address"
            />
          </div>

          <button
            type="button"
            className="mt-4 px-4 py-2 rounded-lg border hover:opacity-90"
          >
            Place Order
          </button>
        </section>

        {/* Summary */}
        <aside className="border rounded-xl p-4 h-fit bg-white">
          <h2 className="font-semibold">Order Summary</h2>

          {/* Line items */}
          <div className="mt-3 space-y-2 text-sm">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between gap-4">
                <span className="line-clamp-1">
                  {it.title} × {it.quantity}
                </span>
                <span className="font-bold text-blue-600">
                  {priceLabel(it.price * it.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 text-sm border-t pt-3">
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
              <span>{shipping === 0 ? "0" : priceLabel(shipping)}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="font-bold text-blue-600">
                {priceLabel(total)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
