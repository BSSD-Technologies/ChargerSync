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

function CourseTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell>Max Enrollment</TableCell>
            <TableCell>Preliminary Enrollment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Course ID"
                type="text"
              />
            </TableCell>
            <TableCell>
              <OutlinedInput
                fullWidth
                inputComponent={"input"}
                inputProps={{
                  type: "number",
                  min: 1,
                  placeholder: "Max Enrollment",
                }}
              />
            </TableCell>
            <TableCell>
              <OutlinedInput
                fullWidth
                inputComponent={"input"}
                inputProps={{
                  type: "number",
                  min: 1,
                  placeholder: "Preliminary Enrollment",
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
          Add a course
        </Button>
      </Box>
    </TableContainer>
  );
}

export default function CourseInput() {
  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Typography variant="h4">List of Courses</Typography>
      <Typography variant="body1">
        A short description about what type of data goes here.
      </Typography>
      <br />
      <CourseTable />
    </Box>
  );
}
