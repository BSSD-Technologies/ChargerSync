import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";

export interface NumberInputProps {
  placeholder: string;
  min?: number;
  max?: number;
}

export default function NumberInput(props: NumberInputProps) {
  return (
    <OutlinedInput
      fullWidth
      inputComponent={"input"}
      inputProps={{
        type: "number",
        min: props.min,
        max: props.max,
        placeholder: props.placeholder,
      }}
    />
  );
}