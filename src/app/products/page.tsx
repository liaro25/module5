"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import Button from "@/app/ui/button";
import { Product } from "@/types/product";

type SortKey = "default" | "price_asc" | "price_desc";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Filters
  const [sort, setSort] = useState<SortKey>("default");
  const [category, setCategory] = useState<string>("all");

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

  const categories = useMemo(() => {
    const names = Array.from(
      new Set(
        products
          .map((p) => p.category?.name)
          .filter((v): v is string => Boolean(v && v.trim())),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return ["all", ...names];
  }, [products]);

  const processedProducts = useMemo(() => {
    const filtered =
      category === "all"
        ? products
        : products.filter((p) => p.category?.name === category);

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

    return sorted;
  }, [products, category, sort]);

  const hasActiveFilters = category !== "all" || sort !== "default";

  const clearFilters = () => {
    setCategory("all");
    setSort("default");
  };

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
        {/* ✅ Toolbar (fixed select + custom chevron + Button component) */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="w-22.5 text-sm text-stone-600">Category</span>

              <div className="relative w-full sm:w-70">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 w-full appearance-none rounded-2xl border border-stone-200 bg-white/80 pl-4 pr-10 text-sm text-stone-800 shadow-sm outline-none backdrop-blur transition focus:border-[#BFAEFF]/60 focus:ring-2 focus:ring-[#BFAEFF]/25"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All" : cat}
                    </option>
                  ))}
                </select>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="w-22.5 text-sm text-stone-600">Sort</span>

              <div className="relative w-full sm:w-70">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-11 w-full appearance-none rounded-2xl border border-stone-200 bg-white/80 pl-4 pr-10 text-sm text-stone-800 shadow-sm outline-none backdrop-blur transition focus:border-[#BFAEFF]/60 focus:ring-2 focus:ring-[#BFAEFF]/25"
                >
                  <option value="default">Default</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Clear (use your Button component) */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="h-11 rounded-2xl"
          >
            Clear filters
          </Button>
        </div>

        {/* Optional: tiny status line */}
        <div className="mb-4 text-xs text-stone-500">
          Showing{" "}
          <span className="font-semibold text-stone-700">
            {processedProducts.length}
          </span>{" "}
          items
          {hasActiveFilters ? (
            <>
              {" "}
              (filtered from{" "}
              <span className="font-semibold text-stone-700">
                {products.length}
              </span>
              )
            </>
          ) : null}
        </div>

        <ProductGrid>
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </div>
    </section>
  );
}
