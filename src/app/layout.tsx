import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import Header from "@/components/Header";
import { ClientProvider } from "@/components/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { generateMetadata } from "@/utils/generateMetadata";
import { Analytics } from "@vercel/analytics/react";
export const metadata = generateMetadata({});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ja">
      <body>
        <ClientProvider session={session}>
          <Header />
          <div
            className="w-full h-full"
            style={{
              marginTop: "60px",
            }}
          >
            {children}
          </div>
        </ClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
