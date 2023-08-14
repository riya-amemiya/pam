import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import Header from "@/components/Header";
import { ClientProviders } from "@/components/ClientProviders";
import { getMetadata } from "@/utils/getMetadata";
import { Analytics } from "@vercel/analytics/react";
import { Database } from "types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata = getMetadata({});
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          <div
            className="w-full h-full"
            style={{
              marginTop: "60px",
            }}
          >
            {children}
          </div>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
