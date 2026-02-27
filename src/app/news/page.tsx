import { headers } from "next/headers";
import Button from "@/app/ui/button";

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
    <main className="flex-1 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/18 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/16 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight
              bg-linear-to-r from-[#A896FF] to-[#82E0FF]
              bg-clip-text text-transparent"
            >
              News (ISR Demo)
            </h1>

            <p className="mt-2 text-sm text-stone-600">
              Revalidates every{" "}
              <span className="font-semibold text-[#6D4DFF]">10 seconds</span>.
              Refresh after 10s to see timestamps update.
            </p>
          </div>

          <Button href="/" variant="secondary" size="md">
            ← Back to Home
          </Button>
        </div>

        {/* ISR Info Card */}
        <div className="mt-6 rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-4 text-sm text-stone-700 shadow-[0_18px_40px_rgba(168,150,255,0.10)]">
          ⚡ This page uses{" "}
          <span className="font-semibold text-[#6D4DFF]">
            Incremental Static Regeneration (ISR)
          </span>
          .
        </div>

        {/* List */}
        <div className="mt-8 space-y-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur p-6
              shadow-[0_18px_40px_rgba(168,150,255,0.10)]"
            >
              <h2 className="text-xl font-semibold text-stone-800">
                {item.title}
              </h2>

              <p className="mt-2 text-stone-600 leading-6">{item.summary}</p>

              <p className="mt-4 text-xs text-stone-500">
                createdAt:{" "}
                <span className="font-semibold text-[#6D4DFF]">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
