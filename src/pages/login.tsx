import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next/types";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { authOptions } from "./api/auth/[...nextauth]";
import GoogleIcon from "@mui/icons-material/Google";
const Login: NextPage<{
  providers: InferGetServerSidePropsType<typeof getServerSideProps>;
}> = ({ providers }) => {
  return (
    <Layout title="ログイン">
      <div className="flex flex-col items-center justify-center">
        {Object.values(providers).map((provider, index) => {
          const providerId =
            provider?.id as unknown as ClientSafeProvider["id"];
          const providerName =
            provider?.name as unknown as ClientSafeProvider["name"];
          return (
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index}>
              <button
                className="flex items-center"
                onClick={() => signIn(providerId)}
                type="button"
              >
                <span>{providerName === "Google" && <GoogleIcon />}</span>
                <span>ログイン</span>
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Login;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  if (!providers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { providers: providers },
  };
}
