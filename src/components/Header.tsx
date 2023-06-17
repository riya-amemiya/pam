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
      className="absolute top-0"
      style={{
        backgroundColor: "white",
        height: "50px",
        width: "100%",
        color: "black",
        cursor: "default",
      }}
    >
      <div className="h-full w-full flex justify-between items-center">
        <div>
          <Link href="/">
            <div className="flex items-center">
              <Image
                alt="ロゴ"
                className="rounded-full cursor-pointer"
                height={25}
                onClick={handleClick}
                src={"/logo.png"}
                width={25}
              />
              <span>PAM</span>
            </div>
          </Link>
        </div>
        <div>
          {session?.user?.image && (
            <Image
              alt="プロフィール画像"
              className="rounded-full cursor-pointer"
              height={50}
              onClick={handleClick}
              src={session?.user?.image}
              width={50}
            />
          )}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        aria-labelledby="demo-positioned-button"
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <Link href="/">
            <p>ホーム</p>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/dashboard">
            <p>ダッシュボード</p>
          </Link>
        </MenuItem>
        {reducer(session)}
      </Menu>
    </header>
  );
};

export default Header;
