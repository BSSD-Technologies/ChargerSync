import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useGlobalCourseListStore,
  useGlobalInstructorListStore,
  useGlobalPeriodListStore,
  useGlobalPreferenceListStore,
} from "@/app/_stores/store";
import { convertTime12, useFirstRender } from "@/app/_hooks/utilHooks";
import { CoursePreference } from "@/app/_types/CoursePreference";
import { PeriodPreference } from "@/app/_types/PeriodPreference";

function CoursePreferenceSelect(props: { instructorId: string }) {
  const [selectList, setSelectList] = useState<string[]>([]);

  /** Course list and course preference list */
  const [courseList] = [useGlobalCourseListStore((state) => state.courseList)];
  const [coursePrefList, setCoursePrefList] = useState<CoursePreference[]>([]);
  const [globalCoursePrefList, populateCoursePrefList] = [
    useGlobalPreferenceListStore((state) => state.coursePrefList),
    useGlobalPreferenceListStore((state) => state.setCoursePrefList),
  ];

  /** Handle change visually of select list */
  const handleChange = (event: SelectChangeEvent<typeof selectList>) => {
    const {
      target: { value },
    } = event;
    // Update selectList state
    setSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  /** Function to check if a course with the given uuid exists in coursePrefList */
  const isCourseExists = (uuid: string): boolean => {
    return coursePrefList.some((course) => course.course_uuid === uuid);
  };

  /** Handle change in course preference list */
  const handleCoursePrefChange = (courseId: string) => {
    // Course exists, so we need to delete from preference list
    if (isCourseExists(courseId)) {
      setCoursePrefList([
        ...coursePrefList.filter((course) => course.course_uuid !== courseId),
      ]);
    }
    // Course DNE, so we need to add to preference list
    else {
      setCoursePrefList([
        ...coursePrefList,
        {
          uuid: uuidv4(),
          instructor_uuid: props.instructorId,
          course_uuid: courseId,
        },
      ]);
    }
  };

  /** Auto-populate zustand course preference list */
  useEffect(() => {
    populateCoursePrefList(coursePrefList, props.instructorId);
  }, [coursePrefList, populateCoursePrefList, props.instructorId]);

  /** Clear selectList when global coursePrefList is empty  */
  useEffect(() => {
    if (globalCoursePrefList.length <= 0) setSelectList([]);
  }, [globalCoursePrefList.length]);

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="course-list-select">Course Preferences</InputLabel>
      <Select
        fullWidth
        multiple
        value={selectList}
        onChange={handleChange}
        input={<FilledInput />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        sx={{ height: "auto" }}
      >
        {courseList.map((course) => (
          <MenuItem
            key={course.uuid}
            value={`${course.department} ${course.course_num}`}
            onClick={() => handleCoursePrefChange(course.uuid)}
          >
            {`${course.department} ${course.course_num}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function PeriodPreferenceSelect(props: { instructorId: string }) {
  const [selectList, setSelectList] = useState<string[]>([]);
  const isFirstRender = useFirstRender();

  /** Period list and period preference list */
  const [periodList] = [useGlobalPeriodListStore((state) => state.periodList)];
  const [periodPrefList, setPeriodPrefList] = useState<PeriodPreference[]>([]);
  const [globalPeriodPrefList, populatePeriodPrefList] = [
    useGlobalPreferenceListStore((state) => state.periodPrefList),
    useGlobalPreferenceListStore((state) => state.setPeriodPrefList),
  ];

  /** Period list */
  const [fullPeriodList, populateFullPeriodList, getHasErrors] = [
    useGlobalPeriodListStore((state) => state.fullPeriodList),
    useGlobalPeriodListStore((state) => state.populateFullPeriodList),
    useGlobalPeriodListStore((state) => state.getHasErrors),
  ];

  /** Handle change visually of select list */
  const handleChange = (event: SelectChangeEvent<typeof selectList>) => {
    const {
      target: { value },
    } = event;
    setSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  /** Function to check if a course with the given uuid exists in coursePrefList */
  const isPeriodExists = (uuid: string): boolean => {
    return periodPrefList.some((period) => period.period_uuid === uuid);
  };

  /** Handle change in period preference list */
  const handlePeriodPrefChange = (periodId: string) => {
    // Period exists, so we need to delete from preference list
    if (isPeriodExists(periodId)) {
      console.log("delete period");
      setPeriodPrefList([
        ...periodPrefList.filter((period) => period.period_uuid !== periodId),
      ]);
    }
    // Period DNE, so we need to add to preference list
    else {
      setPeriodPrefList([
        ...periodPrefList,
        {
          uuid: uuidv4(),
          instructor_uuid: props.instructorId,
          period_uuid: periodId,
        },
      ]);
    }
  };

  /** Auto-populate zustand period preference list */
  useEffect(() => {
    populatePeriodPrefList(periodPrefList, props.instructorId);
  }, [periodPrefList, populatePeriodPrefList, props.instructorId]);

  /** Populate full period list with all days */
  useEffect(() => {
    // Only repopulate if no errors
    if (!getHasErrors()) populateFullPeriodList();
  }, [getHasErrors, periodList, populateFullPeriodList]);

  /** Clear selectList when global periodPrefList is empty  */
  useEffect(() => {
    if (globalPeriodPrefList.length <= 0) setSelectList([]);
  }, [globalPeriodPrefList.length]);

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="period-list-select">Period Preferences</InputLabel>
      <Select
        fullWidth
        multiple
        value={selectList}
        onChange={handleChange}
        input={
          <FilledInput
            inputProps={{
              id: "period-list-select",
              label: "Period Preferences",
            }}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {fullPeriodList.map((period) => (
          <MenuItem
            key={period.uuid}
            value={`${period.day} ${convertTime12(
              period.start_time
            )} - ${convertTime12(period.end_time)}`}
            onClick={() => handlePeriodPrefChange(period.uuid)}
          >
            {`${period.day} ${convertTime12(
              period.start_time
            )} - ${convertTime12(period.end_time)}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function InstructorListAccordion() {
  /** Instructor list */
  const [instructorList] = [
    useGlobalInstructorListStore((state) => state.instructorList),
  ];

  return (
    <div style={{ borderRadius: "20px", overflow: "hidden" }}>
      {instructorList.map((instructor) => (
        <Accordion key={instructor.uuid}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`${instructor.fname} ${instructor.lname}`}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems={"center"} justifyContent={"left"}>
              <Typography variant="subtitle1">Course preferences</Typography>
              <CoursePreferenceSelect instructorId={instructor.uuid} />
              <Typography variant="subtitle1">Period preferences</Typography>
              <PeriodPreferenceSelect instructorId={instructor.uuid} />
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default function PreferenceInput() {
  /** Scroll to top functionality */
  const executeScrollUp = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#preference-top");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Scroll to continue functionality */
  const executeScrollDown = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#preference-continue");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <Typography variant="h4">Instructor Preferences</Typography>
          <br />
          <Typography variant="body1">
            If applicable, enter information about each instructor&apos;s course
            or period preferences. These preferences are not guaranteed, but
            will be taken into account during schedule generation.
          </Typography>
          <br />
          <Stack direction={"row"}>
            <InfoRoundedIcon sx={{ marginRight: "15px" }} />
            <Typography variant="body1" justifyContent={"center"}>
              <em>
                Note: If changes are made to the <u>course list</u> or{" "}
                <u>period list</u>, preferences for all instructors will be
                emptied and will need to be re-entered.
              </em>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <br />
      <InstructorListAccordion />
      <div id="preference-continue"></div>
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
