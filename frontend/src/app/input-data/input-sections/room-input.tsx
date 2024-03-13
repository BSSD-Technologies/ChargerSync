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
import { Room, defaultRoom } from "@/app/_types/Room";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useFirstRender,
  useValidateInt,
  useValidateString,
} from "@/app/_hooks/utilHooks";
import { useGlobalRoomListStore } from "@/app/_stores/store";

function RoomTableRow(props: { row: Room }) {
  /** States for room inputs */
  const uuid = props?.row.uuid;
  const [roomId, setRoomId] = useState(props?.row.room_id);
  const [maxCapacity, setMaxCapacity] = useState(props?.row.max_capacity);
  const isFirstRender = useFirstRender();

  /** States for updating room list for current row, or deleting from list */
  const [updateRoomList, deleteRoomList, hasErrors] = [
    useGlobalRoomListStore((state) => state.updateRoomList),
    useGlobalRoomListStore((state) => state.deleteRoomList),
    useGlobalRoomListStore((state) => state.hasErrors),
  ];

  /** Handle row deletion and error handling */
  const handleDelete = () => {
    if (roomIdError) hasErrors.pop();
    if (maxCapacityError) hasErrors.pop();
    deleteRoomList(uuid);
  };

  /** Validation and error handling for room ID */
  const {
    hasError: roomIdError,
    errorText: roomIdErrorText,
    validateString: validateRoomId,
  } = useValidateString();

  /** Validation and error handling for max capacity */
  const {
    hasError: maxCapacityError,
    errorText: maxCapacityErrorText,
    validateInt: validateMaxCapacity,
  } = useValidateInt();

  /** Update roomList on change */
  useEffect(() => {
    updateRoomList({
      uuid: uuid,
      room_id: roomId,
      max_capacity: maxCapacity,
    });
  }, [maxCapacity, roomId, updateRoomList, uuid]);

  /** Update hasErrors for roomIdError */
  useEffect(() => {
    if (roomIdError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, roomIdError]);

  /** Update hasErrors for maxCapacityError */
  useEffect(() => {
    if (maxCapacityError) hasErrors.push(true);
    else hasErrors.pop();
  }, [hasErrors, maxCapacityError]);

  /** First render validation */
  useEffect(() => {
    if (isFirstRender) {
      validateRoomId(roomId);
      validateMaxCapacity(maxCapacity.toString());
    }
  }, [isFirstRender, maxCapacity, roomId, validateMaxCapacity, validateRoomId]);

  return (
    <TableRow key={uuid}>
      <TableCell>
        <TextField
          fullWidth
          required
          variant="filled"
          placeholder="Room ID"
          type="text"
          value={roomId}
          onChange={(e) => {
            validateRoomId(e.target.value);
            setRoomId(e.target.value);
          }}
          error={roomIdError}
          helperText={roomIdErrorText}
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
            placeholder: "Max Capacity",
          }}
          value={maxCapacity}
          onChange={(e) => {
            validateMaxCapacity(e.target.value);
            setMaxCapacity(parseInt(e.target.value));
          }}
          error={maxCapacityError}
        />
        <FormHelperText
          error={maxCapacityError}
          sx={{ visibility: maxCapacityError ? "visible" : "hidden" }}
        >
          {maxCapacityErrorText}
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

export default function RoomInput(props: {
  handleErrors: (value: boolean) => void;
}) {
  /** Room list */
  const [roomList, addRoomList, getHasErrors] = [
    useGlobalRoomListStore((state) => state.roomList),
    useGlobalRoomListStore((state) => state.addRoomList),
    useGlobalRoomListStore((state) => state.getHasErrors),
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
          <Typography variant="h4">List of Rooms</Typography>
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
              <TableCell>Room ID *</TableCell>
              <TableCell>Max Capacity *</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.map((row) => (
              <RoomTableRow key={row.uuid} row={row} />
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
              const newRoom = { ...defaultRoom, uuid: uuidv4() };
              addRoomList(newRoom);
            }}
          >
            Add a room
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}
