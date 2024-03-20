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
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Instructor, defaultInstructor } from "@/app/_types/Instructor";
import {
  useFirstRender,
  useValidateIntNR,
  useValidateString,
} from "@/app/_hooks/utilHooks";
import { useGlobalInstructorListStore } from "@/app/_stores/store";

function InstructorTableRow(props: { row: Instructor }) {
  /** States for instructor row inputs */
  const uuid = props?.row.uuid;
  const [fname, setFname] = useState(props?.row.fname);
  const [lname, setLname] = useState(props?.row.lname);
  const [priority, setPriority] = useState(props?.row.priority);
  const isFirstRender = useFirstRender(); // Used for first render functions

  /** States for updating instructor list for current row, or deleting from list */
  const [updateInstructorList, deleteInstructorList, hasErrors] = [
    useGlobalInstructorListStore((state) => state.updateInstructorList),
    useGlobalInstructorListStore((state) => state.deleteInstructorList),
    useGlobalInstructorListStore((state) => state.hasErrors),
  ];

  /** Handle row deletion and error handling */
  const handleDelete = () => {
    if (fnameError) hasErrors.pop();
    if (lnameError) hasErrors.pop();
    if (priorityError) hasErrors.pop();
    deleteInstructorList(uuid);
  };

  /** Validation and error handling for first name */
  const {
    hasError: fnameError,
    errorText: fnameErrorText,
    validateString: validateFname,
  } = useValidateString();

  /** Validation and error handling for last name */
  const {
    hasError: lnameError,
    errorText: lnameErrorText,
    validateString: validateLname,
  } = useValidateString();

  /** Validation and error handling for priority */
  const {
    hasError: priorityError,
    errorText: priorityErrorText,
    validateInt: validatePriority,
    setError: setPriorityError,
  } = useValidateIntNR();

  /** Update instructorList on change */
  useEffect(() => {
    updateInstructorList({
      uuid,
      fname,
      lname,
      priority,
    });
  }, [fname, lname, priority, updateInstructorList, uuid]);

  /** Update hasErrors for fnameError */
  useEffect(() => {
    if (fnameError) hasErrors.push(true);
    else hasErrors.pop();
  }, [fnameError, hasErrors]);

  /** Update hasErrors for lnameError */
  useEffect(() => {
    if (lnameError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, lnameError]);

  /** Update hasErrors for priorityError */
  useEffect(() => {
    if (priorityError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, priorityError]);

  /** First render validation */
  useEffect(() => {
    if (isFirstRender) {
      validateFname(fname);
      validateLname(lname);
      validatePriority(priority.toString());
    }
  }, [
    fname,
    isFirstRender,
    lname,
    priority,
    validateFname,
    validateLname,
    validatePriority,
  ]);

  return (
    <TableRow key={uuid}>
      <TableCell>
        <TextField
          fullWidth
          required
          variant="filled"
          placeholder="First Name"
          type="text"
          value={fname}
          onChange={(e) => {
            validateFname(e.target.value);
            setFname(e.target.value);
          }}
          error={fnameError}
          helperText={fnameErrorText}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          required
          variant="filled"
          placeholder="Last Name"
          type="text"
          value={lname}
          onChange={(e) => {
            validateLname(e.target.value);
            setLname(e.target.value);
          }}
          error={lnameError}
          helperText={lnameErrorText}
        />
      </TableCell>
      <TableCell>
        <FilledInput
          fullWidth
          inputComponent={"input"}
          inputProps={{
            type: "number",
            min: 0,
            placeholder: "Priority",
          }}
          value={priority}
          onChange={(e) => {
            validatePriority(e.target.value);
            setPriority(parseInt(e.target.value));
          }}
          error={priorityError}
        />
        <FormHelperText
          error={priorityError}
          sx={{ visibility: priorityError ? "visible" : "hidden" }}
        >
          {priorityErrorText}
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

export default function InstructorInput(props: {
  handleErrors: (value: boolean) => void;
}) {
  /** Instructor list */
  const [instructorList, addInstructorList, getHasErrors] = [
    useGlobalInstructorListStore((state) => state.instructorList),
    useGlobalInstructorListStore((state) => state.addInstructorList),
    useGlobalInstructorListStore((state) => state.getHasErrors),
  ];

  useEffect(() => {
    props.handleErrors(getHasErrors());
  });

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">List of Instructors</Typography>
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
              <TableCell>First Name *</TableCell>
              <TableCell>Last Name *</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorList.map((row) => (
              <InstructorTableRow key={row.uuid} row={row} />
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
              const newInstructor = { ...defaultInstructor, uuid: uuidv4() };
              addInstructorList(newInstructor);
            }}
          >
            Add an instructor
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}
