// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
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

          <button
            type="button"
            className="cursor-not-allowed opacity-60"
            title="Login (dummy)"
          >
            Login
          </button>

          <button
            type="button"
            className="relative cursor-not-allowed opacity-60"
            title="Cart (dummy)"
          >
            Cart
            <span className="absolute -top-2 -right-3 rounded-full bg-gray-300 px-1.5 text-xs text-white">
              0
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
