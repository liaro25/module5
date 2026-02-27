"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<Product[]>("/products", {
          params: { offset: 0, limit: 24 },
        });

        if (alive) setProducts(res.data);
      } catch {
        if (alive) setError("Failed to load products");
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur px-6 py-4 text-stone-600 shadow-[0_10px_30px_rgba(168,150,255,0.12)]">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-white/70 backdrop-blur px-6 py-4 text-red-600 shadow-[0_10px_30px_rgba(248,113,113,0.12)]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Hero header (pastel like homepage) */}
      <header className="relative border-b border-[#BFAEFF]/35 bg-white/30 backdrop-blur overflow-hidden">
        {/* soft glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#A896FF]/18 blur-3xl" />
          <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[#82E0FF]/14 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto max-w-2xl text-center">
            {/* Title: first */}
            <h1
              className="animate-fade-up text-3xl sm:text-5xl font-extrabold tracking-tight
        bg-linear-to-r from-[#A896FF] to-[#82E0FF]
        bg-clip-text text-transparent
        drop-shadow-[0_4px_12px_rgba(168,150,255,0.22)]"
            >
              Products
            </h1>

            {/* Subtitle: stagger */}
            <p className="animate-fade-up [animation-delay:140ms] mt-3 text-sm sm:text-base text-stone-600">
              Curated essentials for a smarter way to shop
            </p>
          </div>
        </div>
      </header>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </div>
    </section>
  );
}
