import { Post, RoleName } from "@prisma/client";

export type PrismaResDefault = {
	statusCode: number;
	message: string;
};

export type NewPostReq = {
	title: string;
	content: string;
};

export type NewPostRes = PrismaResDefault;

export type GetRoleRes = {
	statusCode: number;
	message: RoleName;
};

export type GetPostRes = {
	statusCode: number;
	message: Post[];
};

export type SetSNSAccountReq = {
	GitHubLink: string;
};

export type SetSNSAccountRes = {
	statusCode: number;
};
