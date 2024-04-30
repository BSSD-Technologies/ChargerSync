"use client";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UseExportSchedule } from "../_hooks/apiHooks";
import { useGlobalScheduleStore } from "../_stores/store";
import toast from "react-hot-toast";
import { downloadCsv } from "../_hooks/utilHooks";
import CloseIcon from "@mui/icons-material/Close";

function SelectDepartment() {
  const [departmentSelectList, setDepartmentSelectList] = useState<string[]>(
    []
  );

  const [currentDepartments, updateSelectedDepartments] = [
    useGlobalScheduleStore((state) => state.currentDepartments),
    useGlobalScheduleStore((state) => state.updateSelectedDepartments),
  ];

  /** Update select list for UI */
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

  /** Update selected departments */
  useEffect(() => {
    updateSelectedDepartments(departmentSelectList);
    console.log(departmentSelectList);
  }, [departmentSelectList, updateSelectedDepartments]);

  return (
    <Box marginLeft={4}>
      <Typography variant="body2">
        Select the department(s) whose courses will be included in the exported
        report.
      </Typography>
      <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
        <InputLabel id="department-list-select">Select Department</InputLabel>
        <Select
          fullWidth
          multiple
          labelId="department-list-select"
          value={departmentSelectList}
          onChange={handleChange}
          input={<OutlinedInput label="Select Department" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
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
    </Box>
  );
}

function SelectRoom() {
  const [roomSelectList, setRoomSelectList] = useState<string[]>([]);
  const [currentSelectList, setCurrentSelectList] = useState<string[]>([]);

  const [currentRooms, currentRoomsID, selectedRooms, updateSelectedRooms] = [
    useGlobalScheduleStore((state) => state.currentRooms),
    useGlobalScheduleStore((state) => state.currentRoomsID),
    useGlobalScheduleStore((state) => state.selectedRooms),
    useGlobalScheduleStore((state) => state.updateSelectedRooms),
  ];

  /** Update select list for UI */
  const handleChange = (event: SelectChangeEvent<typeof roomSelectList>) => {
    const {
      target: { value },
    } = event;
    setRoomSelectList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  /** Add/remove selected room based on ID */
  const handleSelectedID = (value: string) => {
    const index = selectedRooms.indexOf(value);
    if (index === -1) {
      // If item is not already in the array, add it
      setCurrentSelectList([...selectedRooms, value]);
    } else {
      // If item is already in the array, remove it
      const newArr = [...selectedRooms];
      newArr.splice(index, 1);
      setCurrentSelectList(newArr);
    }
  };

  /** Update selected rooms */
  useEffect(() => {
    updateSelectedRooms(currentSelectList);
  }, [currentSelectList, updateSelectedRooms]);

  return (
    <Box marginLeft={4}>
      <Typography variant="body2">
        Select the room(s) whose courses will be included in the exported
        report.
      </Typography>
      <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
        <InputLabel id="room-list-select">Select Room</InputLabel>
        <Select
          fullWidth
          multiple
          labelId="room-list-select"
          value={roomSelectList}
          onChange={handleChange}
          input={<OutlinedInput label="Select Room" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {currentRooms.map((room, index) => (
            <MenuItem
              key={room}
              value={room}
              onClick={(e: any) => handleSelectedID(currentRoomsID[index])}
            >
              {room}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function SelectInstructor() {
  const [instructorSelectList, setInstructorSelectList] = useState<string[]>(
    []
  );
  const [currentSelectList, setCurrentSelectList] = useState<string[]>([]);

  const [
    currenInstructors,
    currentInstructorsID,
    selectedInstructors,
    updateSelectedInstructors,
  ] = [
    useGlobalScheduleStore((state) => state.currentInstructors),
    useGlobalScheduleStore((state) => state.currentInstructorsID),
    useGlobalScheduleStore((state) => state.selectedInstructors),
    useGlobalScheduleStore((state) => state.updateSelectedInstructors),
  ];

  /** Update select list for UI */
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

  /** Add/remove selected instructor based on ID */
  const handleSelectedID = (value: string) => {
    const index = selectedInstructors.indexOf(value);
    if (index === -1) {
      // If item is not already in the array, add it
      setCurrentSelectList([...selectedInstructors, value]);
    } else {
      // If item is already in the array, remove it
      const newArr = [...selectedInstructors];
      newArr.splice(index, 1);
      setCurrentSelectList(newArr);
    }
  };

  /** Update selected instructors */
  useEffect(() => {
    updateSelectedInstructors(currentSelectList);
  }, [currentSelectList, updateSelectedInstructors]);

  return (
    <Box marginLeft={4}>
      <Typography variant="body2">
        Select the instructor(s) whose courses will be included in the exported
        report.
      </Typography>
      <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
        <InputLabel id="instructor-list-select">Select Instructor</InputLabel>
        <Select
          fullWidth
          multiple
          labelId="instructor-list-select"
          value={instructorSelectList}
          onChange={handleChange}
          input={<OutlinedInput label="Select Instructor" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {currenInstructors.map((instructor, index) => (
            <MenuItem
              key={instructor}
              value={instructor}
              onClick={(e: any) =>
                handleSelectedID(currentInstructorsID[index])
              }
            >
              {instructor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
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

  const [
    rawSectionList,
    selectedDepartments,
    selectedRooms,
    selectedInstructors,
  ] = [
    useGlobalScheduleStore((state) => state.rawSectionList),
    useGlobalScheduleStore((state) => state.selectedDepartments),
    useGlobalScheduleStore((state) => state.selectedRooms),
    useGlobalScheduleStore((state) => state.selectedInstructors),
  ];

  const handleSelect = (option: string) => {
    setCheckedFull(option == "full");
    setCheckedDepartment(option == "department");
    setCheckedRoom(option == "room");
    setCheckedInstructor(option == "instructor");
    setCurrentChecked(option);
  };

  const handleClose = () => {
    setCheckedFull(false);
    setCheckedDepartment(false);
    setCheckedRoom(false);
    setCheckedInstructor(false);
    setCurrentChecked("full");
    onClose();
  };

  const handleExport = async () => {
    if (currentChecked == "full") {
      downloadCsv(rawSectionList, "FullSchedule.csv");
    } else if (currentChecked == "department") {
      const data = await UseExportSchedule(currentChecked, selectedDepartments);
      if (data) {
        downloadCsv(data, "FilterDeptSchedule.csv");
      }
    } else if (currentChecked == "room") {
      const data = await UseExportSchedule(currentChecked, selectedRooms);
      if (data) {
        downloadCsv(data, "FilterRoomSchedule.csv");
      }
    } else if (currentChecked == "instructor") {
      const data = await UseExportSchedule(currentChecked, selectedInstructors);
      if (data) {
        downloadCsv(data, "FilterInstructorSchedule.csv");
      }
    } else {
      toast.error("An error occurred. Please try again.");
    }
    handleClose();
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
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
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
