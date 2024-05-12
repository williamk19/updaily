import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuthStore from 'store/useAuthStore';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { showPassword, toggleShowPassword, setAuthTabIndex } = useAuthStore(
    (state) => ({
      showPassword: state.showPassword,
      toggleShowPassword: state.toggleShowPassword,
      setAuthTabIndex: state.setAuthTabIndex,
    }),
  );

  const handleSubmitRegister = async (data) => {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      setAuthTabIndex(0);
      reset();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)}>
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
          {...register('email', {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          })}
        />
        <TextField
          id='password'
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={toggleShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', { required: true, minLength: 8 })}
        />
        <TextField
          id='confirm-password'
          name='confirm-password'
          label='Confrim Password'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          {...register('confirm-password', { required: true, minLength: 8 })}
        />
        <Button
          type='submit'
          sx={{
            marginTop: 1,
          }}
          variant='outlined'
          fullWidth>
          Register
        </Button>
      </Box>
    </form>
  );
};

export default Register;
