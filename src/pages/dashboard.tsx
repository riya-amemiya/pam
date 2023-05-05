import Layout from "@/components/Layout";
import { GetRoleRes, NewPostReq } from "types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import Button from "@mui/material/Button";
import { fetcherPost } from "@/lib/fetcherPost";
import { fetcherGet } from "@/lib/fetcherGet";
const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	const { trigger: newPost } = useSWRMutation(
		"/api/prisma/newPost",
		fetcherPost<NewPostReq>,
	);
	const { trigger: getPost, data: postData } = useSWRMutation(
		"/api/prisma/getPost",
		fetcherGet,
	);
	const { data: data2 }: { data: GetRoleRes } = useSWR(
		"/api/prisma/getRole",
		(url) => fetch(url).then((res) => res.json()),
	);
	const [count, setCount] = useState(0);
	return (
		<Layout title="ダッシュボード">
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
			<Button
				className="text-blue-500"
				onClick={() => {
					setCount(count + 1);
					newPost({ title: "Test", content: "Test" });
				}}
			>
				newPost
			</Button>
			<Button
				className="text-blue-500"
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
			<p>ロール: {data2?.message}</p>
		</Layout>
	);
};

export default Dashboard;
