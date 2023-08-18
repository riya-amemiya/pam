"use client";
import NewspaperIcon from "@mui/icons-material/Newspaper";

import Image from "next/image";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ForumIcon from "@mui/icons-material/Forum";
import { Button } from "@/stories/atoms/Button";
import { Box, Flex } from "@kuma-ui/core";
import { User } from "@supabase/supabase-js";
import { useModal } from "react-hooks-use-modal";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import * as z from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";
import BuildIcon from "@mui/icons-material/Build";
import { useRouter } from "next/navigation";
const Header = ({ user }: { user: User | null }) => {
  const [Modal, modalOpen] = useModal("__next", {
    preventScroll: true,
  });
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient<Database>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                      setAnchorEl(null);
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
          <Link href="/tools" onClick={handleClose}>
            <MenuItem>
              <BuildIcon />
              ツール
            </MenuItem>
          </Link>
          <MenuItem
            onClick={async () => {
              setAnchorEl(null);
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
                      value: password,
                      onChange: (e) => {
                        setPassword(e.target.value);
                      },
                    },
                  },
                  email: {
                    inputProps: {
                      type: "email",
                      value: email,
                      onChange: (e) => {
                        setEmail(e.target.value);
                      },
                    },
                  },
                }}
                formSchema={z.object({
                  email: z.string().email(),
                  password: z
                    .string()
                    .min(8)
                    .regex(
                      /(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)|(?=.*\W)(?=.*[a-zA-Z])/,
                      "パスワードは半角英小文字、半角英大文字、半角数字の2種類以上を含む必要があります",
                    ),
                })}
                method="post"
              >
                <Flex justify="center">
                  <AutoFormSubmit
                    onClick={async () => {
                      await supabase.auth.signInWithPassword({
                        email,
                        password,
                      });
                      router.refresh();
                    }}
                    type="button"
                  >
                    Sign in
                  </AutoFormSubmit>
                  <AutoFormSubmit
                    onClick={async () => {
                      await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
                        },
                      });
                      router.refresh();
                    }}
                    type="button"
                  >
                    Sign up
                  </AutoFormSubmit>
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
