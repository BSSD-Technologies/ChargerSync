"use client";

import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>
    </Box>
  );
}
