import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import Header from "@/components/Header";
import { ClientProviders } from "@/components/ClientProviders";
import { getServerSession } from "next-auth";
import { getMetadata } from "@/utils/getMetadata";
import { Analytics } from "@vercel/analytics/react";
import { authOptions } from "%/api/auth/[...nextauth]/route";
export const metadata = getMetadata({});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ja">
      <body>
        <ClientProviders session={session}>
          <Header />
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
