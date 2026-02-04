"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "@/component/ProductGrid";
import ProductCard from "@/component/ProductCard";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true; // prevent setState after unmount

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<Product[]>(
          "https://api.escuelajs.co/api/v1/products",
          {
            params: { offset: 0, limit: 12 },
            timeout: 10000,
          }
        );

        if (alive) setProducts(res.data);
      } catch (err) {
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
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Page header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Data fetched from Platzi Fake Store API
          </p>
        </div>
      </header>

      {/* Product grid */}
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </section>
  );
}
