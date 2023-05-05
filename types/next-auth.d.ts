import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		role?: "ADMIN" | "USER";
	}
	interface Session extends DefaultSession {
		user: User;
	}
}
