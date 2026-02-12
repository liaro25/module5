"use client";

import { useCart } from "@/context/CartContext";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  const isEmpty = items.length === 0;

  const handlePlaceOrder = () => {
    // mock
    if (isEmpty) return;
    alert("✅ Order placed! (mock)");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <section className="mt-8 rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Order Summary</h2>

        {/* Line items */}
        <div className="mt-3 space-y-2 text-sm">
          {isEmpty ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex justify-between gap-4">
                <span className="line-clamp-1">
                  {it.title} × {it.quantity}
                </span>
                <span className="font-bold text-blue-600">
                  {priceLabel(it.price * it.quantity)}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-2 border-t pt-3 text-sm">
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

          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total</span>
            <span className="font-bold text-blue-600">{priceLabel(total)}</span>
          </div>
        </div>

        {/* Place Order (mock) */}
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isEmpty}
          className="mt-4 w-full rounded-lg border px-4 py-2 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Place Order (no payment)
        </button>
      </section>
    </main>
  );
}
