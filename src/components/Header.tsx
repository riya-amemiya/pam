import { userState } from "@/atom/userState";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { match } from "ts-pattern";
const Header = () => {
	const { data: session } = useSession();
	const setUser = useSetRecoilState(userState);
	const reducer = (data: typeof session) => {
		return match(data)
			.with(null, () => {
				return (
					<Button
						onClick={() => {
							signIn();
						}}
					>
						ログイン
					</Button>
				);
			})
			.otherwise(() => {
				return (
					<Button
						onClick={() => {
							signOut().then(() => {
								setUser(null);
							});
						}}
					>
						ログアウト
					</Button>
				);
			});
	};
	return (
		<header
			style={{
				backgroundColor: "white",
				height: "50px",
				color: "black",
			}}
		>
			<Link
				href={"/"}
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					textDecoration: "none",
					color: "black",
				}}
			>
				Home
			</Link>
			{reducer(session)}
		</header>
	);
};

export default Header;
