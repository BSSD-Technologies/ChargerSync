import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ExportModal(props: ExportModalProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle>
        <Typography variant="h5">Export Options</Typography>
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup defaultValue="full">
            <FormControlLabel
              value="full"
              control={<Radio />}
              label="Export Full Schedule"
            />
            <FormControlLabel
              value="department"
              control={<Radio />}
              label="Filter by Department"
            />
            <FormControlLabel
              value="room"
              control={<Radio />}
              label="Filter by Room"
            />
            <FormControlLabel
              value="instructor"
              control={<Radio />}
              label="Filter by Instructor"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <DialogActions>
          <LoadingButton
            variant="contained"
            color="success"
            loading={false}
            fullWidth
            sx={{
              paddingLeft: "15px",
            }}
          >
            <span>Export</span>
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
