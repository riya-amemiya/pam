import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import Header from "./components/Header";
import { ClientProvider } from "./components/ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ClientProvider>
          <Header />
          <div
            style={{
              marginTop: "60px",
            }}
          >
            {children}
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
