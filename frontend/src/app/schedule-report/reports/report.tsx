"use client";

import { useGlobalScheduleStore } from '@/app/_stores/store';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'course', headerName: 'Course', minWidth: 150 },
  { field: 'days', headerName: 'Days', minWidth: 100 },
  { field: 'start', headerName: 'Start Time', minWidth: 120 },
  { field: 'end', headerName: 'End Time', minWidth: 120 },
  { field: 'location', headerName: 'Location', minWidth: 150 },
  { field: 'instructor', headerName: 'Instructor', minWidth: 300 },
];

export default function Report() {
  const [sectionList] = [
    useGlobalScheduleStore((state) => state.sectionList),
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
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