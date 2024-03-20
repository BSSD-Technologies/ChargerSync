import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { useGlobalCourseListStore, useGlobalInstructorListStore, useGlobalPeriodListStore } from "@/app/_stores/store";
import { convertTime12, useFirstRender } from "@/app/_hooks/utilHooks";


function CoursePreferenceSelect() {
  const [selectList, setSelectList] = useState<string[]>([]);

  /** Course list */
  const [courseList] = [
    useGlobalCourseListStore((state) => state.courseList),
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectList>) => {
    const {
      target: { value },
    } = event;
    setSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="course-list-select">Course Preferences</InputLabel>
      <Select
        fullWidth
        multiple
        id="course-list-select"
        value={selectList}
        onChange={handleChange}
        input={
          <FilledInput
            inputProps={{
              id: "course-list-select",
              label: "Course Preferences",
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
        {courseList.map((course) => (
          <MenuItem key={course.uuid} value={`${course.department} ${course.course_num}`}>
            {`${course.department} ${course.course_num}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function PeriodPreferenceSelect() {
  const [selectList, setSelectList] = useState<string[]>([]);
  const isFirstRender = useFirstRender();

  /** Period list */
  const [fullPeriodList, populateFullPeriodList] = [
    useGlobalPeriodListStore((state) => state.fullPeriodList),
    useGlobalPeriodListStore((state) => state.populateFullPeriodList),
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectList>) => {
    const {
      target: { value },
    } = event;
    setSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    populateFullPeriodList();
  }, [isFirstRender, populateFullPeriodList])

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="period-list-select">Period Preferences</InputLabel>
      <Select
        fullWidth
        multiple
        id="period-list-select"
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
          <MenuItem key={period.uuid} value={`${period.day} ${convertTime12(period.start_time)} - ${convertTime12(period.end_time)}`}>
            {`${period.day} ${convertTime12(period.start_time)} - ${convertTime12(period.end_time)}`}
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
    <div>
      {instructorList.map((instructor) => (
        <Accordion key={instructor.uuid}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`${instructor.fname} ${instructor.lname}`}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems={"center"} justifyContent={"left"}>
              <Typography variant="subtitle1">Course preferences</Typography>
              <CoursePreferenceSelect />
              <PeriodPreferenceSelect />
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default function PreferenceInput() {
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
      <InstructorListAccordion />
    </Box>
  );
}
