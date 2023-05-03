import React from "react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/Layout";

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
