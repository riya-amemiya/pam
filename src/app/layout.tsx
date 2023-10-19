import { Box } from "@kuma-ui/core";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { cookies } from "next/headers";
import { ReactNode } from "react";

import { ClientProviders } from "@/components/ClientProviders";
import Header from "@/components/Header";
import "@/styles/globals.scss";
import { getMetadata } from "@/utils/getMetadata";
import "animate.css";
import "the-new-css-reset/css/reset.css";
import { Database } from "types/supabase";

export const metadata = getMetadata({});
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ja">
      <body>
        <ClientProviders>
          <Header user={user} />
          <Box height="100%" marginTop={"60px"} width="100%">
            {children}
          </Box>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
