"use server";

import { redirect } from "next/navigation";
import type { LoginFormState, User, AuthResponse } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";

const PLATZI_API_URL = "https://api.escuelajs.co/api/v1";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function login(state: LoginFormState, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors: { email?: string; password?: string } = {};
  if (!email || !isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (!password.trim()) errors.password = "Password is required.";
  if (Object.keys(errors).length) return { errors };

  try {
    // 1) Login -> token
    const loginRes = await fetch(`${PLATZI_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      const detail = await loginRes.text(); // IMPORTANT: see error message from API
      console.error("Login failed:", loginRes.status, detail);
      return { message: "Invalid email or password. Please try again." };
    }

    const authData = (await loginRes.json()) as AuthResponse;

    // 2) Profile -> user
    const profileRes = await fetch(`${PLATZI_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${authData.access_token}` },
      cache: "no-store",
    });

    if (!profileRes.ok) {
      const detail = await profileRes.text();
      console.error("Profile failed:", profileRes.status, detail);
      return { message: "Failed to fetch user profile." };
    }

    const user = (await profileRes.json()) as User;

    await createSession(user.id, user.email, user.role);

    redirect("/"); // sementara arahkan ke home dulu
  } catch (err) {
    console.error("Unexpected login error:", err);
    return { message: "Server error while logging in. Check server logs." };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
