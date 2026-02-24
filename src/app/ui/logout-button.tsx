"use client";

import { logout } from "@/app/actions/auth";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => {
          logout();
        });
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="
          px-5 py-2.5 rounded-xl font-semibold text-white
          bg-linear-to-r from-rose-400 to-pink-500
          transition-all duration-300 ease-out
          shadow-[0_6px_16px_rgba(244,114,182,0.35)]
          hover:scale-105
          hover:shadow-[0_10px_24px_rgba(244,114,182,0.45)]
          active:scale-95
          disabled:opacity-50
        "
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}
