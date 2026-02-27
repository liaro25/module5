import Image from "next/image";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Button from "@/app/ui/button";

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
          <Button href="/login" variant="primary" size="lg">
            Login
          </Button>

          <Button href="/products" variant="secondary" size="lg">
            Products
          </Button>

          <Button href="/news" variant="secondary" size="lg">
            News
          </Button>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 mt-5">
          Check out our latest platform updates and improvements.
        </p>
      </div>
    </div>
  );
}
