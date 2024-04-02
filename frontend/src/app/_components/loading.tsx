import Lottie from "lottie-react";
import groovyWalkAnimation from "./Animation - 1712038115019.json";
import { Stack, Typography } from "@mui/material";

const LoadingAnimation = () => {
  return (
    <Stack alignItems={"center"}>
      <Lottie animationData={groovyWalkAnimation} />
      <Typography variant="h6">Generating Schedule...</Typography>
    </Stack>
  );
};

export default LoadingAnimation;
