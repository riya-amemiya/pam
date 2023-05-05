import { Post, RoleName } from "@prisma/client";

export type NewPostReq = {
	title: string;
	content: string;
};

export type GetRoleRes = {
	statusCode: number;
	message: RoleName;
};

export type GetPostRes = {
	statusCode: number;
	message: Post[];
};
