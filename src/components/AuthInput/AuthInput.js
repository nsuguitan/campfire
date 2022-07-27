import { TextField } from "@mui/material";
const AuthInput = (props) => {
  return (
    <TextField
      fullWidth
      sx={{ marginBottom: "10px", 
        border: '1px solid var(--campfire-gray)',
        backgroundColor: 'var(--campfire-dark-gray)', 
        color: 'var(--campfire-white)' 
      }}
      label={props.label}
      name={props.name}
      value={props.value}
      size="small"
      onChange={props.onChange}
    />
  );
};

export default AuthInput;
