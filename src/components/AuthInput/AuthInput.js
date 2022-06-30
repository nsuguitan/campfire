import { TextField } from "@mui/material";
const AuthInput = (props) => {
  return (
    <TextField
      fullWidth
      sx={{ marginBottom: "10px" }}
      label={props.label}
      name={props.name}
      value={props.value}
      size="small"
      variant="outlined"
      onChange={props.onChange}
    />
  );
};

export default AuthInput;
