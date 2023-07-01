import { ReactNode } from "react";
import { Loading } from "$/loading";

const Layout = ({
  children,
  looding,
  className,
}: {
  children: ReactNode;
  looding?: boolean;
  className?: string;
}) => {
  return (
    <div className="h-full w-full">
      <div className={`${looding ? "hidden" : ""} h-full w-full`}>
        <main className={`${className || ""} h-full w-full`}>{children}</main>
      </div>
      <div className={`${looding ? "" : "hidden"} h-full w-full`}>
        <Loading />
      </div>
    </div>
  );
};

export default Layout;
