import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next/types";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { authOptions } from "./api/auth/[...nextauth]";
const Login: NextPage<{
  providers: InferGetServerSidePropsType<typeof getServerSideProps>;
}> = ({ providers }) => {
  return (
    <Layout title="ログイン">
      {Object.values(providers).map((provider, index) => {
        return (
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index}>
            <button
              onClick={() =>
                signIn(provider?.id as unknown as ClientSafeProvider["id"])
              }
              type="button"
            >
              Sign in with{" "}
              {provider?.name as unknown as ClientSafeProvider["name"]}
            </button>
          </div>
        );
      })}
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
