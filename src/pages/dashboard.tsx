import Layout from "@/components/Layout";
import { NewPostReq } from "types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Button from "@mui/material/Button";
import { fetcherPost } from "@/lib/fetcherPost";
import { fetcherGet } from "@/lib/fetcherGet";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/userState";
const Dashboard: NextPage = () => {
	const { data: session, status } = useSession();
	const { trigger: newPost } = useSWRMutation(
		"/api/prisma/newPost",
		fetcherPost<NewPostReq>,
	);
	const { trigger: getPost, data: postData } = useSWRMutation(
		"/api/prisma/getPost",
		fetcherGet,
	);
	const [count, setCount] = useState(0);
	const user = useRecoilValue(userState);
	return (
		<Layout looding={!user} title="ダッシュボード">
			<h1 className="animate__animated animate__backInLeft">Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : "loading.."}</p>
			<Button
				onClick={() => {
					setCount(count + 1);
					newPost({ title: "Test", content: "Test" });
				}}
			>
				newPost
			</Button>
			<Button
				color="secondary"
				onClick={() => {
					getPost();
					console.log("====================================");
					console.log(postData);
					console.log("====================================");
				}}
			>
				getPost
			</Button>
			<p>カウント: {count}</p>
			<p>ロール: {user?.role || "loading..."}</p>
			<p>ステータス: {status}</p>
			<p>ユーザー: {user?.name || "loading..."}</p>
		</Layout>
	);
};

export default Dashboard;
