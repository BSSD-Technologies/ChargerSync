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
import TimeInput from "./input-sections/time-input";
import InstructorInput from "./input-sections/instructor-input";
import UploadInput from "./input-sections/upload-input";
import SubmitInput from "./input-sections/submit-input";
import { useState } from "react";
import PreferenceInput from "./input-sections/preference-input";
import { useGlobalStore } from "../_stores/store";

const steps = [
  {
    label: "List of Courses",
    component: <CourseInput />,
  },
  {
    label: "List of Rooms",
    component: <RoomInput />,
  },
  {
    label: "List of Time Blocks",
    component: <TimeInput />,
  },
  {
    label: "List of Instructors",
    component: <InstructorInput />,
  },
  {
    label: "Instructor Preferences",
    component: <PreferenceInput />,
  },
];

export default function InputData() {
  /** Stepper state */
  const [activeStep, setActiveStep] = useState(0);

  /** Course list error handling */
  const [courseListErrors, setCourseListErrors] = [
    useGlobalStore((state) => state.courseListErrors),
    useGlobalStore((state) => state.setCourseListErrors),
  ];

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
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                {step.component}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                      }}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={!courseListErrors}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={() => {
                        setActiveStep((prevActiveStep) => prevActiveStep - 1);
                      }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
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
