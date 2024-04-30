"use client";

import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  gridClasses,
} from "@mui/x-data-grid";
import { useGlobalConflictStore } from "@/app/_stores/store";
import { UseGenerateConflicts } from "@/app/_hooks/apiHooks";
import { useEffect } from "react";

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
  }, [setConflictList]);

  return (
    <Box>
      <Typography variant="body1">
        Conflict sections are sections that were not able to be assigned a time
        period. Other assignments such as location or instructor may also be
        missing. Note that conflict sections are not included in the generated
        schedule.
      </Typography>
      <br />
      <Box
        sx={{
          height: 300,
          width: "100%",
          [`.${gridClasses.cell}.highlight`]: {
            backgroundColor: "#E57373",
          },
        }}
      >
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
