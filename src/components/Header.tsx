"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type Me = {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
};

export default function Header() {
  const { totalItems } = useCart();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then(setMe)
      .finally(() => setLoading(false));
  }, []);

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

          {/* AUTH AREA */}
          {!loading && !me && (
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          )}

          {!loading && me && (
            <Link
              href="/dashboard"
              className="relative h-9 w-9 overflow-hidden rounded-full border"
              title={me.name ?? me.email}
            >
              {me.avatar ? (
                <Image
                  src={me.avatar}
                  alt={me.name ?? "User"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs font-bold">
                  {(me.name ?? me.email ?? "U")[0]}
                </div>
              )}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
