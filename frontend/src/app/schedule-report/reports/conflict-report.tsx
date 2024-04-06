import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGlobalConflictStore } from "@/app/_stores/store";
import { UseGenerateConflicts } from "@/app/_hooks/apiHooks";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "course", headerName: "Course" },
  { field: "days", headerName: "Days" },
  { field: "start", headerName: "Start Time" },
  { field: "end", headerName: "End Time" },
  { field: "location", headerName: "Location" },
  { field: "instructor", headerName: "Instructor" },
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
    <Box>
      <Typography variant="body1">
        Insert a description about the conflicts in the scheduler.
      </Typography>
      <br />
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
  );
}
