import { RoleName } from "@prisma/client";
import { atom } from "recoil";
interface User {
	email: string;
	role: RoleName;
	name: string;
	image: string;
}
export const userState = atom<User | null>({
	key: "userState",
	default: null,
});
