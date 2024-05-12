import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { showPassword, toggleShowPassword, signInUser } = useAuthStore(
    (state) => ({
      showPassword: state.showPassword,
      toggleShowPassword: state.toggleShowPassword,
      signInUser: state.signInUser,
    }),
  );

  const handleSubmitLogin = async (data) => {
    const auth = getAuth();

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      console.log(result);
      signInUser(result.user.accessToken, result.user);
      navigate('/');
      reset();
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}>
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
        <Button
          type='submit'
          sx={{
            marginTop: 1,
          }}
          variant='outlined'
          fullWidth>
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default Login;
