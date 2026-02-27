"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Button from "@/app/ui/button";
import { cn } from "@/lib/utils";

type Me = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
};

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();

  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : null;
      setMe(data);
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = res.ok ? await res.json() : null;
        if (alive) setMe(data);
      } catch {
        if (alive) setMe(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    const onAuthChanged = () => refreshMe();
    window.addEventListener("auth-changed", onAuthChanged);

    return () => {
      alive = false;
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, [refreshMe]);

  // backup: refresh on route change
  useEffect(() => {
    refreshMe();
  }, [pathname, refreshMe]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const navBtnClass = (href: string) =>
    cn(
      "relative",
      isActive(href) &&
        "bg-white/40 border border-white/40 shadow-[0_10px_28px_rgba(168,150,255,0.10)]",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-[#BFAEFF]/50 bg-[#D8CCFF]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] bg-clip-text text-transparent"
        >
          RevoShop
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3 text-sm font-semibold text-[#3B2F7F]">
          <Button
            href="/products"
            variant="ghost"
            size="md"
            className={navBtnClass("/products")}
          >
            Products
          </Button>

          <Button
            href="/news"
            variant="ghost"
            size="md"
            className={navBtnClass("/news")}
          >
            News
          </Button>

          <Button
            href="/faq"
            variant="ghost"
            size="md"
            className={navBtnClass("/faq")}
          >
            FAQ
          </Button>

          <Button
            href="/cart"
            variant="ghost"
            size="md"
            className={cn(navBtnClass("/cart"), "relative")}
          >
            Cart
            <span className="absolute -top-2 -right-3 rounded-full bg-linear-to-r from-[#8B7CFF] to-[#5BC0FF] px-1.5 text-xs text-white shadow-sm">
              {totalItems}
            </span>
          </Button>

          {!loading && !me && (
            <Button href="/login" variant="secondary" size="md">
              Login
            </Button>
          )}

          {!loading && me && (
            <Link
              href="/dashboard"
              className="relative h-12 w-12 rounded-full overflow-hidden transition hover:ring-2 hover:ring-white/50"
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
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-[#3B2F7F]">
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
