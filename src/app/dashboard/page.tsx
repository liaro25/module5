import Link from "next/link";
import { verifySession, getUser } from "@/lib/dal";
import LogoutButton from "@/app/ui/logout-button";

const primaryButton =
  "rounded-xl px-5 py-2.5 text-sm font-semibold text-white " +
  "bg-linear-to-r from-[#A896FF] to-[#82E0FF] " +
  "transition-all duration-300 ease-out " +
  "shadow-[0_8px_24px_rgba(168,150,255,0.25)] " +
  "hover:scale-105 hover:shadow-[0_16px_36px_rgba(168,150,255,0.35)] active:scale-95";

const secondaryButton =
  "rounded-xl px-5 py-2.5 text-sm font-semibold text-stone-700 " +
  "border border-white/40 bg-white/60 backdrop-blur-md " +
  "transition-all duration-300 ease-out " +
  "hover:scale-105 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] active:scale-95";

const dangerButton =
  "rounded-xl px-5 py-2.5 text-sm font-semibold text-white " +
  "bg-linear-to-r from-[#FF9EB5] to-[#FF6B8A] " +
  "transition-all duration-300 ease-out " +
  "hover:scale-105 hover:shadow-[0_12px_28px_rgba(255,107,138,0.35)] active:scale-95";

export default async function DashboardPage() {
  const session = await verifySession();
  const user = await getUser();

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-6 overflow-hidden relative">
      {/* Soft Gradient Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A896FF]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#82E0FF]/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-4xl">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight
            bg-linear-to-r from-[#A896FF] to-[#82E0FF]
            bg-clip-text text-transparent"
          >
            Dashboard
          </h1>

          <div className="flex gap-3 flex-wrap">
            <Link href="/products" className={secondaryButton}>
              Browse
            </Link>

            {session.role === "admin" && (
              <Link href="/admin" className={secondaryButton}>
                Admin
              </Link>
            )}

            <LogoutButton />
          </div>
        </div>

        {/* Glass Card */}
        <div className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-[0_30px_60px_rgba(168,150,255,0.18)]">
          <div className="flex items-center justify-between gap-8">
            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold text-stone-800">
                Welcome back{user?.name ? `, ${user.name}` : ""} ✨
              </h2>

              <div className="mt-4 space-y-1 text-sm text-stone-700">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Role:</strong> {session.role}
                </p>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href="/products" className={primaryButton}>
                  Shop Now
                </Link>
                <Link href="/cart" className={secondaryButton}>
                  View Cart
                </Link>
              </div>
            </div>

            {/* Avatar */}
            {user?.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name ?? "User"}
                className="w-24 h-24 rounded-3xl object-cover border border-white/40 shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
