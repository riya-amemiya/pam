import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Image from "next/image";

export const UseTechComponent = ({
  title,
  src,
  link,
}: {
  title: string;
  src: string;
  link: string;
}) => {
  return (
    <>
      <Link
        className="text-2xl"
        href={link}
        rel="noopener noreferrer"
        style={{
          cursor: "pointer",
        }}
        target="_blank"
        underline="none"
      >
        <Card
          className="h-60 flex justify-center items-center flex-col m-2 md:m-5"
          sx={{
            maxHeight: 300,
          }}
        >
          <CardMedia className="flex justify-center">
            <Image
              alt={`${title}のロゴ`}
              height={120}
              loading="eager"
              src={src}
              width={120}
            />
          </CardMedia>
          <CardContent>
            <h2>{title}</h2>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
