import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	return (
		<>
			<Layout className={styles.main} header={false} title="Create Next App">
				<div className={styles.description}>
					{
						// セッションがある場合、ログアウトを表示
						session && (
							<div>
								<h1>ようこそ, {session.user?.email}</h1>
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
			</Layout>
		</>
	);
}
