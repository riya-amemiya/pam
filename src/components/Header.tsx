"use client";
import { Box, Flex } from "@kuma-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BuildIcon from "@mui/icons-material/Build";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "react-hooks-use-modal";
import z from "zod";

import { Button } from "@/stories/atoms/Button";
import { Database } from "types/supabase";

import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
const Header = ({ user }: { user: User | null }) => {
  const [Modal, modalOpen] = useModal("__next", {
    preventScroll: true,
  });
  const router = useRouter();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  const supabase = createClientComponentClient<Database>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
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
                {user ? (
                  <Image
                    alt="プロフィール画像"
                    className="rounded-full cursor-pointer"
                    height={50}
                    onClick={handleClick}
                    src={
                      user.user_metadata.avatar_url || "/logos/logo_mini.png"
                    }
                    width={50}
                  />
                ) : (
                  <Button
                    className="mr-2"
                    onClick={() => {
                      setAnchorElement(null);
                      modalOpen();
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
          anchorEl={anchorElement}
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
          <Link href="/tools" onClick={handleClose}>
            <MenuItem>
              <BuildIcon />
              ツール
            </MenuItem>
          </Link>
          <MenuItem
            onClick={async () => {
              setAnchorElement(null);
              await supabase.auth.signOut();
              router.refresh();
            }}
          >
            <LogoutIcon />
            ログアウト
          </MenuItem>
        </Menu>
      </Box>
      <Modal>
        <div className="flex justify-center items-center h-screen">
          <div className="w-96 h-96 bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center">
            <div>
              <AutoForm
                action="/api/auth/sign-in"
                fieldConfig={{
                  password: {
                    description: "最低8文字以上のパスワードを入力してください",
                    inputProps: {
                      type: "password",
                    },
                  },
                  email: {
                    inputProps: {
                      type: "email",
                    },
                  },
                }}
                formSchema={z.object({
                  email: z.string().email(),
                  password: z
                    .string()
                    .min(8)
                    .regex(
                      /(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)|(?=.*\W)(?=.*[A-Za-z])/,
                      "パスワードは半角英小文字、半角英大文字、半角数字の2種類以上を含む必要があります",
                    ),
                })}
                method="post"
                onSubmit={async ({ email, password }) => {
                  await supabase.auth.signInWithPassword({
                    email,
                    password,
                  });
                  router.refresh();
                }}
              >
                <Flex justify="center">
                  <AutoFormSubmit type="submit">Sign in</AutoFormSubmit>
                  <AutoFormSubmit type="submit">Sign up</AutoFormSubmit>
                </Flex>
              </AutoForm>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
