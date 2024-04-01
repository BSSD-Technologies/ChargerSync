import {
  Box,
  Button,
  FilledInput,
  FormHelperText,
  Grid,
  InputLabel,
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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useFirstRender,
  useValidateInt,
  useValidateIntNR,
  useValidateString,
} from "@/app/_hooks/utilHooks";
import { useGlobalCourseListStore } from "@/app/_stores/store";
import { UseUploadCourses } from "@/app/_hooks/apiHooks";

function CourseTableRow(props: { row: Course }) {
  /** States for course row inputs */
  const uuid = props?.row.uuid;
  const [department, setDepartment] = useState(props?.row.department);
  const [courseNum, setCourseNum] = useState(props?.row.course_num);
  const [maxEnrollment, setMaxEnrollment] = useState(props?.row.max_enrollment);
  const [prelimEnrollment, setPrelimEnrollment] = useState(
    props?.row.prelim_enrollment ? props?.row.prelim_enrollment : NaN
  );
  const [prelimDisabled, setPrelimDisabled] = useState<boolean>(true); // Disabled state for preliminary input
  const isFirstRender = useFirstRender(); // Used for first render functions

  /** States for updating course list for current row, or deleting from list */
  const [updateCourseList, deleteCourseList, hasErrors] = [
    useGlobalCourseListStore((state) => state.updateCourseList),
    useGlobalCourseListStore((state) => state.deleteCourseList),
    useGlobalCourseListStore((state) => state.hasErrors),
  ];

  /** Handle max enrollment & preliminary enrollment dependency validation */
  const handleMaxEnrollment = (value: string) => {
    validateMaxEnroll(value);
    setMaxEnrollment(parseInt(value));
    if (value.length <= 0 && prelimEnrollment) {
      setPrelimDisabled(true);
      setPrelimEnrollment(NaN);
      setPrelimEnrollError(false);
    } else setPrelimDisabled(false);
  };

  /** Handle row deletion and error handling */
  const handleDelete = () => {
    if (deptError) hasErrors.pop();
    if (courseNumError) hasErrors.pop();
    if (maxEnrollError) hasErrors.pop();
    if (prelimEnrollError) hasErrors.pop();
    deleteCourseList(uuid);
  };

  /** Validation and error handling for department */
  const {
    hasError: deptError,
    errorText: deptErrorText,
    validateString: validateDept,
  } = useValidateString();

  /** Validation and error handling for course number */
  const {
    hasError: courseNumError,
    errorText: courseNumErrorText,
    validateString: validateCourseNum,
  } = useValidateString();

  /** Validation and error handling for max enrollment */
  const {
    hasError: maxEnrollError,
    errorText: maxEnrollErrorText,
    validateInt: validateMaxEnroll,
  } = useValidateInt();

  /** Validation and error handling for prelim enrollment */
  const {
    hasError: prelimEnrollError,
    errorText: prelimEnrollErrorText,
    validateInt: validatePrelimEnroll,
    setError: setPrelimEnrollError,
  } = useValidateIntNR();

  /** Update courseList on change */
  useEffect(() => {
    updateCourseList({
      uuid: uuid,
      department: department,
      course_num: courseNum,
      max_enrollment: maxEnrollment,
      prelim_enrollment: prelimEnrollment,
    });
  }, [
    courseNum,
    department,
    maxEnrollment,
    prelimEnrollment,
    uuid,
    updateCourseList,
  ]);

  /** Update prelim enrollment based on max enrollment */
  useEffect(() => {
    if (maxEnrollment) setPrelimDisabled(false);
    else setPrelimDisabled(true);
  }, [maxEnrollment]);

  /** Update hasErrors for deptError */
  useEffect(() => {
    if (deptError) hasErrors.push(true);
    else hasErrors.pop();
  }, [deptError, hasErrors]);

  /** Update hasErrors for courseNumError */
  useEffect(() => {
    if (courseNumError) hasErrors.push(true);
    else hasErrors.pop();
  }, [courseNumError, hasErrors]);

  /** Update hasErrors for maxEnrollError */
  useEffect(() => {
    if (maxEnrollError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, maxEnrollError]);

  /** Update hasErrors for prelimEnrollError */
  useEffect(() => {
    if (prelimEnrollError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, prelimEnrollError]);

  /** First render validation */
  useEffect(() => {
    if (isFirstRender) {
      validateDept(department);
      validateCourseNum(courseNum);
      validateMaxEnroll(maxEnrollment.toString());
      validatePrelimEnroll(prelimEnrollment.toString(), maxEnrollment);
    }
  }, [
    courseNum,
    department,
    isFirstRender,
    maxEnrollment,
    prelimEnrollment,
    validateCourseNum,
    validateDept,
    validateMaxEnroll,
    validatePrelimEnroll,
  ]);

  return (
    <TableRow key={uuid}>
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
          onChange={(e) => handleMaxEnrollment(e.target.value)}
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
          disabled={prelimDisabled}
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
        <Button variant="text" color="info" fullWidth onClick={handleDelete}>
          <ClearRoundedIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function CourseInput(props: {
  handleErrors: (value: boolean) => void;
}) {
  /** Course list */
  const [courseList, addCourseList, getHasErrors] = [
    useGlobalCourseListStore((state) => state.courseList),
    useGlobalCourseListStore((state) => state.addCourseList),
    useGlobalCourseListStore((state) => state.getHasErrors),
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
      const data = await UseUploadCourses(event.target.files[0]);
      // Add JSON output to course list
      data?.map((course) => addCourseList(course));
    }
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
        <InputLabel>Test</InputLabel>
        <OutlinedInput
          type="file"
          startAdornment={<CloudUploadIcon sx={{ marginRight: "10px" }} />}
          sx={{
            width: "20%",
          }}
          inputProps={{label: "Test"}}
          onChange={handleUpload}
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
              <CourseTableRow key={row.uuid} row={row} />
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
              const newCourse = { ...defaultCourse, uuid: uuidv4() };
              addCourseList(newCourse);
            }}
          >
            Add a course
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}
