import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UseExportSchedule } from "../_hooks/apiHooks";
import { useGlobalScheduleStore } from "../_stores/store";

function SelectDepartment() {
  const [departmentSelectList, setDepartmentSelectList] = useState<string[]>(
    []
  );

  const [currentDepartments] = [
    useGlobalScheduleStore((state) => state.currentDepartments),
  ];

  const handleChange = (
    event: SelectChangeEvent<typeof departmentSelectList>
  ) => {
    const {
      target: { value },
    } = event;
    setDepartmentSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="department-list-select">Select Department</InputLabel>
      <Select
        fullWidth
        multiple
        labelId="department-list-select"
        label="Select Department"
        value={departmentSelectList}
        onChange={handleChange}
        input={
          <OutlinedInput
            inputProps={{
              id: "department-list-select",
              labelId: "Select Departments",
            }}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Typography variant="body1" key={value}>
                {value}
              </Typography>
            ))}
          </Box>
        )}
      >
        {currentDepartments.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectRoom() {
  const [roomSelectList, setRoomSelectList] = useState<string[]>([]);

  const [currentRooms, currentRoomsID] = [
    useGlobalScheduleStore((state) => state.currentRooms),
    useGlobalScheduleStore((state) => state.currentRoomsID),
  ];

  const handleChange = (event: SelectChangeEvent<typeof roomSelectList>) => {
    const {
      target: { value },
    } = event;
    setRoomSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="room-list-select">Select Room</InputLabel>
      <Select
        fullWidth
        multiple
        labelId="room-list-select"
        label="Select Room"
        value={roomSelectList}
        onChange={handleChange}
        input={
          <OutlinedInput
            inputProps={{
              id: "room-list-select",
              labelId: "Select Rooms",
            }}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Typography variant="body1" key={value}>
                {value}
              </Typography>
            ))}
          </Box>
        )}
      >
        {currentRooms.map((room, index) => (
          <MenuItem key={room} value={currentRoomsID[index]}>
            {room}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectInstructor() {
  const [instructorSelectList, setInstructorSelectList] = useState<string[]>(
    []
  );

  const [currenInstructors, currentInstructorsID] = [
    useGlobalScheduleStore((state) => state.currentInstructors),
    useGlobalScheduleStore((state) => state.currentInstructorsID),
  ];

  const handleChange = (
    event: SelectChangeEvent<typeof instructorSelectList>
  ) => {
    const {
      target: { value },
    } = event;
    setInstructorSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth sx={{ margin: 2 }}>
      <InputLabel id="instructor-list-select">Select Instructor</InputLabel>
      <Select
        fullWidth
        multiple
        labelId="instructor-list-select"
        label="Select Instructor"
        value={instructorSelectList}
        onChange={handleChange}
        input={
          <OutlinedInput
            inputProps={{
              id: "instructor-list-select",
              labelId: "Select Instructors",
            }}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Typography variant="body1" key={value}>
                {value}
              </Typography>
            ))}
          </Box>
        )}
      >
        {currenInstructors.map((instructor, index) => (
          <MenuItem key={instructor} value={currentInstructorsID[index]}>
            {instructor}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ExportModal(props: ExportModalProps) {
  const { onClose, open } = props;

  const [checkedFull, setCheckedFull] = useState(true);
  const [checkedDepartment, setCheckedDepartment] = useState(false);
  const [checkedRoom, setCheckedRoom] = useState(false);
  const [checkedInstructor, setCheckedInstructor] = useState(false);
  const [currentChecked, setCurrentChecked] = useState("");

  const handleSelect = (option: string) => {
    setCheckedFull(option == "full");
    setCheckedDepartment(option == "department");
    setCheckedRoom(option == "room");
    setCheckedInstructor(option == "instructor");
    setCurrentChecked(option);
  };

  const handleClose = () => {
    onClose();
  };

  const handleExport = async () => {
    // if (currentChecked != "full") {
    //   const getData = await UseExportSchedule(currentChecked, );
    // }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={"sm"}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5">Export Options</Typography>
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup
            defaultValue="full"
            onChange={(e: any) => handleSelect(e.target.value)}
          >
            <FormControlLabel
              value="full"
              control={<Radio />}
              label="Export Full Schedule"
            />
            <FormControlLabel
              value="department"
              control={<Radio />}
              label="Filter by Department"
            />
            {checkedDepartment && <SelectDepartment />}
            <FormControlLabel
              value="room"
              control={<Radio />}
              label="Filter by Room"
            />
            {checkedRoom && <SelectRoom />}
            <FormControlLabel
              value="instructor"
              control={
                <Radio
                  checked={checkedInstructor}
                  onChange={(e: any) => handleSelect(e.target.value)}
                />
              }
              label="Filter by Instructor"
            />
            {checkedInstructor && <SelectInstructor />}
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <DialogActions>
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            fullWidth
            sx={{
              paddingLeft: "15px",
            }}
            onClick={handleExport}
          >
            <span>Export</span>
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
