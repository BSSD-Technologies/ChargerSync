import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useGlobalStore } from "@/app/_stores/store";
import { defaultCourse } from "@/app/_types/Course";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function ConditionalValidationGrid() {
  const columns: GridColDef[] = [
    {
      field: "department",
      headerName: "Course Department Number *",
      width: 160,
      editable: true,
    },
    {
      field: "course_num",
      headerName: "Course Number *",
      width: 120,
      editable: true,
    },
    {
      field: "max_enrollment",
      headerName: "Max Enrollment *",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "prelim_enrollment",
      headerName: "Preliminary Enrollment",
      type: "number",
      width: 140,
      editable: true,
      preProcessEditCellProps: (params) => {
        const maxEnrollProps = params.otherFieldsProps!.max_enrollment;
        const prelimEnrollProps = params.otherFieldsProps!.prelim_enrollment;
        if (prelimEnrollProps > maxEnrollProps) {
          return { ...params, error: true };
        } else {
          return { ...params, error: false };
        }
      },
    },
  ];

  /** Course list */
  const [courseList, addCourseList, deleteCourseList] = [
    useGlobalStore((state) => state.courseList),
    useGlobalStore((state) => state.addCourseList),
    useGlobalStore((state) => state.deleteCourseList),
  ];

  const [errorState, setErrorState] = useState();

  return (
    <div>
      <DataGrid
        rows={courseList}
        getRowId={(row) => row.uuid}
        columns={columns}
        editMode="row"
      />
      <Button
        onClick={() => {
          addCourseList({
            uuid: uuidv4(),
            department: "CS",
            course_num: "121",
            max_enrollment: 200,
          });
        }}
      >
        Add
      </Button>
    </div>
  );
}
