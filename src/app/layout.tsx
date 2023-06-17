import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
