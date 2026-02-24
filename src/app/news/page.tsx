import Link from "next/link";
import { headers } from "next/headers";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};

export const revalidate = 10;

async function getBaseUrl() {
  const h = await headers();

  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");

  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

async function getNews(): Promise<NewsItem[]> {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/news`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight
            bg-linear-to-r from-[#A896FF] to-[#82E0FF]
            bg-clip-text text-transparent"
          >
            News (ISR Demo)
          </h1>

          <p className="text-sm text-stone-500 mt-2">
            Revalidates every 10 seconds. Refresh after 10s to see timestamps
            change.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white
          bg-linear-to-r from-[#A896FF] to-[#82E0FF]
          transition-all duration-300 ease-out
          shadow-[0_6px_18px_rgba(168,150,255,0.25)]
          hover:scale-105 hover:shadow-[0_12px_28px_rgba(168,150,255,0.35)]
          active:scale-95"
        >
          ← Back to Home
        </Link>
      </div>

      {/* List */}
      <div className="mt-8 space-y-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-(--border) bg-white/70 backdrop-blur p-6
            shadow-[0_10px_30px_rgba(168,150,255,0.10)]"
          >
            <h2 className="text-xl font-semibold text-stone-800">
              {item.title}
            </h2>
            <p className="text-stone-600 mt-2">{item.summary}</p>

            <p className="text-xs text-stone-500 mt-4">
              createdAt: {new Date(item.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
