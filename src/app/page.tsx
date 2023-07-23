import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import { UseTechComponent } from "./index/useTechComponent";
import { Box } from "@kuma-ui/core";
import { microcmsCardsType } from "@/test/microcmsCardsType";
import { SwiperClient } from "@/components/SwiperClient";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
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
          <Card className="w-3/4 xl:w-1/2 mx-auto rounded-2xl">
            <CardMedia>
              <Image
                alt={"アイコン"}
                className="mx-auto"
                height={500}
                src={"/icon.jpeg"}
                width={500}
              />
            </CardMedia>
            <CardContent>
              <p className="text-lg md:text-xl">
                Cから始めた一般プログラマーです。RustとWeb系が特に好きです。
              </p>
            </CardContent>
          </Card>
        </Section>
        <section>
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
        </section>
      </Box>
    </Layout>
  );
}
