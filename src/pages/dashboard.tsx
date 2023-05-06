import Layout from "@/components/Layout";
import { NewPostReq } from "types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import { fetcherGet } from "@/lib/fetcherGet";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/userState";
import { DateWrapper } from "umt/module/Date/DateWrapper";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
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
	const now = new DateWrapper().getDateObj();
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
				color="primary"
				onClick={() => {
					getPost();
					console.log("====================================");
					console.log(postData);
					console.log("====================================");
				}}
				variant="outlined"
			>
				getPost
			</Button>
			<p>カウント: {count}</p>
			<p>ロール: {user?.role || "loading..."}</p>
			<p>ステータス: {status}</p>
			<p>ユーザー: {user?.name || "loading..."}</p>
			<p>
				{now.year}年{now.month}月{now.day}日 {now.hour}:{now.minute}
			</p>
			<form
				onSubmit={(e) => {
					const target = e.target as typeof e.target & {
						GitHub?: { value: string };
					};
					alert(target.GitHub?.value);
				}}
			>
				<TextField
					className="text-blue-500"
					name="GitHub"
					placeholder="GitHub Account Name"
					type="text"
				/>
				<Button size="large" type="submit">
					Submit
				</Button>
			</form>
		</Layout>
	);
};

export default Dashboard;
