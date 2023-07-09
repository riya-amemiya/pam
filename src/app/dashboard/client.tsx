"use client";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import {
  UpdateUserDataReq,
  UpdateUserDataRes,
} from "types/prisma/updateUserDataType";

export const DashboardClient = ({
  data: userData,
}: { data: GetUserDataRes }) => {
  const { trigger: updateUserData } = useSWRMutation(
    "/api/prisma/updateUserData",
    fetcherPost<UpdateUserDataReq, UpdateUserDataRes>,
  );
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
            OPENAI_API_KEY?: { value: string };
          };
          await updateUserData({
            GitHub: target.GitHub?.value,
            OPENAI_API_KEY:
              target.OPENAI_API_KEY?.value &&
              btoa(encodeURIComponent(target.OPENAI_API_KEY?.value)),
          });
        }}
      >
        <div>
          <div className="flex justify-center items-center">
            {userData && userData?.statusCode === 200 && (
              <div className="flex flex-col items-center justify-center">
                <div>
                  <div className="mb-5">
                    <TextField
                      label="GitHub"
                      className="text-blue-500"
                      defaultValue={userData.user?.GitHub || ""}
                      name="GitHub"
                      placeholder="GitHub Account Name"
                      type="text"
                    />
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
                  <div className="mb-5">
                    <TextField
                      label="OPENAI_API_KEY"
                      className="text-blue-500"
                      defaultValue={
                        userData.user?.OPENAI_API_KEY
                          ? decodeURIComponent(
                              atob(userData.user?.OPENAI_API_KEY),
                            )
                          : ""
                      }
                      name="OPENAI_API_KEY"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            )}
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
