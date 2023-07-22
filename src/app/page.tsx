import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";
import { microcmsCardsType } from "@/test/microcmsCardsType";

export const metadata = generateMetadata({
  title: "Home",
});

async function getMicrocms(endpoint: string): Promise<microcmsCardsType> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/microcms/${endpoint}`,
  );
  return await data.json();
}

export default async function Home() {
  const data: microcmsCardsType = await getMicrocms("cards");
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
                    link={link}
                    src={logo.url}
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
