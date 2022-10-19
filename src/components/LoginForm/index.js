import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material';

function LoginForm() {
    return (
        <Box sx={{mt: '8%'}} >
        <Box sx={{display: 'flex', gap: 4, flexDirection: 'column', justifyContent: 'center',mx: 'auto', width: '30%' }}>
            <Typography variant="h3" mx="auto">Login</Typography>
            <TextField label="Email" variant="outlined" type="email" />
            <TextField label="Password" variant="outlined" type="password" />
            <Button variant="outlined">Outlined</Button>
        </Box>
        </Box>
    )
}

export default LoginForm;