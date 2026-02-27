import Button from "@/app/ui/button";

// ✅ This page is SSG by default (no dynamic fetch, no cookies, no headers, no dynamic flags)
export default function FaqPage() {
  const buildTime = new Date().toLocaleString(); // SSG proof: this becomes the build timestamp

  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Soft background like other pages */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/20 blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Top bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight
              bg-linear-to-r from-[#A896FF] to-[#82E0FF]
              bg-clip-text text-transparent"
            >
              FAQ
            </h1>

            <p className="mt-2 text-sm text-stone-600">
              Quick answers about how this demo works.
            </p>
          </div>

          <Button href="/" variant="secondary" size="md">
            ← Back to Home
          </Button>
        </div>

        {/* SSG callout */}
        <div className="mb-6 rounded-2xl border border-white/40 bg-white/60 backdrop-blur p-4 shadow-[0_18px_40px_rgba(168,150,255,0.12)]">
          <p className="text-sm font-semibold text-stone-800">
            ⚡ Rendering: <span className="font-extrabold">SSG</span> (Static
            Site Generation)
          </p>
          <p className="mt-1 text-sm text-stone-700">
            This page is generated at build time and served as static HTML.
            <span className="ml-2 text-xs text-stone-500">
              (Build timestamp: {buildTime})
            </span>
          </p>
        </div>

        {/* FAQ items */}
        <ol className="space-y-4">
          <li className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
            <p className="font-bold text-stone-900">
              1. How do I place an order?
            </p>
            <p className="mt-2 text-sm text-stone-700 leading-6">
              Browse products, open a product detail page, then click{" "}
              <b>Add to Cart</b>. This demo does not include real checkout yet.
            </p>
          </li>

          <li className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
            <p className="font-bold text-stone-900">
              2. Is my cart saved if I refresh?
            </p>
            <p className="mt-2 text-sm text-stone-700 leading-6">
              Yes. Your cart is saved in your browser using <b>localStorage</b>,
              so it stays even after refresh.
            </p>
          </li>

          <li className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur p-6 shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
            <p className="font-bold text-stone-900">3. Is this a real store?</p>
            <p className="mt-2 text-sm text-stone-700 leading-6">
              No. RevoShop is a demo project created for learning purposes. No
              real transactions are processed.
            </p>
          </li>
        </ol>
      </div>
    </main>
  );
}
