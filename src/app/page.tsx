import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";
import { microcmsClient } from "@/lib/microcmsClient";
import { microcmsCardsType } from "@/test/microcmsCardsType";

export const metadata = generateMetadata({
  title: "Home",
});
const useTech = [
  {
    name: "Next.js",
    fileName: "nextjs.svg",
    link: "https://nextjs.org/",
    description: "Reactのフレームワークで、SSGやSSRを簡単に実装できる",
  },
  {
    name: "TypeScript",
    fileName: "typescript.svg",
    link: "https://www.typescriptlang.org/",
    description: "JavaScriptの型付け言語",
  },
  {
    name: "Material-UI",
    fileName: "material-ui.svg",
    link: "https://material-ui.com/",
    description: "ReactのUIフレームワーク",
  },
  {
    name: "Recoil",
    fileName: "recoil.svg",
    link: "https://recoiljs.org/",
    description: "Reactの状態管理ライブラリ",
  },
  {
    name: "Tailwind CSS",
    fileName: "tailwindcss.svg",
    link: "https://tailwindcss.com/",
    description: "CSSのフレームワーク",
  },
  {
    name: "Prisma",
    fileName: "prisma.svg",
    link: "https://www.prisma.io/",
    description: "ORM",
  },
];
export default async function Home() {
  const data: microcmsCardsType = await microcmsClient.get({
    endpoint: "cards",
  });
  console.log(data);
  return (
    <Layout>
      <Box textAlign={"center"}>
        <h1 className="text-4xl">Amemiya Riyaの実験室</h1>
        <div>
          <Box as="section" display="flex" flexWrap="wrap" justify="center">
            {data.contents.map(({ title, logo, link, description }) => {
              return (
                <div className="w-1/2 md:w-1/3" key={title}>
                  <UseTechComponent
                    description={description}
                    src={logo.url}
                    link={link}
                    title={title}
                  />
                </div>
              );
            })}
          </Box>
        </div>
      </Box>
    </Layout>
  );
}
