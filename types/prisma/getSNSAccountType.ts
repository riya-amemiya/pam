import { User } from "@prisma/client";

export type GetSNSAccountRes = {
	GitHub: User["GitHub"];
	Facebook: User["Facebook"];
	Twitter: User["Twitter"];
};
