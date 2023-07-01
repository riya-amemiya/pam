import { Metadata } from "next";
export const generateMetadata = (metadata: Metadata) => {
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
    },
  };
};
