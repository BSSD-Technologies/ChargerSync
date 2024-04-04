import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGlobalConflictStore } from "@/app/_stores/store";

const columns: GridColDef[] = [
  { field: "section", headerName: "Section", minWidth: 150 },
  { field: "days", headerName: "Days", minWidth: 100 },
  { field: "start", headerName: "Start Time", minWidth: 120 },
  { field: "end", headerName: "End Time", minWidth: 120 },
  { field: "location", headerName: "Location", minWidth: 150 },
  { field: "instructor", headerName: "Instructor", minWidth: 300 },
];

function ConflictTable() {
  return (
    <DataGrid
      rows={}
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
  );
}

export default function ConflictReport() {
  /** Conflict list store */
  const [conflictList] = [
    useGlobalConflictStore((state) => state.conflictList),
  ];

  /** API call for /generate/conflicts */

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
        <ConflictTable />
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
