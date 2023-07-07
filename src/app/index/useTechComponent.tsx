"use client";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@/stories/Button";
export const UseTechComponent = ({
  name,
  description,
  fileName,
  link,
}: {
  name: string;
  description?: ReactNode;
  fileName: string;
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
            alt={`${name}のロゴ`}
            height={120}
            src={`/logos/${fileName}`}
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
              {name}
            </Link>
          </h2>
        </CardContent>
      </Card>
      <Modal onClose={handleClose} open={open}>
        <Box className="absolute top-1/2 left-1/2 flex justify-center -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/4 h-1/2 xl:w-1/2">
          <div className="flex justify-center items-center flex-col">
            <Image
              alt={`${name}のロゴ`}
              height={120}
              src={`/logos/${fileName}`}
              width={120}
              loading="eager"
            />
            <Typography className="text-2xl m-5">
              {description ? description : ""}
            </Typography>
            <Button onClick={handleClose} size="large">
              閉じる
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
