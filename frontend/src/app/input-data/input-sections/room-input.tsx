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
import { Room, defaultRoom } from "@/app/_types/Room";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useFirstRender,
  useValidateInt,
  useValidateString,
} from "@/app/_hooks/utilHooks";
import { useGlobalRoomListStore } from "@/app/_stores/store";
import { UseUploadRooms } from "@/app/_hooks/apiHooks";

function RoomTableRow(props: { row: Room }) {
  /** States for room inputs */
  const uuid = props?.row.uuid;
  const [roomId, setRoomId] = useState(props?.row.room_id);
  const [maxCapacity, setMaxCapacity] = useState(props?.row.max_capacity);
  const isFirstRender = useFirstRender();

  /** States for updating room list for current row, or deleting from list */
  const [updateRoomList, deleteRoomList, hasErrors, roomList] = [
    useGlobalRoomListStore((state) => state.updateRoomList),
    useGlobalRoomListStore((state) => state.deleteRoomList),
    useGlobalRoomListStore((state) => state.hasErrors),
    useGlobalRoomListStore((state) => state.roomList),
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
    validateRoom: validateRoomId,
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
      validateRoomId(roomId, uuid, roomList);
      validateMaxCapacity(maxCapacity.toString());
    }
  }, [
    isFirstRender,
    maxCapacity,
    roomId,
    roomList,
    uuid,
    validateMaxCapacity,
    validateRoomId,
  ]);

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
            validateRoomId(e.target.value, uuid, roomList);
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
  /** Scroll to top functionality */
  const executeScrollUp = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#room-top");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Scroll to continue functionality */
  const executeScrollDown = () => {
    if (typeof document !== "undefined") {
      const section = document.querySelector("#room-continue");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /** Room list */
  const [roomList, addRoomList, getHasErrors, deleteAllRoomList] = [
    useGlobalRoomListStore((state) => state.roomList),
    useGlobalRoomListStore((state) => state.addRoomList),
    useGlobalRoomListStore((state) => state.getHasErrors),
    useGlobalRoomListStore((state) => state.deleteAllRoomList),
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
      const data = await UseUploadRooms(event.target.files[0]);
      // Add JSON output to room list
      data?.map((room) => addRoomList(room));
    }
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
        padding: "2%",
        border: "2px solid",
        borderColor:
          getHasErrors() && roomList.length > 0 ? "#d32f2f" : "transparent",
        borderRadius: "15px",
        transition: "all .5s ease",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">List of Rooms</Typography>
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
              <TableCell>Room ID *</TableCell>
              <TableCell>Max Capacity *</TableCell>
              <TableCell title="Clear All">
                <Button
                  fullWidth
                  onClick={deleteAllRoomList}
                  sx={{
                    display: roomList.length > 0 ? "flex" : "none",
                  }}
                >
                  <HighlightOffRoundedIcon fontSize="medium" />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.map((row) => (
              <RoomTableRow key={row.uuid} row={row} />
            ))}
          </TableBody>
        </Table>
        <Box sx={{ paddingTop: "2%" }} id={"room-continue"}>
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
      <IconButton
        title={"Scroll to bottom"}
        className="scroll-up"
        onClick={executeScrollUp}
      >
        <KeyboardArrowUpRoundedIcon color={"info"} />
      </IconButton>
      <IconButton
        title={"Scroll to top"}
        className="scroll-down"
        onClick={executeScrollDown}
      >
        <KeyboardArrowDownRoundedIcon color={"info"} />
      </IconButton>
    </Box>
  );
}
