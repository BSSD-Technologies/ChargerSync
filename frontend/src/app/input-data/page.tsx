import { Container, Divider } from "@mui/material";
import CourseInput from "./input-sections/course-input";
import RoomInput from "./input-sections/room-input";
import TimeInput from "./input-sections/time-input";
import InstructorInput from "./input-sections/instructor-input";

export default function InputData() {
  return (
    <Container sx={{
      marginTop: "2%",
      paddingBottom: "10%",
    }}>
      <CourseInput />
      <Divider />
      <RoomInput />
      <Divider />
      <TimeInput />
      <Divider />
      <InstructorInput />
      <Divider />
    </Container>
  );
}
