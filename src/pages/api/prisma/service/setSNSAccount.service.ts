import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
import type { SetSNSAccountReq } from "types/prismaType";

export const setSNSAccountService = async (
	session: Session,
	data: SetSNSAccountReq,
) => {
	await prisma.user.update({
		where: { email: session?.user?.email || "" },
		data: {
			GitHub: data.GitHubLink,
		},
	});
};
