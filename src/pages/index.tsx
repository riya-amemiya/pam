import Layout from "@/components/Layout";
import { NextPage } from "next/types";
import { Session } from "next-auth";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface Props {
  session: Session | null;
}

const UseTechComponent = ({
  name,
  description,
  fileName,
  link,
}: {
  name: string;
  description?: ReactNode;
  fileName: string;
  link: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <li>
      <Card
        className="h-60 flex justify-center items-center flex-col m-5"
        onClick={handleOpen}
        sx={{
          maxHeight: 300,
        }}
      >
        <CardMedia className="flex justify-center">
          <Image
            alt={`${name}のロゴ`}
            height={120}
            src={`/logos/${fileName}`}
            width={120}
          />
        </CardMedia>
        <CardContent>
          <Link
            className="text-2xl inline-block"
            href={link}
            style={{
              cursor: "pointer",
            }}
            underline="hover"
          >
            {name}
          </Link>
        </CardContent>
      </Card>
      <Modal onClose={handleClose} open={open}>
        <Box className="absolute top-1/2 left-1/2 flex justify-center -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-1/2">
          <div className="flex justify-center items-center flex-col">
            <Image
              alt={`${name}のロゴ`}
              height={120}
              src={`/logos/${fileName}`}
              width={120}
            />
            <Typography className="text-2xl">
              {description ? description : ""}
            </Typography>
          </div>
        </Box>
      </Modal>
    </li>
  );
};
const Home: NextPage<Props> = () => {
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
    <>
      <Layout title="Home">
        <div className="text-center">
          <h1 className="text-4xl">Amemiya Riyaの実験室</h1>
          <div>
            <ul className="flex justify-center flex-wrap">
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
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Home;
