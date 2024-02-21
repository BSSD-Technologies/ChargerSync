import { Container, Divider } from "@mui/material";
import CourseInput from "./input-sections/course-input";

export default function InputData() {
  return (
    <Container fullW sx={{
      margin: "2%"
    }}>
      <CourseInput />
      <Divider />
    </Container>
  );
}
