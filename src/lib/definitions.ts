export type LoginFormState =
	| {
			errors?: {
				email?: string;
				password?: string;
			};
			message?: string;
	  }
	| undefined;

// User type from Platzi API
export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
	role: "customer" | "admin";
	avatar: string;
}

// Auth response from Platzi API
export interface AuthResponse {
	access_token: string;
	refresh_token: string;
}