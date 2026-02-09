// This page is statically generated (SSG) at build time
export default function FaqPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold">FAQ</h1>

        <ol className="space-y-4">
          <li className="rounded-2xl border bg-white p-5">
            <p className="font-semibold">1. How do I place an order?</p>
            <p className="mt-2 text-sm text-gray-700">
              Browse products, open the product detail page, then click “Add to
              Cart”. This demo does not include real checkout yet.
            </p>
          </li>

          <li className="rounded-2xl border bg-white p-5">
            <p className="font-semibold">2. Is my cart saved if I refresh?</p>
            <p className="mt-2 text-sm text-gray-700">
              Yes. Your cart is saved in your browser using localStorage, so it
              will stay even after refresh.
            </p>
          </li>

          <li className="rounded-2xl border bg-white p-5">
            <p className="font-semibold">3. Is this a real store?</p>
            <p className="mt-2 text-sm text-gray-700">
              No. RevoShop is a demo project created for learning purposes. No
              real transactions are processed.
            </p>
          </li>
        </ol>
      </main>
    </>
  );
}
