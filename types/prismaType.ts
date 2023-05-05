import { RoleName } from "@prisma/client";

export type NewPostReq = {
	title: string;
	content: string;
};

export type GetRoleRes = {
	statusCode: number;
	message: RoleName;
};
