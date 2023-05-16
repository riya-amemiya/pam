import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
export const getRoleService = async (session: Session) => {
	const user = await prisma.user.findFirstOrThrow({
		where: { email: session?.user?.email || "" },
	});
	return (
		(await prisma.userRelationRole.findFirst({
			where: {
				userId: user?.id,
			},
		})) ||
		(await prisma.userRelationRole.create({
			data: {
				userId: user.id,
				roleName: "USER",
			},
		}))
	);
};
