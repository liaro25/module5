import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();

  if (session?.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-6 overflow-hidden">
      <div className="text-center max-w-2xl">
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight 
          bg-linear-to-r from-[#A896FF] to-[#82E0FF] 
          bg-clip-text text-transparent 
          drop-shadow-[0_4px_12px_rgba(168,150,255,0.35)]"
        >
          Welcome to RevoShop
        </h1>

        {/* Logo */}
        <div className="flex justify-center my-5">
          <Image
            src="/revoshoplogo.png"
            alt="RevoShop Logo"
            width={380}
            height={380}
            className="drop-shadow-[0_8px_24px_rgba(168,150,255,0.35)]"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="mt-3 text-2xl sm:text-3xl font-semibold text-stone-600 tracking-tight">
          Shop Smart. Skip the Lines.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mt-7">
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl text-white font-medium
bg-linear-to-r from-[#A896FF] to-[#82E0FF]
transition-all duration-300 ease-out
shadow-[0_6px_16px_rgba(168,150,255,0.25)]
hover:scale-105
hover:shadow-[0_12px_28px_rgba(168,150,255,0.35)]
active:scale-95"
          >
            Login
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 rounded-xl border border-(--border)
bg-white/70 backdrop-blur
transition-all duration-300 ease-out
hover:scale-105
hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
active:scale-95"
          >
            Products
          </Link>

          <Link
            href="/news"
            className="px-6 py-3 rounded-xl border border-(--border)
bg-white/70 backdrop-blur
transition-all duration-300 ease-out
hover:scale-105
hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
active:scale-95"
          >
            News
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 mt-5">
          Check out our latest platform updates and improvements.
        </p>
      </div>
    </div>
  );
}
