"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Report from "./reports/report";
import ConflictReport from "./reports/conflict-report";
import NonConflictReport from "./reports/nonconflict-report";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useState } from "react";
import ExportModal from "./export-modal";

export default function ScheduleReport() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Typography variant="h3">Schedule Report</Typography>
      <Typography variant="body1">
        Insert a description about the report generated, with the necessary
        details.
      </Typography>
      <br />
      <Report />
      <br />
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid item>
          <ConflictReport />
        </Grid>
        <Grid item>
          <NonConflictReport />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">Export Schedule</Typography>
          <Typography variant="body1">
            Export the generated schedule, with the option of filtering by
            different categories.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
          onClick={handleClickOpen}
        >
          Download Schedule
        </Button>
      </Grid>
      <ExportModal open={open} onClose={handleClose} />
    </Container>
  );
}
