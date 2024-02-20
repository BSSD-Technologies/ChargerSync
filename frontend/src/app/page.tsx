"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BlueLogo from "@/app/_assets/BlueLogo.svg";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Image src={BlueLogo} alt={"Charger Sync"} style={{width: "55vw", height: "auto"}} />
        <Typography sx={{wordWrap: 'break-word'}} variant="h6">
          Insert some basic description about the site here.
        </Typography>
        <Button variant="contained" href="/input-data" sx={{width: "50vw"}}>Generate a Schedule</Button>
        <Button variant="contained" href="/help" sx={{width: "50vw"}}>Help Manual</Button>
      </Stack>
    </Container>
  );
}
