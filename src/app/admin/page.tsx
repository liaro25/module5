import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { logout } from "@/app/actions/auth";
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

export default async function AdminPage() {
  const session = await requireRole(["admin"]);

  return (
    <main className="flex-1 relative overflow-hidden">
      {/* Background like Dashboard */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#EAE4FF] via-[#F6F9FF] to-[#E6F7FF]" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A896FF]/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#82E0FF]/20 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* TOP BAR */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight
            bg-linear-to-r from-[#A896FF] to-[#82E0FF]
            bg-clip-text text-transparent"
          >
            Admin Panel
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard" className={secondaryButton}>
              ← Back to Dashboard
            </Link>

            <LogoutButton />
          </div>
        </div>

        {/* Admin only banner (soft pastel warning) */}
        <div className="mb-6 rounded-2xl border border-[#FFE08A]/35 bg-[#FFF7CC]/60 backdrop-blur p-4 shadow-[0_10px_30px_rgba(255,224,138,0.18)]">
          <p className="font-extrabold text-stone-800">⚠️ Admin Only Area</p>
          <p className="mt-1 text-sm text-stone-700">
            Only users with the <span className="font-semibold">admin</span>{" "}
            role can access this page.
          </p>
        </div>

        {/* Main card */}
        <section className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-7 shadow-[0_30px_60px_rgba(168,150,255,0.16)]">
          <h2 className="text-xl font-extrabold text-stone-800 mb-4">
            Admin Controls
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link href="/admin/products" className={primaryButton}>
              ⚙️ Manage Products
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-white/40 bg-white/50 backdrop-blur p-4 text-sm text-stone-700">
            <p>
              <span className="font-extrabold">Current User:</span>{" "}
              {session.email}
            </p>
            <p>
              <span className="font-extrabold">Role:</span> {session.role}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
