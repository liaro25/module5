"use client";

import { useState } from "react";
import Button from "@/app/ui/button";
import { useCart } from "@/context/CartContext";

const priceLabel = (n: number) => `$${n.toLocaleString()}`;

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const shipping = 0;
  const total = subtotal + shipping;
  const isEmpty = items.length === 0;

  const handlePlaceOrder = () => {
    if (isEmpty) return;

    // ✅ demo "success" behavior
    setPlaced(true);
    clear(); // important: cart cleared after order
  };

  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/18 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/16 blur-3xl -z-10" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight
              bg-linear-to-r from-[#A896FF] to-[#82E0FF]
              bg-clip-text text-transparent"
            >
              {placed ? "Order Confirmed" : "Checkout"}
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              This is a demo checkout (no payment).
            </p>
          </div>

          <Button
            href={placed ? "/products" : "/cart"}
            variant="secondary"
            size="md"
          >
            {placed ? "← Back to Products" : "← Back to Cart"}
          </Button>
        </div>

        {/* ✅ Success state */}
        {placed ? (
          <section className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-6 shadow-[0_18px_40px_rgba(168,150,255,0.12)]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-lg">✅</div>
              <div>
                <h2 className="text-lg font-extrabold text-stone-800">
                  Order placed! (mock)
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  Thanks! Your cart has been cleared. You can continue shopping
                  anytime.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button href="/products" variant="primary" fullWidth>
                    Continue Shopping
                  </Button>
                  <Button href="/dashboard" variant="secondary" fullWidth>
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Card */
          <section className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-6 shadow-[0_18px_40px_rgba(168,150,255,0.12)]">
            <h2 className="text-lg font-extrabold text-stone-800">
              Order Summary
            </h2>

            {/* Line items */}
            <div className="mt-4 space-y-2 text-sm">
              {isEmpty ? (
                <div className="rounded-2xl border border-white/40 bg-white/60 p-4 text-stone-700">
                  Your cart is empty.
                  <div className="mt-3">
                    <Button href="/products" variant="primary" size="sm">
                      Browse Products
                    </Button>
                  </div>
                </div>
              ) : (
                items.map((it) => (
                  <div key={it.id} className="flex justify-between gap-4">
                    <span className="line-clamp-1 text-stone-700">
                      {it.title} × {it.quantity}
                    </span>
                    <span className="font-extrabold text-[#6D4DFF]">
                      {priceLabel(it.price * it.quantity)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 border-t border-[#BFAEFF]/40 pt-4 text-sm text-stone-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-extrabold text-[#6D4DFF]">
                  {priceLabel(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "$0" : priceLabel(shipping)}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#BFAEFF]/40 pt-3">
                <span className="font-semibold text-stone-800">Total</span>
                <span className="text-base font-extrabold text-[#6D4DFF]">
                  {priceLabel(total)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="primary"
                fullWidth
                disabled={isEmpty}
                onClick={handlePlaceOrder}
              >
                Place Order (mock)
              </Button>

              <Button href="/products" variant="secondary" fullWidth>
                Continue Shopping
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
