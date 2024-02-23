"use client";

import {
  Box,
  Button,
  Grid,
  Input,
  OutlinedInput,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@emotion/react";
import Link from "next/link";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
          <a href={process.env.PUBLIC_URL + '/SchedulerTemplate.xlsx'} download={"SchedulerTemplate.xlsx"}>Test</a>
          <Typography variant="h5">Upload schedule data</Typography>
          <Typography variant="body1">
            Upload a filled-out template of schedule data for generating a
            schedule.
          </Typography>
        </Stack>
        <OutlinedInput
          type="file"
          startAdornment={<CloudUploadIcon sx={{ marginRight: "10px" }} />}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            paddingLeft: "15px",
          }}
        >
          Download template
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>
    </Box>
  );
}
