import { Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, gridClasses } from "@mui/x-data-grid";
import { useGlobalIncompleteStore } from "@/app/_stores/store";
import { UseGenerateIncompletes } from "@/app/_hooks/apiHooks";
import { useEffect } from "react";

const columns: GridColDef[] = [
  { field: "course", headerName: "Course" },
  { field: "days", headerName: "Days" },
  { field: "start", headerName: "Start Time" },
  { field: "end", headerName: "End Time" },
  { field: "location", headerName: "Location" },
  { field: "instructor", headerName: "Instructor" },
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
    <Box>
      <Typography variant="body1">
        Insert a description about the incompletes in the scheduler.
      </Typography>
      <br />
      <Box
        sx={{
          height: 300,
          width: "100%",
          [`.${gridClasses.cell}.highlight`]: {
            backgroundColor: "#ffb74d",
          },
        }}
      >
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
          getCellClassName={(params: GridCellParams<any, any, number>) => {
            return params.value === "TBD" ? "highlight" : "";
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
    </Box>
  );
}
