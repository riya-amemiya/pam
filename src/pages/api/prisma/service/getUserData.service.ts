import type { Session } from "next-auth";
import { getSNSAccountService } from "./getSNSAccount.service";
import { getRoleService } from "./getRole.service";
export const getUserDataService = async (session: Session) => {
	const snsAccount = await getSNSAccountService(session);
	const role = await getRoleService(session);
	return {
		snsAccount,
		role,
	};
};
