import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGlobalIncompleteStore } from "@/app/_stores/store";
import { UseGenerateIncompletes } from "@/app/_hooks/apiHooks";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "course", headerName: "Course", minWidth: 150 },
  { field: "days", headerName: "Days", minWidth: 100 },
  { field: "start", headerName: "Start Time", minWidth: 120 },
  { field: "end", headerName: "End Time", minWidth: 120 },
  { field: "location", headerName: "Location", minWidth: 150 },
  { field: "instructor", headerName: "Instructor", minWidth: 300 },
];

export default function IncompleteReport() {
  /** Incomplete list store */
  const [incompleteList, setIncompleteList] = [
    useGlobalIncompleteStore((state) => state.incompleteList),
    useGlobalIncompleteStore((state) => state.setIncompleteList),
  ];

  useEffect(() => {
    /** API call for /generate/incompletes */
    const generateIncompletes = async () => {
      const getData = await UseGenerateIncompletes();
      if (getData) {
        setIncompleteList(getData);
      }
    };
    generateIncompletes();
  }, []);

  return (
    <Container
      sx={{
        marginTop: "2%",
      }}
    >
      <Typography variant="h5">Schedule Incompletes</Typography>
      <Typography variant="body1">
        Insert a description about the incompletes in the scheduler.
      </Typography>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={incompleteList}
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
        <span>Export Incompletes</span>
      </LoadingButton>
    </Container>
  );
}
