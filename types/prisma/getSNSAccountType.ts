import { User } from "@prisma/client";

export type GetSNSAccountRes =
  | {
      statusCode: 200;
      snsAccount: {
        GitHub: User["GitHub"];
        Facebook: User["Facebook"];
        Twitter: User["Twitter"];
      };
    }
  | {
      statusCode: 401;
      snsAccount: null;
    };
