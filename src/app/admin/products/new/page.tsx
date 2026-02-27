import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Background (same family as Dashboard/Admin/Edit) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/20 blur-3xl -z-10" />

      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight
              bg-linear-to-r from-[#A896FF] to-[#82E0FF]
              bg-clip-text text-transparent"
            >
              Create Product
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Add a new product to your catalog.
            </p>
          </div>

          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold
              text-stone-700 border border-white/40 bg-white/60 backdrop-blur-md
              transition-all duration-300 ease-out active:scale-95
              hover:scale-105 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
          >
            ← Back
          </Link>
        </div>

        {/* Form card */}
        <section className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-7 shadow-[0_30px_60px_rgba(168,150,255,0.16)]">
          <ProductForm mode="create" />
        </section>
      </div>
    </main>
  );
}
