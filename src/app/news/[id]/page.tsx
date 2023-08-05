import { getMicrocms } from "@/lib/getMicrocms";
import { microcmsNewsType } from "types/microcmsNewsType";
import Image from "next/image";
import { Box, Flex } from "@kuma-ui/core";
import htmr from "htmr";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import UpdateIcon from "@mui/icons-material/Update";
import CreateIcon from "@mui/icons-material/Create";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getMicrocms<microcmsNewsType>("news", {
    ids: params.id,
  });
  const content = data.contents[0];
  return {
    title: content?.title,
  };
}

export default async function NewsId({ params }: { params: { id: string } }) {
  const data = await getMicrocms<microcmsNewsType>("news", {
    ids: params.id,
  });
  if (data.contents.length === 0) {
    notFound();
  }
  const content = data
    .contents[0] as unknown as microcmsNewsType["contents"][0];
  const createdAt = format(new Date(content.createdAt), "yyyy-MM-dd");
  const updatedAt = format(new Date(content.updatedAt), "yyyy-MM-dd");
  return (
    <Box textAlign="center">
      <Image
        alt=""
        className="mx-auto"
        height={"250"}
        src={content.thumbnail.url || ""}
        width={"250"}
      />
      <Flex alignItems="center" justify="center">
        <Flex alignItems="center" justify="center" m="0.5rem">
          <CreateIcon />
          <p>{createdAt}</p>
        </Flex>
        {createdAt !== updatedAt && (
          <Flex alignItems="center" justify="center" m="0.5rem">
            <UpdateIcon />
            <p>{updatedAt}</p>
          </Flex>
        )}
      </Flex>
      <main>
        {htmr(content?.main || "", {
          transform: {
            h1: ({ children }) => {
              return <h1 className="text-4xl">{children}</h1>;
            },
            h2: ({ children }) => {
              return <h2 className="text-2xl">{children}</h2>;
            },
          },
        })}
      </main>
    </Box>
  );
}
