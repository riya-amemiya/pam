import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
export const getSNSAccountService = async (session: Session) => {
	return await prisma.user.findFirstOrThrow({
		where: {
			email: session.user.email,
		},
	});
};
