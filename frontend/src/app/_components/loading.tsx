import groovyWalkAnimation from "./Animation - 1712038115019.json";
import { Backdrop, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LoadingAnimation = (props: { openState: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.openState}
    >
      <Stack alignItems={"center"}>
        <Typography variant="h4">Generating Schedule...</Typography>
        <Lottie animationData={groovyWalkAnimation} />
      </Stack>
    </Backdrop>
  );
};

export default LoadingAnimation;
