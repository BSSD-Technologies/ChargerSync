"use client";

import {
  Box,
  Button,
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

function TimeTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Start Time *</TableCell>
            <TableCell>End Time *</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
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
          Add a time block
        </Button>
      </Box>
    </TableContainer>
  );
}

export default function TimeInput() {
  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Typography variant="h4">List of Time Blocks</Typography>
      <Typography variant="body1">
        A short description about what type of data goes here.
      </Typography>
      <br />
      <TimeTable />
    </Box>
  );
}
