"use client";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import { ReactNode, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@kuma-ui/core";
import { Button } from "@/components/ui/button";

export const UseTechComponent = ({
  title,
  description,
  src,
  link,
}: {
  title: string;
  description?: ReactNode;
  src: string;
  link: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card
        className="h-60 flex justify-center items-center flex-col m-2 md:m-5"
        onClick={handleOpen}
        sx={{
          maxHeight: 300,
        }}
      >
        <CardMedia className="flex justify-center">
          <Image
            alt={`${title}のロゴ`}
            height={120}
            loading="eager"
            src={src}
            width={120}
          />
        </CardMedia>
        <CardContent>
          <h2>
            <Link
              className="text-2xl inline-block"
              href={link}
              style={{
                cursor: "pointer",
              }}
              underline="hover"
            >
              {title}
            </Link>
          </h2>
        </CardContent>
      </Card>
      <Modal onClose={handleClose} open={open}>
        <Box
          className="bg-white w-full md:w-3/4 h-1/2 xl:w-1/2"
          display="flex"
          justify="center"
          left="50%"
          position="absolute"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Box
            alignItems="center"
            display="flex"
            flexDir="column"
            justify="center"
          >
            <Image alt={`${title}のロゴ`} height={120} src={src} width={120} />
            <Typography className="text-2xl m-5">
              {description ? description : ""}
            </Typography>
            <Button
              className="bg-blue-500 hover:bg-blue-700"
              onClick={handleClose}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
