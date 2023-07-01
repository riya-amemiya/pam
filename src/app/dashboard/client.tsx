"use client";
import { SetSNSAccountReq, SetSNSAccountRes } from "types/prisma";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSWRConfig } from "swr";
import { GetUserDataRes } from "types/prisma/getUserDataType";
export const DashboardClient = ({
  data: userData,
}: { data: GetUserDataRes }) => {
  const { trigger: setSNSAccount } = useSWRMutation(
    "/api/prisma/setSNSAccount",
    fetcherPost<SetSNSAccountReq, SetSNSAccountRes>,
  );
  const { mutate: mutateGetUserData } = useSWRConfig();
  return (
    <div>
      <div className="flex items-center">
        <div>
          <Avatar
            src={userData.user?.image as string}
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </div>
        <div>
          <h1 className="text-4xl">{userData.user?.name}</h1>
        </div>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            GitHub?: { value: string };
          };
          await setSNSAccount({
            GitHubLink: target.GitHub?.value || "",
          });
          await mutateGetUserData("/api/prisma/getUserData");
        }}
      >
        <div>
          <div className="flex justify-center items-center">
            {userData && userData?.statusCode === 200 && (
              <TextField
                className="text-blue-500"
                defaultValue={userData.user?.GitHub || ""}
                name="GitHub"
                placeholder="GitHub Account Name"
                type="text"
              />
            )}
            <a
              href={`https://github.com/${userData.user?.GitHub}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon
                sx={{
                  fontSize: 50,
                }}
              />
            </a>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <Button size="large" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
