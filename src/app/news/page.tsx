import { Box } from "@kuma-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { getMicrocms } from "@/actions/getMicrocms";
import { getMetadata } from "@/utils/getMetadata";
import { microcmsNewsType } from "types/microcmsNewsType";

export const metadata = getMetadata({
  title: "News",
});

export default async function News() {
  const data = await getMicrocms<microcmsNewsType>("news");
  return (
    <Box textAlign={"center"}>
      <h1 className="text-3xl md:text-4xl mb-3">News</h1>
      <Box as="section" display="flex">
        {data.contents.map(
          ({ id, title, description, createdAt, thumbnail }) => {
            return (
              <Box as="article" key={title} width="33.33333%">
                <Link href={`/news/${id}`}>
                  <Card>
                    <CardContent>
                      <Box alignItems="center" display="flex" justify="center">
                        <Image
                          alt=""
                          height={"150"}
                          src={thumbnail.url}
                          width={"150"}
                        />
                      </Box>
                      <h2 className="text-2xl">{title}</h2>
                      <p>{description}</p>
                      <p>{format(new Date(createdAt), "yyyy-MM-dd")}</p>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            );
          },
        )}
      </Box>
    </Box>
  );
}
