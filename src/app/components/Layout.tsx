import { ReactNode } from "react";
import Looding from "@/stories/Looding/Looding";

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
        <Looding />
      </div>
    </div>
  );
};

export default Layout;
