"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import {
  useGlobalCourseListStore,
  useGlobalInstructorListStore,
  useGlobalPeriodListStore,
  useGlobalPreferenceListStore,
  useGlobalRoomListStore,
} from "@/app/_stores/store";
import { UseGenerateSchedule } from "@/app/_hooks/apiHooks";

export default function SubmitInput() {
  const [courseList] = [useGlobalCourseListStore((state) => state.courseList)];
  const [roomList] = [useGlobalRoomListStore((state) => state.roomList)];
  const [fullPeriodList] = [useGlobalPeriodListStore((state) => state.fullPeriodList)];
  const [instructorList] = [
    useGlobalInstructorListStore((state) => state.instructorList),
  ];
  const [coursePrefList, periodPrefList] = [
    useGlobalPreferenceListStore((state) => state.coursePrefList),
    useGlobalPreferenceListStore((state) => state.periodPrefList),
  ];

  const testFunction = async () => {
    await UseGenerateSchedule(courseList, roomList, fullPeriodList, instructorList, coursePrefList, periodPrefList);
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">Generate Schedule</Typography>
          <Typography variant="body1">
            Click here to generate a schedule based on the data you provided.
          </Typography>
        </Stack>
        <LoadingButton onClick={testFunction}>Test</LoadingButton>
        <Link passHref href="/schedule-report">
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            startIcon={<SendRoundedIcon />}
            sx={{
              paddingLeft: "15px",
            }}
          >
            <span>Generate</span>
          </LoadingButton>
        </Link>
      </Grid>
    </Box>
  );
}
