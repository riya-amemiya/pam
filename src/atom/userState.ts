import { RoleName } from "@prisma/client";
import { atom } from "recoil";
interface User {
  email: string;
  role: RoleName;
  name: string;
  image: string;
  sns: {
    GitHub: string | null;
    Facebook: string | null;
    Twitter: string | null;
  };
}
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
