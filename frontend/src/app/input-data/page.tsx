import { Container, Divider, Typography } from "@mui/material";
import CourseInput from "./input-sections/course-input";
import RoomInput from "./input-sections/room-input";
import TimeInput from "./input-sections/time-input";
import InstructorInput from "./input-sections/instructor-input";
import UploadInput from "./input-sections/upload-input";
import SubmitInput from "./input-sections/submit-input";

export default function InputData() {
  return (
    <Container sx={{
      marginTop: "2%",
      paddingBottom: "10%",
    }}>
      <Typography variant="h3">Schedule Inputs</Typography>
      <Typography variant="body1">
        Insert a description of the input process. Let people know that they can upload data 
        or they can manually input it.
      </Typography>
      <br />
      <Divider />
      <UploadInput />
      <Divider />
      <CourseInput />
      <Divider />
      <RoomInput />
      <Divider />
      <TimeInput />
      <Divider />
      <InstructorInput />
      <Divider />
      <SubmitInput />
    </Container>
  );
}
