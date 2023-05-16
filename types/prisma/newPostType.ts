import type { PrismaResDefault } from "types/prisma";

export type NewPostReq = {
	title: string;
	content: string;
};

export type NewPostRes = PrismaResDefault;
