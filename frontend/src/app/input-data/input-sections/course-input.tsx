import {
  Box,
  Button,
  Input,
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
import NumberInput from "@/app/_components/NumberInput";

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
              <NumberInput placeholder="Max Enrollment" min={1} />
            </TableCell>
            <TableCell>
              <NumberInput placeholder="Preliminary Enrollment" min={1} />
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
