import SEO from "./SEO";
import Header from "./Header";
import { Looding } from "./Looding";
const Layout = ({
	children,
	looding,
	className,
	title,
	description,
	images,
	site_name,
	twitter,
	header = true,
}: {
	children: React.ReactNode;
	looding?: boolean;
	className?: string;
	title: string;
	description?: string;
	images?: {
		url: string;
		alt: string;
		type: string;
	}[];
	site_name?: string;
	twitter?: {
		handle: string;
		site: string;
		cardType: string;
	};
	header?: boolean;
}) => {
	return (
		<div>
			<SEO
				description={description}
				images={images}
				site_name={site_name}
				title={title}
				twitter={twitter}
			/>
			<div className={looding ? "hidden" : ""}>
				{header && <Header />}

				<main className={className}>{children}</main>
			</div>
			<div className={looding ? "" : "hidden"}>
				<Looding />
			</div>
		</div>
	);
};

export default Layout;
