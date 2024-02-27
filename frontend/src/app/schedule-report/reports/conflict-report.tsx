import { Container, Typography } from "@mui/material";

export default function ConflictReport() {
  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Typography variant="h5">Schedule Conflicts</Typography>
      <Typography variant="body1">
        Insert a description about the conflicts in the scheduler.
      </Typography>
      <ul>
        <li>Conflict 1</li>
        <li>Conflict 2</li>
        <li>Conflict 3</li>
      </ul>
    </Container>
  );
}
