import { Box } from "@kuma-ui/core";
import Image from "next/image";

import { getMicrocms } from "%/actions/getMicrocms";
import { Section } from "@/components/Section";
import { SwiperClient } from "@/components/SwiperClient";
import { getMetadata } from "@/utils/getMetadata";
import { microcmsCardsType } from "types/microcmsCardsType";

import { UseTechComponent } from "./index/useTechComponent";

export const metadata = getMetadata({
  title: "Home",
});

export default async function Home() {
  const data = await getMicrocms<microcmsCardsType>("cards");
  return (
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
              alignItems="center"
              display="flex"
              height="100%"
              justify="center"
              width="100%"
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
                  <UseTechComponent link={link} src={logo.url} title={title} />
                </Box>
              );
            })}
          </SwiperClient>
        </div>
      </Section>
    </Box>
  );
}
