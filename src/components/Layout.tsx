import SEO from "./SEO";
import Header from "./Header";
import { Looding } from "../stories/Looding/Looding";
import { ReactNode } from "react";
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
  children: ReactNode;
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
    <div className="h-full w-full">
      <SEO
        description={description}
        images={images}
        site_name={site_name}
        title={title}
        twitter={twitter}
      />
      <div className={`${looding ? "hidden" : ""} h-full w-full`}>
        {header && <Header />}

        <main className={`${className} h-full w-full`}>{children}</main>
      </div>
      <div className={`${looding ? "" : "hidden"} h-full w-full`}>
        <Looding />
      </div>
    </div>
  );
};

export default Layout;
