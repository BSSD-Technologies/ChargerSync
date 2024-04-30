"use client";


import { Container, Typography } from "@mui/material";

import "@/style/globals.css"

export default function HelpManual() {
  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <div
        className="help-style"
      >
        <Typography variant="h4">Generating a schedule by uploading a template file.</Typography>
        <iframe src="https://scribehow.com/embed/Basic_Runthrough__DYAlNZjmQDinRoKNuojvOw?skipIntro=true" width="100%" height="640" allowfullscreen frameborder="0"></iframe>
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Generating a schedule by manually entering data.</Typography>
        {/* replace with iframe */}
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Downloading your currently entered data.</Typography>
        {/* replace with iframe */}
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Sorting and filtering schedule results</Typography>
        {/* replace with iframe */}
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Exporting results.</Typography>
        {/* replace with iframe */}
      </div>
    </Container>
  );
}
