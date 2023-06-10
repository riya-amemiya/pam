import Layout from "@/components/Layout";
import Link from "next/link";
import { NextPage } from "next/types";
import { Session } from "next-auth";
interface Props {
  session: Session | null;
}
const Home: NextPage<Props> = () => {
  return (
    <>
      <Layout title="Home">
        <div className="text-center">
          <Link href="/dashboard">
            <p>ダッシュボード</p>
          </Link>
        </div>
      </Layout>
    </>
  );
};
export default Home;
