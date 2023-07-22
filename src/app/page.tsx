import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";
import { microcmsCardsType } from "@/test/microcmsCardsType";
import { SwiperClient } from "@/components/SwiperClient";

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
        <h1 className="text-3xl md:text-4xl">Amemiya Riyaの実験室</h1>
        <section>
          <h2 className="text-2xl md:text-3xl">使っている技術</h2>
          <div className="w-full xl:w-2/3 md:w-3/4 mx-auto">
            <SwiperClient>
              {data.contents.map(({ title, logo, link, description }) => {
                return (
                  <Box
                    className="mx-auto pb-3"
                    key={title + description}
                    width="75%"
                  >
                    <UseTechComponent
                      description={description}
                      link={link}
                      src={logo.url}
                      title={title}
                    />
                  </Box>
                );
              })}
            </SwiperClient>
          </div>
        </section>
      </Box>
    </Layout>
  );
}
