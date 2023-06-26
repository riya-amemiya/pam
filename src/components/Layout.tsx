import SEO from "./SEO";
import { Looding } from "../stories/Looding/Looding";
import { ReactNode, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { useRouter } from "next/router";

const Layout = ({
  children,
  loading,
  className,
  title,
  description,
  images,
  site_name,
  twitter,
  header = true,
}: {
  children: ReactNode;
  loading?: boolean;
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
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <div className="h-full w-full">
      <SEO
        description={description}
        images={images}
        site_name={site_name}
        title={title}
        twitter={twitter}
      />
      <div
        className={`${loading || pageLoading ? "hidden" : ""} h-full w-full`}
      >
        {header && <Header />}

        <main
          className={`${className} h-full w-full`}
          style={{
            marginTop: "60px",
          }}
        >
          {children}
        </main>
      </div>
      <div
        className={`${loading || pageLoading ? "" : "hidden"} h-full w-full`}
      >
        <Looding />
      </div>
    </div>
  );
};

export default Layout;
