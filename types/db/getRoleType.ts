export type GetRoleRes = {
  statusCode: number;
  role:
    | {
        role_id: string | null;
        Roles: {
          role_name: string;
        } | null;
      }[]
    | null;
};
