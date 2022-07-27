import { TextField } from "@mui/material";
import './AuthInput.css'

const AuthInput = (props) => {
  return (
    <TextField
      fullWidth
      className='authText'
      sx={{ marginBottom: "10px", 
        border: '1px solid var(--campfire-gray)',
        backgroundColor: 'var(--campfire-dark-gray)',  
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
