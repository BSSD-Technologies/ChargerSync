"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export default function UploadInput() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item xs={8}>
          <Stack direction={"column"}>
            <Typography variant="h5">
              Download course schedule input templates
            </Typography>
            <Typography variant="body1">
              Download these CSV templates, fill out the course schedule
              information for the respective input file, and upload to the
              respective sections below to bulk upload your scheduling
              information.
            </Typography>
          </Stack>
        </Grid>
        <Grid item justifyContent={"right"}>
          <Link passHref href="/templates.zip" download={"templates.zip"}>
            <Button
              variant="outlined"
              startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
            >
              Download Templates
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
