import {
  Box,
  Button,
  FilledInput,
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
                variant="filled"
                placeholder="Room ID"
                type="text"
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
      <RoomTable />
    </Box>
  );
}