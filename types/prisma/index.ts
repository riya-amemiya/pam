import { GetRoleRes } from "./getRoleType";
import { GetPostRes } from "./getPostType";
import { GetSNSAccountRes } from "./getSNSAccountType";
import { NewPostReq, NewPostRes } from "./newPostType";
import { SetSNSAccountReq, SetSNSAccountRes } from "./setSNSAccountType";

export type PrismaResDefault = {
	statusCode: number;
	message: string;
};

export type {
	GetRoleRes,
	GetPostRes,
	GetSNSAccountRes,
	NewPostReq,
	NewPostRes,
	SetSNSAccountReq,
	SetSNSAccountRes,
};
