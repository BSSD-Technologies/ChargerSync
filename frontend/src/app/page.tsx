"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BlueLogo from "@/app/_assets/BlueLogo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Image
          src={BlueLogo}
          alt={"Charger Sync"}
          style={{ width: "55vw", height: "auto" }}
        />
        <Typography sx={{ wordWrap: "break-word" }} variant="h6">
          Insert some basic description about the site here.
        </Typography>
        <Link passHref href="/input-data">
          <Button variant="contained" sx={{ width: "50vw" }}>
            Generate a Schedule
          </Button>
        </Link>
        <Link passHref href="/help">
          <Button variant="contained" sx={{ width: "50vw" }}>
            Help Manual
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
