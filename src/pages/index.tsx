import Layout from "@/components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
	const { data: session } = useSession();
	return (
		<>
			<Layout title="Home">
				<div className="text-center">
					{
						// セッションがある場合、ログアウトを表示
						session && (
							<div>
								<h1 className="text-red-500">
									ようこそ, {session.user?.email}
								</h1>
								<button onClick={() => signOut()} type="button">
									ログアウト
								</button>
							</div>
						)
					}
					{
						// セッションがない場合、ログインを表示
						// ログインボタンを押すと、ログインページに遷移する
						!session && (
							<div>
								<p>ログインしていません</p>
								<button onClick={() => signIn()} type="button">
									ログイン
								</button>
							</div>
						)
					}
				</div>
				<div>
					<Link href="/dashboard">
						<p>ダッシュボード</p>
					</Link>
				</div>
			</Layout>
		</>
	);
};
export default Home;
