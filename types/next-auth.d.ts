import NextAuth, { DefaultSession } from "next-auth";
import { RoleName } from "@prisma/client";
declare module "next-auth" {
	interface User {
		role?: RoleName;
	}
	interface Session extends DefaultSession {
		user: User;
	}
}
