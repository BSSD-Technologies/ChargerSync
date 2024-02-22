import {
  Box,
  Button,
  OutlinedInput,
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

function RoomTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room ID *</TableCell>
            <TableCell>Max Capacity *</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                fullWidth
                required
                variant="outlined"
                placeholder="Room ID"
                type="text"
              />
            </TableCell>
            <TableCell>
              <OutlinedInput
                fullWidth
                required
                inputComponent={"input"}
                inputProps={{
                  type: "number",
                  min: 1,
                  placeholder: "Max Capacity",
                }}
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
          Add a room
        </Button>
      </Box>
    </TableContainer>
  );
}

export default function RoomInput() {
  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Typography variant="h4">List of Rooms</Typography>
      <Typography variant="body1">
        A short description about what type of data goes here.
      </Typography>
      <br />
      <RoomTable />
    </Box>
  );
}
