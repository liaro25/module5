import { cookies } from "next/headers";

export interface SessionPayload {
	userId: number;
	email: string;
	role: string;
	expiresAt: string; // Store as ISO string for JSON serialization
}

export async function createSession(
	userId: number,
	email: string,
	role: string,
) {
	const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
	const session: SessionPayload = {
		userId,
		email,
		role,
		expiresAt: expiresAt.toISOString(),
	};
	const cookieStore = await cookies();

	cookieStore.set("session", JSON.stringify(session), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
	const cookie = (await cookies()).get("session")?.value;
	if (!cookie) return null;

	try {
		const session: SessionPayload = JSON.parse(cookie);
		// Check if session expired
		if (new Date(session.expiresAt) < new Date()) {
			return null;
		}
		return session;
	} catch (error) {
		return null;
	}
}