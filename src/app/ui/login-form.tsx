"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";
import Button from "@/app/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, undefined);

  useEffect(() => {
    // kalau login sukses dan halaman tidak redirect otomatis,
    // ini bantu sync header.
    if (!pending && state && !state.errors && !state.message) {
      window.dispatchEvent(new Event("auth-changed"));
      router.refresh();
    }
  }, [pending, state, router]);

  return (
    <form action={action} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@mail.com"
          required
          autoComplete="email"
          className="w-full px-4 py-2 border rounded-md"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm mt-1" aria-live="polite">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="changeme"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 border rounded-md"
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm mt-1" aria-live="polite">
            {state.errors.password}
          </p>
        )}
      </div>

      {state?.message && (
        <p className="text-red-500 text-sm" aria-live="polite">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} variant="primary" fullWidth>
        {pending ? "Logging in..." : "Login"}
      </Button>

      <div className="text-sm grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">User Test Credentials</h3>
          <p className="text-gray-300">Email: john@mail.com</p>
          <p className="text-gray-300">Password: changeme</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 whitespace-nowrap">
            Admin Test Credentials
          </h3>
          <p className="text-gray-300">Email: admin@mail.com</p>
          <p className="text-gray-300">Password: admin123</p>
        </div>
      </div>
    </form>
  );
}
