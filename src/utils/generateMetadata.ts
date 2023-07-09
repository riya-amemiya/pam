import { Metadata } from "next";
export const generateMetadata = (metadata: Metadata): Metadata => {
  const title = `${metadata.title} | Amemiya Riyaの実験室`;
  const description =
    metadata.description ||
    "Amemiya Riyaの実験室は、Amemiya Riyaが実験的に作成した技術検証Webサイトです。";
  return {
    ...metadata,
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "ja_JP",
      type: "website",
      siteName: "Amemiya Riyaの実験室",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "Riya31377928",
    },
    creator: "Amemiya Riya",
  };
};
