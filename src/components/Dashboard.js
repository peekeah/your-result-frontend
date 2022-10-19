import React, {useState} from 'react';
import LoginForm from './LoginForm';
import { Box } from '@mui/material';
import { SignupForm } from './SignupForm';
export const Dashboard = () => {
  const [login, toggleLogin] = useState(true);
  return (
    <Box>
    {login? 
        <LoginForm toggleLogin={toggleLogin}/> : <SignupForm toggleLogin={toggleLogin}/>
    }
    </Box>
  )
}
