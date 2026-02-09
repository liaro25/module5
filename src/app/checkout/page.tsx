"use client";

import { useCart } from "@/context/CartContext";

function formatJPY(n: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(n);
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form (dummy dulu) */}
        <section className="border rounded-xl p-4">
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

          <button className="mt-4 px-4 py-2 rounded-lg border hover:opacity-90">
            Place Order (mock)
          </button>
        </section>

        {/* Summary */}
        <aside className="border rounded-xl p-4 h-fit">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="mt-3 space-y-2 text-sm">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between gap-4">
                <span className="line-clamp-1">
                  {it.title} × {it.quantity}
                </span>
                <span>{formatJPY(it.price * it.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatJPY(subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
