import { getMicrocms } from "@/lib/getMicrocms";
import { generateMetadata } from "@/utils/generateMetadata";
import { microcmsNewsType } from "types/microcmsNewsType";
import Image from "next/image";
import { Box } from "@kuma-ui/core";
import htmr from "htmr";
import { format } from "date-fns";

export const metadata = generateMetadata({
  title: "News",
});

export default async function NewsId({ params }: { params: { id: string } }) {
  const data = await getMicrocms<microcmsNewsType>("news", {
    ids: params.id,
  });
  const content = data
    .contents[0] as unknown as microcmsNewsType["contents"][0];
  return (
    <Box textAlign="center">
      <Image
        alt=""
        className="mx-auto"
        height={"250"}
        src={content.thumbnail.url || ""}
        width={"250"}
      />
      <p>{format(new Date(content.createdAt), "yyyy-MM-dd")}</p>
      <p>{format(new Date(content.updatedAt), "yyyy-MM-dd")}</p>
      <main>{htmr(content?.main || "")}</main>
    </Box>
  );
}