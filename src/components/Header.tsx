"use client";
import NewspaperIcon from "@mui/icons-material/Newspaper";
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
import { Box, Flex } from "@kuma-ui/core";

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
    <Box
      as="header"
      bgColor="white"
      color="black"
      cursor="default"
      height="50px"
      position="absolute"
      top="0px"
      width="100%"
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
                src={"/logos/logo_mini.png"}
                width={25}
              />
              <span>PAM</span>
            </Box>
          </Link>
        </div>
        <div>
          <Flex alignItems="center" justify="center">
            <div className="mr-3">
              <Link href="/news">
                <NewspaperIcon className="text-gray-500" fontSize="large" />
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
          </Flex>
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
        <Link href="/" onClick={handleClose}>
          <MenuItem>
            <HomeIcon />
            ホーム
          </MenuItem>
        </Link>
        <Link href="/dashboard" onClick={handleClose}>
          <MenuItem>
            <AccountCircleIcon />
            ダッシュボード
          </MenuItem>
        </Link>
        <Link href="/chat" onClick={handleClose}>
          <MenuItem>
            <ForumIcon />
            チャット
          </MenuItem>
        </Link>
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
    </Box>
  );
};

export default Header;
