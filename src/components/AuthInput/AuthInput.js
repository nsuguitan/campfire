import { TextField } from "@mui/material";
import './AuthInput.css'


const AuthInput = (props) => {
  return (
    <TextField
      className='authText'
      sx={{ marginBottom: "10px", 
        border: '1px solid var(--campfire-gray)',
        backgroundColor: 'var(--campfire-dark-gray)',  
        color: 'white'
      }}
      label={props.label}
      name={props.name}
      value={props.value}
      size="small"
      onChange={props.onChange}
      color={props.color}
    />
  );
};

export default AuthInput;
