import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const SignUp = () => {
  const clientId = process.env.COGNITO_CLIENT_KEY
  const linkToSignIn = "http://campfire518.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=" + clientId + "&redirect_uri=http://localhost:3000/Newsfeed"
  console.log('Client Key:', clientId)
  console.log('Page to Route to :', linkToSignIn)
  return (
    <div>
      <a href={linkToSignIn} class="button">Go to Login Page</a>
    </div>
  )
};

export default SignUp;