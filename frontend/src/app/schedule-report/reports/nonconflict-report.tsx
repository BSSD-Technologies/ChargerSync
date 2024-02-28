import { LoadingButton } from "@mui/lab";
import { Container, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export default function NonConflictReport() {
  return (
    <Container
      sx={{
        marginTop: "2%",
        paddingBottom: "10%",
      }}
    >
      <Typography variant="h5">Schedule Non-Conflicts</Typography>
      <Typography variant="body1">
        Insert a description about the non-conflicts in the scheduler.
      </Typography>
      <ul>
        <li>Non-Conflict 1</li>
        <li>Non-Conflict 2</li>
        <li>Non-Conflict 3</li>
      </ul>
      <LoadingButton
        variant="contained"
        color="success"
        loading={false}
        fullWidth
        startIcon={<DownloadRoundedIcon sx={{ marginLeft: "5px" }} />}
        sx={{
          paddingLeft: "15px",
        }}
      >
        <span>Export Non-Conflicts</span>
      </LoadingButton>
    </Container>
  );
}
