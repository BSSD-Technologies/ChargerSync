"use client";


import { Container, Typography } from "@mui/material";

export default function HelpManual() {
  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Typography variant="h4">Generating a schedule by uploading a template file.</Typography>
      <div>
        <iframe src="https://scribehow.com/embed/Generate_a_schedule_using_the_file_upload_method___zekdW9XQxKDHy2pxF7kTg?skipIntro=true" width="100%" height="640" allowFullScreen frameBorder="0"></iframe>
      </div>
    </Container>
  );
}