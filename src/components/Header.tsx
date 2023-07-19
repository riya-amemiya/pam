"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@/stories/Button";
import { Box } from "@kuma-ui/core";
const Header = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <Box
        alignItems="center"
        display="flex"
        height="100%"
        justify="space-between"
        width="100%"
      >
        <div>
          <Link href="/">
            <Box alignItems="center" display="flex">
              <Image
                alt="ロゴ"
                className="rounded-full cursor-pointer"
                height={25}
                src={"/logos/logo.png"}
                width={25}
              />
              <span>PAM</span>
            </Box>
          </Link>
        </div>
        <div>
          {status === "loading" ? (
            <RefreshIcon className="animate-spin" />
          ) : session?.user?.image ? (
            <Image
              alt="プロフィール画像"
              className="rounded-full cursor-pointer"
              height={50}
              onClick={handleClick}
              src={session?.user?.image}
              width={50}
            />
          ) : (
            <Button
              className="mr-2"
              onClick={() => {
                setAnchorEl(null);
                signIn();
              }}
            >
              ログイン
            </Button>
          )}
        </div>
      </Box>
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
          <Link href="/" onClick={handleClose}>
            <HomeIcon />
            ホーム
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/dashboard" onClick={handleClose}>
            <AccountCircleIcon />
            ダッシュボード
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/chat" onClick={handleClose}>
            <ForumIcon />
            チャット
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
          }}
        >
          <LogoutIcon />
          ログアウト
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
