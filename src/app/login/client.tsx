"use client";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";

import Layout from "@/components/Layout";
import GoogleIcon from "@mui/icons-material/Google";

import { BuiltInProviderType } from "next-auth/providers";
export const LoginClient = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}) => {
  return (
    <Layout>
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
