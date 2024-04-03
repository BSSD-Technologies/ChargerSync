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
  useGlobalScheduleStore,
} from "@/app/_stores/store";
import { UseGenerateSchedule } from "@/app/_hooks/apiHooks";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/app/_components/loading";
import { useState } from "react";

export default function SubmitInput() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);

  const [courseList] = [useGlobalCourseListStore((state) => state.courseList)];
  const [roomList] = [useGlobalRoomListStore((state) => state.roomList)];
  const [fullPeriodList] = [
    useGlobalPeriodListStore((state) => state.fullPeriodList),
  ];
  const [instructorList] = [
    useGlobalInstructorListStore((state) => state.instructorList),
  ];
  const [coursePrefList, periodPrefList] = [
    useGlobalPreferenceListStore((state) => state.coursePrefList),
    useGlobalPreferenceListStore((state) => state.periodPrefList),
  ];

  const [setSectionList] = [
    useGlobalScheduleStore((state) => state.setSectionList),
  ];

  const generateSchedule = async () => {
    setLoadingState(true);
    const getData = await UseGenerateSchedule(
      courseList,
      roomList,
      fullPeriodList,
      instructorList,
      coursePrefList,
      periodPrefList
    );
    if (getData) {
      setSectionList(getData);
      router.push("/schedule-report");
    }
    setLoadingState(true);
  };

  return (
    <Box
      sx={{
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <LoadingAnimation openState={loadingState} />
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="h4">Generate Schedule</Typography>
          <Typography variant="body1">
            Click here to generate a schedule based on the data you provided.
          </Typography>
        </Stack>
        <Link passHref href="/schedule-report">
          <LoadingButton
            variant="contained"
            color="success"
            loading={loadingState}
            startIcon={<SendRoundedIcon />}
            sx={{
              paddingLeft: "15px",
            }}
            onClick={generateSchedule}
          >
            <span>Generate</span>
          </LoadingButton>
        </Link>
      </Grid>
    </Box>
  );
}
