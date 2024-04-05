import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGlobalConflictStore } from "@/app/_stores/store";
import { UseGenerateConflicts } from "@/app/_hooks/apiHooks";
import { useEffect } from "react";
import { FormattedSection } from "@/app/_types/Section";

const columns: GridColDef[] = [
  { field: "course", headerName: "Course", minWidth: 150 },
  { field: "days", headerName: "Days", minWidth: 100 },
  { field: "start", headerName: "Start Time", minWidth: 120 },
  { field: "end", headerName: "End Time", minWidth: 120 },
  { field: "location", headerName: "Location", minWidth: 150 },
  { field: "instructor", headerName: "Instructor", minWidth: 300 },
];

export default function ConflictReport() {
  /** Conflict list store */
  const [conflictList, setConflictList] = [
    useGlobalConflictStore((state) => state.conflictList),
    useGlobalConflictStore((state) => state.setConflictList),
  ];

  useEffect(() => {
    /** API call for /generate/conflicts */
    const generateConflicts = async () => {
      const getData = await UseGenerateConflicts();
      if (getData) {
        setConflictList(getData);
      }
    };
    generateConflicts();
  }, []);

  return (
    <Container
      sx={{
        marginTop: "2%",
      }}
    >
      <Typography variant="h5">Schedule Conflicts</Typography>
      <Typography variant="body1">
        Insert a description about the conflicts in the scheduler.
      </Typography>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={conflictList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            borderRadius: "10px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "grey",
              color: "white",
              borderRadius: "10px",
            },
          }}
        />
      </Box>
      <LoadingButton
        variant="contained"
        color="success"
        loading={false}
        fullWidth
        startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
        sx={{
          paddingLeft: "15px",
        }}
      >
        <span>Export Conflicts</span>
      </LoadingButton>
    </Container>
  );
}
