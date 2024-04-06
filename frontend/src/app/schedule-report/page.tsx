"use client";

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
import IncompleteReport from "./reports/incomplete-report";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ExportModal from "./export-modal";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";

export default function ScheduleReport() {
  const [open, setOpen] = useState(false);

  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Link passHref href={"/input-data"}>
        <Button startIcon={<ArrowBackIosNewRoundedIcon />} variant="text">
          Edit schedule data
        </Button>
      </Link>
      <br />
      <Typography variant="h3">Schedule Report</Typography>
      <Typography variant="body1">
        Insert a description about the report generated, with the necessary
        details.
      </Typography>
      <br />
      <Report />
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
          onClick={() => setOpen(true)}
        >
          Download Schedule
        </Button>
      </Grid>
      <br />
      <Accordion key={"conflict-report"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Conflict Report</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConflictReport />
        </AccordionDetails>
        <AccordionActions
          sx={{
            padding: "2%",
          }}
        >
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
            sx={{
              paddingLeft: "15px",
            }}
          >
            <span>Export Conflicts</span>
          </LoadingButton>
        </AccordionActions>
      </Accordion>
      <Accordion key={"incomplete-report"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Incomplete Report</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <IncompleteReport />
        </AccordionDetails>
        <AccordionActions
          sx={{
            padding: "2%",
          }}
        >
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
            sx={{
              paddingLeft: "15px",
            }}
          >
            <span>Export Incompletes</span>
          </LoadingButton>
        </AccordionActions>
      </Accordion>
      <ExportModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
