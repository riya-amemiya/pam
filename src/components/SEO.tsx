import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
const SEO = ({
	title,
	description,
	images,
	site_name,
	twitter,
}: {
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
}) => {
	const router = useRouter();
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
	return (
		<NextSeo
			canonical={url}
			description={
				description
					? description
					: "A simple project starter to work with TypeScript, React, Next.js, GraphQL, Apollo Client, and Material-UI."
			}
			openGraph={{
				url,
				title,
				description,
				images,
				site_name,
			}}
			title={title}
			twitter={twitter}
		/>
	);
};
export default SEO;
