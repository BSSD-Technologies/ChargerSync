"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CourseInput from "./input-sections/course-input";
import RoomInput from "./input-sections/room-input";
import PeriodInput from "./input-sections/period-input";
import InstructorInput from "./input-sections/instructor-input";
import DownloadTemplates from "./input-sections/download-templates";
import SubmitInput from "./input-sections/submit-input";
import { useState } from "react";
import PreferenceInput from "./input-sections/preference-input";
import {
  useGlobalCourseListStore,
  useGlobalInstructorListStore,
  useGlobalPeriodListStore,
  useGlobalRoomListStore,
} from "../_stores/store";
import { downloadInputCsv } from "../_hooks/utilHooks";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export default function InputData() {
  /** Stepper state */
  const [activeStep, setActiveStep] = useState(0);

  /** Error states */
  const [hasCourseErrors, setHasCourseErrors] = useState(true);
  const [hasRoomErrors, setHasRoomErrors] = useState(true);
  const [hasPeriodErrors, setHasPeriodErrors] = useState(true);
  const [hasInstructorErrors, setHasInstructorErrors] = useState(true);

  /** States for all section data, raw for export */
  const [getRawCourses, getRawRooms, getRawPeriods, getRawInstructors] = [
    useGlobalCourseListStore((state) => state.getRawCourses),
    useGlobalRoomListStore((state) => state.getRawRooms),
    useGlobalPeriodListStore((state) => state.getRawPeriods),
    useGlobalInstructorListStore((state) => state.getRawInstructors),
  ];

  /** Handle nonlinear navigation */
  const handleJumpStep = (step: number) => {
    // If navigating to preferences
    if (
      step == 4 &&
      !hasCourseErrors &&
      !hasRoomErrors &&
      !hasPeriodErrors &&
      !hasInstructorErrors
    )
      setActiveStep(step);
    // If navigating to instructors
    else if (
      step == 3 &&
      !hasCourseErrors &&
      !hasRoomErrors &&
      !hasPeriodErrors
    )
      setActiveStep(step);
    // If navigating to periods
    else if (step == 2 && !hasCourseErrors && !hasRoomErrors)
      setActiveStep(step);
    // If navigating to rooms
    else if (step == 1 && !hasCourseErrors) {
      console.log(hasCourseErrors);
      setActiveStep(step);
    }
    // If navigating to courses
    else if (step == 0) setActiveStep(step);
  };

  /** Course error handling */
  const courseErrors = (value: boolean) => {
    setHasCourseErrors(value);
  };

  /** Room error handling */
  const roomErrors = (value: boolean) => {
    setHasRoomErrors(value);
  };

  /** Period error handling */
  const periodErrors = (value: boolean) => {
    setHasPeriodErrors(value);
  };

  /** Instructor error handling */
  const instructorErrors = (value: boolean) => {
    setHasInstructorErrors(value);
  };

  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Typography variant="h3">Schedule Inputs</Typography>
      <Typography variant="body1">
        Insert a description of the input process. Let people know that they can
        upload data or they can manually input it.
      </Typography>
      <br />
      <Divider />
      <DownloadTemplates />
      <Divider />
      <br />
      <Box>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          <Step key={0} id="course-top">
            <StepButton onClick={() => handleJumpStep(0)}>
              <StepLabel>List of Courses</StepLabel>
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <CourseInput handleErrors={courseErrors} />
              {hasCourseErrors ? (
                <Typography variant="body1">
                  <i>Please fix all errors before continuing.</i>
                </Typography>
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    disabled={hasCourseErrors}
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={hasCourseErrors}
                    onClick={() => {
                      downloadInputCsv(getRawCourses(), "CourseInput.csv");
                    }}
                    sx={{ mt: 1, mr: 1 }}
                    startIcon={
                      <DownloadRoundedIcon sx={{ marginLeft: "5px" }} />
                    }
                  >
                    Download Inputs
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step key={1} id="room-top">
            <StepButton onClick={() => handleJumpStep(1)}>
              <StepLabel>List of Rooms</StepLabel>
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RoomInput handleErrors={roomErrors} />
              {hasRoomErrors ? (
                <Typography variant="body1">
                  <i>Please fix all errors before continuing.</i>
                </Typography>
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    disabled={hasRoomErrors}
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={hasRoomErrors}
                    onClick={() => {
                      downloadInputCsv(getRawRooms(), "RoomInput.csv");
                    }}
                    sx={{ mt: 1, mr: 1 }}
                    startIcon={
                      <DownloadRoundedIcon sx={{ marginLeft: "5px" }} />
                    }
                  >
                    Download Inputs
                  </Button>
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step key={2} id="period-top">
            <StepButton onClick={() => handleJumpStep(2)}>
              <StepLabel>List of Periods</StepLabel>
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <PeriodInput handleErrors={periodErrors} />
              {hasPeriodErrors ? (
                <Typography variant="body1">
                  <i>Please fix all errors before continuing.</i>
                </Typography>
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    disabled={hasPeriodErrors}
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={hasPeriodErrors}
                    onClick={() => {
                      downloadInputCsv(getRawPeriods(), "PeriodInput.csv");
                    }}
                    sx={{ mt: 1, mr: 1 }}
                    startIcon={
                      <DownloadRoundedIcon sx={{ marginLeft: "5px" }} />
                    }
                  >
                    Download Inputs
                  </Button>
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step key={3} id="instructor-top">
            <StepButton onClick={() => handleJumpStep(3)}>
              <StepLabel>List of Instructors</StepLabel>
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <InstructorInput handleErrors={instructorErrors} />
              {hasInstructorErrors ? (
                <Typography variant="body1">
                  <i>Please fix all errors before continuing.</i>
                </Typography>
              ) : (
                <></>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    disabled={hasInstructorErrors}
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={hasInstructorErrors}
                    onClick={() => {
                      downloadInputCsv(
                        getRawInstructors(),
                        "InstructorInput.csv"
                      );
                    }}
                    sx={{ mt: 1, mr: 1 }}
                    startIcon={
                      <DownloadRoundedIcon sx={{ marginLeft: "5px" }} />
                    }
                  >
                    Download Inputs
                  </Button>
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step key={4} id="preference-top">
            <StepButton onClick={() => handleJumpStep(4)}>
              <StepLabel>List of Instructor Preferences</StepLabel>
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <PreferenceInput />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Finish
                  </Button>
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === 5 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished!</Typography>
            <Button
              onClick={() => {
                setActiveStep(0);
              }}
              sx={{ mt: 1, mr: 1 }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setActiveStep(activeStep - 1);
              }}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
            <SubmitInput />
          </Paper>
        )}
      </Box>
    </Container>
  );
}
