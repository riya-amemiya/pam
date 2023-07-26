import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";
import { microcmsCardsType } from "@/test/microcmsCardsType";
import { SwiperClient } from "@/components/SwiperClient";
import Image from "next/image";
import { Section } from "@/components/Section";

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
        <h1 className="text-3xl md:text-4xl mb-3">Amemiya Riyaの実験室</h1>
        <Section>
          <div className="w-11/12 xl:w-1/2 mx-auto flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                alt={"アイコン"}
                className="mx-auto"
                height={500}
                loading="eager"
                src={"/icon.jpeg"}
                width={500}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Box
                display="flex"
                justify="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <div>
                  <p className="text-lg md:text-xl">
                    Cから始めた一般プログラマーです。 <br />
                    RustとWeb系が特に好きです。
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </Section>
        <Section>
          <h2 className="text-2xl md:text-3xl">使っている技術</h2>
          <div className="w-full xl:w-2/3 md:w-3/4 mx-auto">
            <SwiperClient>
              {data.contents.map(({ title, logo, link }) => {
                return (
                  <Box className="mx-auto pb-6 md:pb-3" key={title} width="75%">
                    <UseTechComponent
                      link={link}
                      src={logo.url}
                      title={title}
                    />
                  </Box>
                );
              })}
            </SwiperClient>
          </div>
        </Section>
      </Box>
    </Layout>
  );
}
