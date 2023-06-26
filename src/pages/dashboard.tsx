import Layout from "@/components/Layout";
import { SetSNSAccountReq, SetSNSAccountRes } from "types/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
import { useSWRConfig } from "swr";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
const Dashboard = ({
  data: userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { trigger: setSNSAccount, isMutating: isSetSNSAccountLoading } =
    useSWRMutation(
      "/api/prisma/setSNSAccount",
      fetcherPost<SetSNSAccountReq, SetSNSAccountRes>,
    );
  const { mutate: mutateGetUserData } = useSWRConfig();
  return (
    <Layout loading={isSetSNSAccountLoading} title="ダッシュボード">
      <div className="flex justify-center">
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
                {userData &&
                  userData?.statusCode === 200 &&
                  userData.user.GitHub && (
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

            <div className="flex justify-center">
              <Button size="large" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps<{ data: GetUserDataRes }> =
  async ({ res, req }) => {
    const session = await getServerSession(req, res, authOptions);
    let returnData: GetUserDataRes = {
      statusCode: 401,
      user: null,
    };
    if (session) {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: true,
          UserRelationRole: true,
        },
      });

      if (session) {
        returnData = {
          ...{
            user: {
              ...user,
              role: user.UserRelationRole,
              post: user.Post,
            },
          },
          statusCode: 200,
        };
      }
    }
    return {
      props: {
        data: {
          ...JSON.parse(JSON.stringify(returnData)),
        },
      },
    };
  };
