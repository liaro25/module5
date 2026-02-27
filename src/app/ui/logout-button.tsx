"use client";

import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Button from "@/app/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await logout();

          // ✅ 1) notify header
          window.dispatchEvent(new Event("auth-changed"));

          // ✅ 2) refresh server + client boundaries
          router.refresh();

          // ✅ 3) optional: land user on login (prevents staying on protected UI)
          router.push("/login");
        });
      }}
    >
      <Button type="submit" disabled={isPending} variant="danger" size="md">
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </form>
  );
}
