import SEO from "./SEO";
import Header from "./Header";
const Layout = ({
	children,
	className,
	title,
	description,
	images,
	site_name,
	twitter,
	header = true,
}: {
	children: React.ReactNode;
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
			{header && <Header />}

			<main className={className}>{children}</main>
		</div>
	);
};

export default Layout;
