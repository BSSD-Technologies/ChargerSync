"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CourseInput from "./input-sections/course-input";
import RoomInput from "./input-sections/room-input";
import PeriodInput from "./input-sections/period-input";
import InstructorInput from "./input-sections/instructor-input";
import UploadInput from "./input-sections/upload-input";
import SubmitInput from "./input-sections/submit-input";
import { useEffect, useState } from "react";
import PreferenceInput from "./input-sections/preference-input";
import { useGlobalCourseListStore } from "../_stores/store";

export default function InputData() {
  /** Stepper state */
  const [activeStep, setActiveStep] = useState(0);

  const [hasCourseErrors, setHasCourseErrors] = useState(true);

  const courseErrors = (value: boolean) => {
    setHasCourseErrors(value);
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
      <UploadInput />
      <Divider />
      <br />
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={0}>
            <StepLabel>List of Courses</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <CourseInput handleErrors={courseErrors} />
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
                </div>
              </Box>
            </StepContent>
          </Step>
          <Step key={1}>
            <StepLabel>List of Rooms</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <RoomInput />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
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
          <Step key={2}>
            <StepLabel>List of Periods</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <PeriodInput />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
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
          <Step key={3}>
            <StepLabel>List of Instructors</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <InstructorInput />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveStep(activeStep + 1);
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
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
          <Step key={4}>
            <StepLabel>Instructor Preferences</StepLabel>
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
            <Typography>All steps completed - you&apos;re finished</Typography>
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
                setActiveStep(0);
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
