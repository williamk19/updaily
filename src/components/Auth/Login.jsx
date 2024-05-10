import { Box, Button, TextField } from '@mui/material';
import React from 'react';

const Login = () => {
  return (
    <Box
      sx={{
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
      <TextField
        id='email'
        name='email'
        label='Email'
        variant='outlined'
      />
      <TextField
        id='password'
        name='password'
        label='Password'
        type='password'
        variant='outlined'
      />
      <Button
        sx={{
          marginTop: 1,
        }}
        variant='outlined'
        fullWidth>
        Sign In
      </Button>
    </Box>
  );
};

export default Login;
