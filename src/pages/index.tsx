import Layout from "@/components/Layout";
import { NextPage } from "next/types";
import { Session } from "next-auth";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "@mui/material/Link";
interface Props {
  session: Session | null;
}
const Home: NextPage<Props> = () => {
  const useTech = [
    {
      name: "Next.js",
      fileName: "nextjs.svg",
      link: "https://nextjs.org/",
    },
    {
      name: "TypeScript",
      fileName: "typescript.svg",
      link: "https://www.typescriptlang.org/",
    },
    {
      name: "Material-UI",
      fileName: "material-ui.svg",
      link: "https://material-ui.com/",
    },
    {
      name: "Recoil",
      fileName: "recoil.svg",
      link: "https://recoiljs.org/",
    },
    {
      name: "Tailwind CSS",
      fileName: "tailwindcss.svg",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Prisma",
      fileName: "prisma.svg",
      link: "https://www.prisma.io/",
    },
  ];
  return (
    <>
      <Layout title="Home">
        <div className="text-center">
          <h1 className="text-4xl">Amemiya Riyaの実験室</h1>
          <div>
            <ul className="flex justify-center flex-wrap">
              {useTech.map(({ name, fileName, link }) => {
                return (
                  <li key={name} className="w-1/2 md:w-1/3">
                    <Card
                      className="h-60 flex justify-center items-center flex-col m-5"
                      sx={{
                        maxHeight: 300,
                      }}
                    >
                      <CardMedia className="flex justify-center">
                        <Image
                          width={120}
                          height={120}
                          src={`/logos/${fileName}`}
                          alt={`${name}のロゴ`}
                        />
                      </CardMedia>
                      <CardContent>
                        <Link
                          href={link}
                          className="text-2xl inline-block"
                          underline="hover"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {name}
                        </Link>
                      </CardContent>
                    </Card>
                  </li>
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
