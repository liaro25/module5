"use client";

// src/components/Header.tsx
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-gray-900">
          RevoShop
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-gray-700">
          <Link href="/faq" className="hover:text-blue-600">
            FAQ
          </Link>

          {/* Login masih dummy (nanti diganti Link /login) */}
          <button
            type="button"
            className="cursor-not-allowed opacity-60"
            title="Login (dummy)"
          >
            Login
          </button>

          {/* Cart REAL */}
          <Link
            href="/cart"
            className="relative hover:text-blue-600"
            title="Cart"
          >
            Cart
            <span className="absolute -top-2 -right-3 rounded-full bg-gray-900 px-1.5 text-xs text-white">
              {totalItems}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
