"use client";

import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

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
        <Stack direction={"column"}>
          <Typography variant="h5">Upload schedule data</Typography>
          <Typography variant="body1">
            Upload a filled-out template of schedule data for generating a
            schedule.
          </Typography>
        </Stack>
        <Link
          passHref
          href="/CourseListTemplate.csv"
          download={"CourseListTemplate.csv"}
        >
          <Button variant="outlined" startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}>Download Template</Button>
        </Link>
      </Grid>
    </Box>
  );
}
