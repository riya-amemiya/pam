import { useSession } from "next-auth/react";

const Dashboard = () => {
	const { data: session } = useSession();
	return (
		<div>
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
		</div>
	);
};

export default Dashboard;
