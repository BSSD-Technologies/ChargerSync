"use client";

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

// const rows = [
//   { id: 1, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 2, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 3, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 4, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 5, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 6, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 7, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
//   { id: 8, course: 'CS 100', days: 'MW', start: '8:00 AM', end: '9:20 AM', location: 'OKT N324', instructor: 'John Doe' },
// ];

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