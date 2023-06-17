import { signIn, signOut, useSession } from "next-auth/react";
import { match } from "ts-pattern";
import Image from "next/image";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
const Header = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const reducer = (data: typeof session) => {
    return match(data)
      .with(null, () => {
        return (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              signIn();
            }}
          >
            ログイン
          </MenuItem>
        );
      })
      .otherwise(() => {
        return (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              signOut();
            }}
          >
            ログアウト
          </MenuItem>
        );
      });
  };
  return (
    <header
      style={{
        backgroundColor: "white",
        height: "50px",
        width: "100%",
        color: "black",
        cursor: "default",
      }}
      className="absolute top-0"
    >
      <div className="h-full w-full flex justify-between items-center">
        <div>
          <Link href="/">
            <div className="flex items-center">
              <Image
                className="rounded-full cursor-pointer"
                alt="ロゴ"
                src={"/logo.png"}
                width={25}
                height={25}
                onClick={handleClick}
              />
              <span>PAM</span>
            </div>
          </Link>
        </div>
        <div>
          {session?.user?.image && (
            <Image
              className="rounded-full cursor-pointer"
              alt="プロフィール画像"
              src={session?.user?.image}
              width={50}
              height={50}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {reducer(session)}
      </Menu>
    </header>
  );
};

export default Header;
