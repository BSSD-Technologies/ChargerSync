"use client";

import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  gridClasses,
} from "@mui/x-data-grid";
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
  }, [setIncompleteList]);

  return (
    <Box>
      <Typography variant="body1">
        Incomplete sections are sections that were assigned a time period, but
        were not able to be assigned either a location, instructor, or both.
        Note that incomplete sections are still included in the generated
        schedule, given that more resources could resolve this issue (e.g. more
        rooms or more instructors).
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
