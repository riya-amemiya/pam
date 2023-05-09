import { Post } from "@prisma/client";

export type GetPostRes = {
	statusCode: number;
	data: Post[];
};
