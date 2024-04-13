"use client";

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Report from "./reports/report";
import ConflictReport from "./reports/conflict-report";
import IncompleteReport from "./reports/incomplete-report";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useEffect, useState } from "react";
import ExportModal from "./export-modal";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { UseCountConflicts, UseCountIncompletes } from "../_hooks/apiHooks";
import { downloadCsv } from "../_hooks/utilHooks";
import {
  useGlobalConflictStore,
  useGlobalIncompleteStore,
  useGlobalScheduleStore,
} from "../_stores/store";
import { useRouter } from "next/navigation";

export default function ScheduleReport() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [countConflicts, setCountConflicts] = useState(0);
  const [countIncompletes, setCountIncompletes] = useState(0);

  /** Conflict/incomplete list store */
  const [sectionList, rawConflictList, rawIncompleteList] = [
    useGlobalScheduleStore((state) => state.sectionList),
    useGlobalConflictStore((state) => state.rawConflictList),
    useGlobalIncompleteStore((state) => state.rawIncompleteList),
  ];

  /** Export conflicts to CSV and prompt download */
  const handleConflictExport = async () => {
    downloadCsv(rawConflictList, "ConflictSections.csv");
  };

  /** Export incompletes to CSV and prompt download */
  const handleIncompleteExport = async () => {
    downloadCsv(rawIncompleteList, "IncompleteSections.csv");
  };

  useEffect(() => {
    /** API call for /countConflicts */
    const getCountConflicts = async () => {
      const getData = await UseCountConflicts();
      if (getData) {
        setCountConflicts(getData);
      }
    };
    /** API call for /countIncompletes */
    const getCountIncompletes = async () => {
      const getData = await UseCountIncompletes();
      if (getData) {
        setCountIncompletes(getData);
      }
    };

    getCountConflicts();
    getCountIncompletes();
  }, []);

  if (sectionList.length <= 0) {
    router.push("/error");
  } else {
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
        <Accordion key={"conflict-report"} disabled={countConflicts <= 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction={"row"} spacing={2}>
              <Typography variant="h5">Conflict Report</Typography>
              <Chip
                color="error"
                icon={<WarningRoundedIcon />}
                label={`${countConflicts} items`}
              />
            </Stack>
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
              onClick={handleConflictExport}
            >
              <span>Export Conflicts</span>
            </LoadingButton>
          </AccordionActions>
        </Accordion>
        <Accordion key={"incomplete-report"} disabled={countIncompletes <= 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction={"row"} spacing={2}>
              <Typography variant="h5">Incomplete Report</Typography>
              <Chip
                color="warning"
                icon={<InfoRoundedIcon />}
                label={`${countIncompletes} items`}
              />
            </Stack>
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
              onClick={handleIncompleteExport}
            >
              <span>Export Incompletes</span>
            </LoadingButton>
          </AccordionActions>
        </Accordion>
        <ExportModal open={open} onClose={() => setOpen(false)} />
      </Container>
    );
  }
}
