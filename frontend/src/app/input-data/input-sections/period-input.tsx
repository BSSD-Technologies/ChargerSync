"use client";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Period, defaultPeriod } from "@/app/_types/Period";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFirstRender, useValidateTime } from "@/app/_hooks/utilHooks";
import { useGlobalPeriodListStore } from "@/app/_stores/store";
import { UseUploadPeriods } from "@/app/_hooks/apiHooks";

function PeriodTableRow(props: { row: Period; rowNum: number }) {
  /** States for course row inputs */
  const uuid = props?.row.uuid;
  const day = props?.row.day;
  const [startTime, setStartTime] = useState(
    props?.row.start_time ? props?.row.start_time : ""
  );
  const [endTime, setEndTime] = useState(
    props?.row.end_time ? props?.row.end_time : ""
  );
  const [endTimeDisabled, setEndTimeDisabled] = useState<boolean>(true); // Disabled state for end time input
  const isFirstRender = useFirstRender(); // Used for first render functions

  /** States for updating period list for current row, or deleting from list */
  const [periodList, updatePeriodList, deletePeriodList, hasErrors] = [
    useGlobalPeriodListStore((state) => state.periodList),
    useGlobalPeriodListStore((state) => state.updatePeriodList),
    useGlobalPeriodListStore((state) => state.deletePeriodList),
    useGlobalPeriodListStore((state) => state.hasErrors),
  ];

  /** Handle start & end time dependency validation */
  const handleStartTime = (value: string) => {
    validateStartTime(value, uuid, periodList);
    setStartTime(value);
    if (value.length <= 0 && endTime) {
      setEndTimeDisabled(true);
      setEndTime("");
      setEndTimeError(false);
    } else {
      setEndTimeDisabled(false);
      validateEndTime(endTime, uuid, periodList);
    }
  };

  /** Handle row deletion and error handling */
  const handleDelete = () => {
    if (startTimeError) hasErrors.pop();
    if (endTimeError) hasErrors.pop();
    deletePeriodList(uuid);
  };

  /** Validation and error handling for start time */
  const {
    hasError: startTimeError,
    errorText: startTimeErrorText,
    validateTime: validateStartTime,
  } = useValidateTime();

  /** Validation and error handling for end time */
  const {
    hasError: endTimeError,
    errorText: endTimeErrorText,
    validateTime: validateEndTime,
    setError: setEndTimeError,
  } = useValidateTime();

  /** Update periodList on change */
  useEffect(() => {
    updatePeriodList({
      uuid: uuid,
      start_time: startTime,
      end_time: endTime,
      day: day,
    });
  }, [day, endTime, startTime, updatePeriodList, uuid]);

  /** Update endTime based on startTime */
  useEffect(() => {
    if (startTime) setEndTimeDisabled(false);
    else setEndTimeDisabled(true);
  }, [startTime]);

  /** Update hasErrors for start time */
  useEffect(() => {
    if (!isFirstRender) {
      if (startTimeError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [startTimeError, hasErrors, isFirstRender]);

  /** Update hasErrors for end time */
  useEffect(() => {
    if (!isFirstRender) {
      if (endTimeError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [endTimeError, hasErrors, isFirstRender]);

  /** First render validation */
  useEffect(() => {
    if (isFirstRender) {
      validateStartTime(startTime, uuid, periodList);
      validateEndTime(endTime, uuid, periodList);
      if (startTimeError) hasErrors.push();
      if (endTimeError) hasErrors.push();
    }
  }, [
    endTime,
    endTimeError,
    hasErrors,
    isFirstRender,
    periodList,
    startTime,
    startTimeError,
    uuid,
    validateEndTime,
    validateStartTime,
  ]);

  return (
    <TableRow key={uuid}>
      <TableCell>{props.rowNum}</TableCell>
      <TableCell>
        <TextField
          fullWidth
          required
          id="start-time"
          variant="filled"
          type="time"
          value={startTime}
          onChange={(e) => {
            handleStartTime(e.target.value);
          }}
          error={startTimeError}
          helperText={startTimeErrorText}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          disabled={endTimeDisabled}
          required
          id="end-time"
          variant="filled"
          type="time"
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value);
            validateEndTime(e.target.value, uuid, periodList, startTime);
          }}
          error={endTimeError}
          helperText={endTimeErrorText}
        />
      </TableCell>
      <TableCell>
        <Button variant="text" color="info" fullWidth onClick={handleDelete}>
          <ClearRoundedIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function PeriodInput(props: {
  handleErrors: (value: boolean) => void;
}) {
  /** Scroll to top functionality */
  const executeScrollUp = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#period-top");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Scroll to continue functionality */
  const executeScrollDown = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#period-continue");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Period list */
  const [periodList, addPeriodList, getHasErrors, deleteAllPeriodList] = [
    useGlobalPeriodListStore((state) => state.periodList),
    useGlobalPeriodListStore((state) => state.addPeriodList),
    useGlobalPeriodListStore((state) => state.getHasErrors),
    useGlobalPeriodListStore((state) => state.deleteAllPeriodList),
  ];

  /** Check for errors regularly */
  useEffect(() => {
    props.handleErrors(getHasErrors());
  });

  /** On uploaded file, make API request and receive JSON output or error */
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Must be a valid file
    if (!event.target.files || event.target.files.length < 0) return;
    else {
      // Await JSON output data
      const data = await UseUploadPeriods(event.target.files[0]);
      // Add JSON output to period list
      data?.map((period) => addPeriodList(period));
    }
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
        padding: "2%",
        border: "2px solid",
        borderColor:
          getHasErrors() && periodList.length > 0 ? "#d32f2f" : "transparent",
        borderRadius: "15px",
        transition: "all .5s ease",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid item sm={8}>
          <Stack direction={"column"}>
            <Typography variant="h4">List of Periods</Typography>
            <br />
            <Typography variant="body1">
              Enter information about the available time periods that classes
              can be scheduled for. These time periods will be available for
              Monday/Wednesday classes and Tuesday/Thursday classes. Note that
              time periods cannot overlap with one another.
            </Typography>
          </Stack>
        </Grid>
        <Grid item className="input-component" sm={3}>
          <CloudUploadIcon sx={{ marginRight: "10px" }} />
          <input
            type="file"
            onChange={handleUpload}
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
          />
        </Grid>
      </Grid>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Start Time *</TableCell>
              <TableCell>End Time *</TableCell>
              <TableCell title="Clear All">
                <Button
                  fullWidth
                  onClick={deleteAllPeriodList}
                  sx={{
                    display: periodList.length > 0 ? "flex" : "none",
                  }}
                >
                  <HighlightOffRoundedIcon fontSize="medium" />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {periodList.map((row, index) => (
              <PeriodTableRow key={row.uuid} row={row} rowNum={index + 1} />
            ))}
          </TableBody>
        </Table>
        <Box sx={{ paddingTop: "2%" }} id={"period-continue"}>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            startIcon={<AddCircleRoundedIcon />}
            onClick={() => {
              const newPeriod = { ...defaultPeriod, uuid: uuidv4() };
              addPeriodList(newPeriod);
            }}
          >
            Add a time block
          </Button>
        </Box>
      </TableContainer>
      <IconButton
        title={"Scroll to top"}
        className="scroll-up"
        onClick={executeScrollUp}
      >
        <KeyboardArrowUpRoundedIcon color={"info"} />
      </IconButton>
      <IconButton
        title={"Scroll to bottom"}
        className="scroll-down"
        onClick={executeScrollDown}
      >
        <KeyboardArrowDownRoundedIcon color={"info"} />
      </IconButton>
    </Box>
  );
}
