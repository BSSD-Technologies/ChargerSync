import {
  Box,
  Button,
  FilledInput,
  FormHelperText,
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
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Course, defaultCourse } from "@/app/_types/Course";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useValidateInt, useValidateString } from "@/app/_hooks.ts/utilHooks";

function CourseTableRow(props: {
  row: Course;
  // On "delete", send back Id of current course to delete
  onDelete: (id: string) => void;
}) {
  // States for course row inputs
  const [department, setDepartment] = useState(props?.row.department);
  const [courseNum, setCourseNum] = useState(props?.row.course_num);
  const [maxEnrollment, setMaxEnrollment] = useState(props?.row.max_enrollment);
  const [prelimEnrollment, setPrelimEnrollment] = useState(
    props?.row.prelim_enrollment
  );

  // Validation and error handling for department
  const {
    hasError: deptError,
    errorText: deptErrorText,
    validateString: validateDept,
  } = useValidateString();

  // Validation and error handling for course number
  const {
    hasError: courseNumError,
    errorText: courseNumErrorText,
    validateString: validateCourseNum,
  } = useValidateString();

  // Validation and error handling for max enrollment
  const {
    hasError: maxEnrollError,
    errorText: maxEnrollErrorText,
    validateInt: validateMaxEnroll,
  } = useValidateInt();

  // Validation and error handling for prelim enrollment
  const {
    hasError: prelimEnrollError,
    errorText: prelimEnrollErrorText,
    validateInt: validatePrelimEnroll,
  } = useValidateInt();

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
          onChange={(e) => {
            validateDept(e.target.value);
            setDepartment(e.target.value);
          }}
          error={deptError}
          helperText={deptErrorText}
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
          onChange={(e) => {
            validateCourseNum(e.target.value);
            setCourseNum(e.target.value);
          }}
          error={courseNumError}
          helperText={courseNumErrorText}
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
            pattern: "[0-9]",
            placeholder: "Max Enrollment",
          }}
          value={maxEnrollment}
          onChange={(e) => {
            validateMaxEnroll(e.target.value);
            setMaxEnrollment(parseInt(e.target.value));
          }}
          error={maxEnrollError}
        />
        <FormHelperText
          error={maxEnrollError}
          sx={{ visibility: maxEnrollError ? "visible" : "hidden" }}
        >
          {maxEnrollErrorText}
        </FormHelperText>
      </TableCell>
      <TableCell>
        <FilledInput
          fullWidth
          inputComponent={"input"}
          inputProps={{
            type: "number",
            min: 1,
            max: maxEnrollment,
            pattern: "[0-9]",
            placeholder: "Prelim Enrollment",
          }}
          value={prelimEnrollment}
          onChange={(e) => {
            validatePrelimEnroll(e.target.value, maxEnrollment);
            setPrelimEnrollment(parseInt(e.target.value));
          }}
          error={prelimEnrollError}
        />
        <FormHelperText
          error={prelimEnrollError}
          sx={{ visibility: prelimEnrollError ? "visible" : "hidden" }}
        >
          {prelimEnrollErrorText}
        </FormHelperText>
      </TableCell>
      <TableCell>
        <Button
          variant="text"
          color="info"
          fullWidth
          onClick={() => props.onDelete(props.row.uuid)}
        >
          <ClearRoundedIcon />
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

  const handleDeleteCourse = (id: string) => {
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
              <TableCell></TableCell>
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
                { ...defaultCourse, uuid: uuidv4() },
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
