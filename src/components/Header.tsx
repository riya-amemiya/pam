import Link from "next/link";

const Header = () => {
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
		</header>
	);
};

export default Header;
