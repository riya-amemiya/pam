import Layout from "@/components/Layout";
import { NextPage } from "next/types";
import { Session } from "next-auth";
import Typography from "@mui/material/Typography";
interface Props {
  session: Session | null;
}
const Home: NextPage<Props> = () => {
  const useTech = {
    Framework: "Next.js",
    Language: "TypeScript",
    UI: "Material-UI",
    StateManagement: "Recoil",
    CSS: "Tailwind CSS",
    Animation: "Animate.css",
    Hosting: "Vercel",
    Auth: "NextAuth.js",
    Database: "Vercel DB",
    ORM: "Prisma",
  };
  return (
    <>
      <Layout title="Home">
        <div className="text-center">
          <h1 className="text-4xl">Amemiya Riyaの実験室</h1>
          <div className="flex justify-center">
            <ul className="text-left">
              {Object.entries(useTech).map(([key, value]) => {
                return (
                  <li key={key}>
                    <Typography className="text-2xl inline-block">
                      {key}: {value}
                    </Typography>
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
