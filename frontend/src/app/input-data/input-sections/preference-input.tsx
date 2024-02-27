import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

// Dummy course list data
const courseList = [
  "CS 100",
  "CS 121",
  "CS 221",
  "CS 214",
  "CS 309",
  "CS 317",
  "CS 424",
  "CS 413",
  "CS 490",
  "CS 499",
];

// Dummy instructor list data
const instructorList = [
  "Dan Schrimpsher",
  "Beth Allen",
  "Danny Hardin",
  "Kevin Preston",
];

function CoursePreferenceSelect() {
  const [selectList, setSelectList] = useState<string[]>([]);

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
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function InstructorListAccordion() {
  return (
    <div>
      {instructorList.map((instructor) => (
        <Accordion key={instructor}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {instructor}
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems={"center"} justifyContent={"left"}>
              <Typography variant="subtitle1">Course preferences</Typography>
              <CoursePreferenceSelect />
            </Grid>
            <br />
            <PreferenceTable />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

function PreferenceTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day *</TableCell>
            <TableCell>Start Time *</TableCell>
            <TableCell>End Time *</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="day-select">Day</InputLabel>
                <Select fullWidth labelId="day-select" id="day-select">
                  <MenuItem value={"M"}>Monday</MenuItem>
                  <MenuItem value={"T"}>Tuesday</MenuItem>
                  <MenuItem value={"W"}>Wednesday</MenuItem>
                  <MenuItem value={"R"}>Thursday</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                required
                id="start-time"
                variant="filled"
                type="time"
              />
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                required
                id="end-time"
                variant="filled"
                type="time"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ paddingTop: "2%" }}>
        <Button
          variant="outlined"
          color="info"
          fullWidth
          startIcon={<AddCircleRoundedIcon />}
        >
          Add a preference
        </Button>
      </Box>
    </TableContainer>
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
