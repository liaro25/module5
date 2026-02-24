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
    <header className="sticky top-0 z-50 border-b border-[#BFAEFF]/50 bg-[#D8CCFF]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] bg-clip-text text-transparent"
        >
          RevoShop
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-[#3B2F7F]">
          <Link href="/faq" className="transition hover:text-[#6D4DFF]">
            FAQ
          </Link>

          <Link
            href="/cart"
            className="relative transition hover:text-[#6D4DFF]"
            title="Cart"
          >
            Cart
            <span className="absolute -top-2 -right-3 rounded-full bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] px-1.5 text-xs text-white shadow-sm">
              {totalItems}
            </span>
          </Link>

          {!loading && !me && (
            <Link
              href="/login"
              className="rounded-xl border border-[#BFAEFF]/70 bg-white/60 px-3 py-1.5 transition hover:bg-white"
            >
              Login
            </Link>
          )}

          {!loading && me && (
            <Link
              href="/dashboard"
              className="relative h-9 w-9 overflow-hidden rounded-full border border-[#BFAEFF]/60 bg-white/60"
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
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#3B2F7F]">
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
