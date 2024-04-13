"use client";

import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import WhiteSmiley from "@/app/_assets/error-img-white.svg";
import BlackSmiley from "@/app/_assets/error-img-black.svg";
import Link from "next/link";

export default function Error() {
  // Get system preference for dark/light mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <Container
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={{ sm: "column", md: "row" }} spacing={5} alignItems={"center"}>
        <Image
          src={prefersDarkMode ? WhiteSmiley : BlackSmiley}
          alt={"Error Smiley Face"}
          style={{ width: "60%", height: "100%", objectFit: "cover" }}
        />
        <Stack spacing={2} alignItems={{sm: "center", md: "start"}}>
          <Typography variant="h1">Oops!</Typography>
          <Typography variant="h6">
            Looks like you haven&apos;t generated a schedule yet, there&apos;s
            nothing to display right now.
          </Typography>
          <Stack direction={"row"} spacing={3} alignItems={"center"}>
            <Link passHref href="/input-data">
              <Button variant="contained" color="info">
                <Typography variant="h6" noWrap>Generate a Schedule</Typography>
              </Button>
            </Link>
            <Typography variant="h6">or</Typography>
            <Link passHref href="/help">
              <Typography variant="h6" sx={{textDecoration: "underline"}}>Read the Manual</Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
