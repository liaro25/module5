import React from "react";

interface ProductGridProps {
  children: React.ReactNode;
}

export default function ProductGrid({ children }: ProductGridProps) {
  return (
    <main className="p-10 mx-w-7xl px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{children}</div>
    </main>
  );
}
