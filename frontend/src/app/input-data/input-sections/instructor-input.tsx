import {
  Box,
  Button,
  FilledInput,
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

function InstructorTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name *</TableCell>
            <TableCell>Last Name *</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                fullWidth
                required
                variant="filled"
                placeholder="First Name"
                type="text"
              />
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                required
                variant="filled"
                placeholder="Last Name"
                type="text"
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
          Add an instructor
        </Button>
      </Box>
    </TableContainer>
  );
}

export default function InstructorInput() {
  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Typography variant="h4">List of Instructors</Typography>
      <Typography variant="body1">
        A short description about what type of data goes here.
      </Typography>
      <br />
      <InstructorTable />
    </Box>
  );
}
