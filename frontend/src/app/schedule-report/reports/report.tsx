"use client";

import LoadingAnimation from '@/app/_components/loading';
import { useGlobalScheduleStore } from '@/app/_stores/store';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';

const columns: GridColDef[] = [
  { field: 'course', headerName: 'Course', editable: true },
  { field: 'days', headerName: 'Days', editable: true },
  { field: 'start', headerName: 'Start Time', editable: true },
  { field: 'end', headerName: 'End Time', editable: true },
  { field: 'location', headerName: 'Location', editable: true },
  { field: 'instructor', headerName: 'Instructor', editable: true },
];

export default function Report() {
  const [sectionList] = [
    useGlobalScheduleStore((state) => state.sectionList),
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <LoadingAnimation />
      <DataGrid
        rows={sectionList}
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
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: "grey",
            color: "white",
            borderRadius: "10px"
          },
        }}
      />
    </Box>
  );
}