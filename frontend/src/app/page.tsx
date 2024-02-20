"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import BlueLogo from "@/app/_assets/BlueLogo.svg";

export default function Home() {
  return (
    <Container
      
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Image src={BlueLogo} alt={"Charger Sync"} />
        <Typography variant="h5">
          Insert some basic description about the site here.
        </Typography>
        <Button variant="contained" sx={{width: "50vw"}}>Generate a Schedule</Button>
        <Button variant="contained" sx={{width: "50vw"}}>Help Manual</Button>
      </Stack>
    </Container>
  );
}
