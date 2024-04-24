import {
  Box,
  Button,
  FilledInput,
  FormHelperText,
  Grid,
  IconButton,
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
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
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
  const [updateCourseList, deleteCourseList, hasErrors, courseList] = [
    useGlobalCourseListStore((state) => state.updateCourseList),
    useGlobalCourseListStore((state) => state.deleteCourseList),
    useGlobalCourseListStore((state) => state.hasErrors),
    useGlobalCourseListStore((state) => state.courseList),
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
    validateCourse: validateDept,
    setError: setDeptError,
  } = useValidateString();

  /** Validation and error handling for course number */
  const {
    hasError: courseNumError,
    errorText: courseNumErrorText,
    validateCourse: validateCourseNum,
    setError: setCourseNumError,
  } = useValidateString();

  /** Validation and error handling for max enrollment */
  const {
    hasError: maxEnrollError,
    errorText: maxEnrollErrorText,
    validateInt: validateMaxEnroll,
    setError: setMaxEnrollError,
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
    if (!isFirstRender) {
      if (deptError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [deptError, hasErrors, isFirstRender]);

  /** Update hasErrors for courseNumError */
  useEffect(() => {
    if (!isFirstRender) {
      if (courseNumError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [courseNumError, hasErrors, isFirstRender]);

  /** Update hasErrors for maxEnrollError */
  useEffect(() => {
    if (!isFirstRender) {
      if (maxEnrollError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [hasErrors, isFirstRender, maxEnrollError]);

  /** Update hasErrors for prelimEnrollError */
  useEffect(() => {
    if (!isFirstRender && !prelimDisabled) {
      if (prelimEnrollError) hasErrors.push(true);
      else hasErrors.pop();
    }
  }, [hasErrors, isFirstRender, prelimDisabled, prelimEnrollError]);

  /** First render validation */
  useEffect(() => {
    if (isFirstRender) {
      validateDept(department, uuid, department, courseNum, courseList);
      validateCourseNum(courseNum, uuid, department, courseNum, courseList);
      validateMaxEnroll(maxEnrollment.toString());
      validatePrelimEnroll(prelimEnrollment.toString(), maxEnrollment);
      if (deptError) hasErrors.push();
      if (courseNumError) hasErrors.push();
      if (maxEnrollError) hasErrors.push();
      if (prelimEnrollError) hasErrors.push();
    }
  }, [
    courseList,
    courseNum,
    courseNumError,
    department,
    deptError,
    hasErrors,
    isFirstRender,
    maxEnrollError,
    maxEnrollment,
    prelimEnrollError,
    prelimEnrollment,
    uuid,
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
            setDepartment(e.target.value);
            validateDept(
              e.target.value,
              uuid,
              e.target.value,
              courseNum,
              courseList
            );
            validateCourseNum(
              courseNum,
              uuid,
              e.target.value,
              courseNum,
              courseList
            );
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
            setCourseNum(e.target.value);
            validateCourseNum(
              e.target.value,
              uuid,
              department,
              e.target.value,
              courseList
            );
            validateDept(
              department,
              uuid,
              department,
              e.target.value,
              courseList
            );
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
  /** Scroll to top functionality */
  const executeScrollUp = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#course-top");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Scroll to continue functionality */
  const executeScrollDown = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#course-continue");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Course list */
  const [courseList, addCourseList, getHasErrors, deleteAllCourseList] = [
    useGlobalCourseListStore((state) => state.courseList),
    useGlobalCourseListStore((state) => state.addCourseList),
    useGlobalCourseListStore((state) => state.getHasErrors),
    useGlobalCourseListStore((state) => state.deleteAllCourseList),
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
    event.target.files == null;
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
        padding: "2%",
        border: "2px solid",
        borderColor:
          getHasErrors() && courseList.length > 0 ? "#d32f2f" : "transparent",
        borderRadius: "15px",
        transition: "all .5s ease",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">List of Courses</Typography>
          <Typography variant="body1">
            A short description about what type of data goes here.
          </Typography>
        </Stack>
        <div className="input-component">
          <CloudUploadIcon sx={{ marginRight: "10px" }} />
          <input
            type="file"
            onChange={handleUpload}
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
          />
        </div>
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
              <TableCell title="Clear All">
                <Button
                  fullWidth
                  onClick={deleteAllCourseList}
                  sx={{
                    display: courseList.length > 0 ? "flex" : "none",
                  }}
                >
                  <HighlightOffRoundedIcon fontSize="medium" />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.map((row) => (
              <CourseTableRow key={row.uuid} row={row} />
            ))}
          </TableBody>
        </Table>
        <Box sx={{ paddingTop: "2%" }} id={"course-continue"}>
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
      <IconButton
        title={"Scroll to top"}
        className="scroll-up"
        onClick={executeScrollUp}
      >
        <KeyboardArrowUpRoundedIcon color={"info"} />
      </IconButton>
      <IconButton
        title={"Scroll to bottom"}
        className="scroll-down"
        onClick={executeScrollDown}
      >
        <KeyboardArrowDownRoundedIcon color={"info"} />
      </IconButton>
    </Box>
  );
}
