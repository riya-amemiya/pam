import { User } from "@prisma/client";

export type GetSNSAccountRes = {
	statusCode: number;
	github: User["GitHub"];
};
