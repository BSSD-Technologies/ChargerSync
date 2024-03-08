import {
  Box,
  Button,
  FilledInput,
  Grid,
  OutlinedInput,
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
import { Course } from "@/app/_types/Course";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CourseTableRow(props: {
  row: Course;
  onDelete: (value: boolean, id: string) => void;
}) {
  const [department, setDepartment] = useState(props?.row.department);
  const [courseNum, setCourseNum] = useState(props?.row.course_num);
  const [maxEnrollment, setMaxEnrollment] = useState(props?.row.max_enrollment);
  const [prelimEnrollment, setPrelimEnrollment] = useState(
    props?.row.prelim_enrollment
  );

  return (
    <TableRow key={props.row.uuid}>
      <TableCell>
        <TextField
          fullWidth
          required
          variant="filled"
          placeholder="Course Department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          required
          variant="filled"
          placeholder="Course Number"
          type="text"
          value={courseNum}
          onChange={(e) => setCourseNum(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <FilledInput
          fullWidth
          required
          inputComponent={"input"}
          inputProps={{
            type: "number",
            min: 1,
            placeholder: "Max Enrollment",
          }}
          value={maxEnrollment}
          onChange={(e) => setMaxEnrollment(parseInt(e.target.value))}
        />
      </TableCell>
      <TableCell>
        <FilledInput
          fullWidth
          required
          inputComponent={"input"}
          inputProps={{
            type: "number",
            min: 1,
            placeholder: "Preliminary Enrollment",
          }}
          value={prelimEnrollment}
          onChange={(e) => setPrelimEnrollment(parseInt(e.target.value))}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="info"
          fullWidth
          startIcon={<AddCircleRoundedIcon />}
          onClick={() => props.onDelete(true, props.row.uuid)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function CourseInput() {
  const [courseList, setCourseList] = useState<Course[]>([
    {
      uuid: "2",
      department: "CS",
      course_num: "121",
      max_enrollment: 100,
      prelim_enrollment: 90,
    },
    {
      uuid: "3",
      department: "CS",
      course_num: "121",
      max_enrollment: 100,
      prelim_enrollment: 90,
    },
  ]);

  const handleDeleteCourse = (value: boolean, id: string) => {
    if (value)
      setCourseList((courseList) =>
        courseList.filter((course) => course.uuid !== id)
      );
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">List of Courses</Typography>
          <Typography variant="body1">
            A short description about what type of data goes here.
          </Typography>
        </Stack>
        <OutlinedInput
          type="file"
          startAdornment={<CloudUploadIcon sx={{ marginRight: "10px" }} />}
          sx={{
            width: "20%",
          }}
        />
      </Grid>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Department *</TableCell>
              <TableCell>Course Number *</TableCell>
              <TableCell>Max Enrollment *</TableCell>
              <TableCell>Preliminary Enrollment</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.map((row) => (
              <CourseTableRow
                key={row.uuid}
                row={row}
                onDelete={handleDeleteCourse}
              />
            ))}
          </TableBody>
        </Table>
        <Box sx={{ paddingTop: "2%" }}>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            startIcon={<AddCircleRoundedIcon />}
            onClick={() => {
              setCourseList([
                ...courseList,
                {
                  uuid: uuidv4(),
                  department: "",
                  course_num: "",
                  max_enrollment: 0,
                },
              ]);
            }}
          >
            Add a course
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}
