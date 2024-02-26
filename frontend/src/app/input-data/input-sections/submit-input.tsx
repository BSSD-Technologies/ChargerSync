"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";

export default function SubmitInput() {
  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">Generate Schedule</Typography>
          <Typography variant="body1">
            Click here to generate a schedule based on the data you provided.
          </Typography>
        </Stack>
        <Link passHref href="/schedule-report">
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            startIcon={<SendRoundedIcon />}
            sx={{
              paddingLeft: "15px",
            }}
          >
            <span>Generate</span>
          </LoadingButton>
        </Link>
      </Grid>
    </Box>
  );
}
