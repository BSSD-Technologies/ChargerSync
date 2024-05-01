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
        <br/>
        <iframe src="https://scribehow.com/embed/Basic_Runthrough__DYAlNZjmQDinRoKNuojvOw?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Generating a schedule by manually entering data.</Typography>
        <br/>
        <iframe src="https://scribehow.com/embed/Generating_a_schedule_by_manually_entering_data__OsCR8pfLSL6Xh0D6JzKojQ?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Downloading your currently entered data.</Typography>
        <br/>
        <iframe src="https://scribehow.com/embed/Downloading_your_currently_entered_data__sIqspiycQD-Y1feFFSdKAg?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">Filtering schedule results.</Typography>
        <br/>
        <iframe src="https://scribehow.com/embed/Sorting_and_filtering_schedule_results__SCTKJrWASl29PkoSCdz1Xw?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>

      <div
        className = "help-style"
      >
        <Typography variant="h4">How to export results.</Typography>
        <br/>
        <iframe src="https://scribehow.com/embed/Exporting_a_schedule__-mDblMv_Tb2DY1HNYShO_g?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>
    </Container>
  );
}
