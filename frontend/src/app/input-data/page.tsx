import { Container, Divider } from "@mui/material";
import CourseInput from "./input-sections/course-input";

export default function InputData() {
  return (
    <Container sx={{
      marginTop: "2%",
    }}>
      <CourseInput />
      <Divider />
    </Container>
  );
}
