"use client";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";

import Layout from "@/components/Layout";
import GoogleIcon from "@mui/icons-material/Google";

import { BuiltInProviderType } from "next-auth/providers";
import { Box, Button } from "@kuma-ui/core";
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
      <Box alignItems="center" display="flex" flexDir="column" justify="center">
        {Object.values(providers).map((provider, index) => {
          const providerId =
            provider?.id as unknown as ClientSafeProvider["id"];
          const providerName =
            provider?.name as unknown as ClientSafeProvider["name"];
          return (
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index}>
              <Button
                alignItems="center"
                display="flex"
                onClick={() => signIn(providerId)}
                type="button"
              >
                <span>{providerName === "Google" && <GoogleIcon />}</span>
                <span>ログイン</span>
              </Button>
            </div>
          );
        })}
      </Box>
    </Layout>
  );
};
