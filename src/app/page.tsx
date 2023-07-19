import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";

export const metadata = generateMetadata({
  title: "Home",
});
export default function Home() {
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
  return (
    <Layout>
      <Box textAlign={"center"}>
        <h1 className="text-4xl">Amemiya Riyaの実験室</h1>
        <div>
          <Box as="section" display="flex" justify="center" flexWrap="wrap">
            {useTech.map(({ name, fileName, link, description }) => {
              return (
                <div className="w-1/2 md:w-1/3" key={name}>
                  <UseTechComponent
                    description={description}
                    fileName={fileName}
                    link={link}
                    name={name}
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
