import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  clearError,
  newUser,
} from '../features/crud/userSlice';
import { Alert, Box, Button, Collapse, Container, Grid, IconButton, InputAdornment, Paper, TextField, styled } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/crud/userAPI';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Define validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  mobile: yup.string().required('Mobile is required').matches(/^\+\d{12}$/, 'Must be a valid mobile number'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
});

export default function Register() {
  const navigate = useNavigate();
  const value = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (value.error.isError && value.error.location === 'register') {
      setOpen(true);
    }

    if (!value.error.isError && value.error.location === 'register') {
      dispatch(clearError());
      navigate('login')
    }
  }, [value.error]);

  const onSubmit = async (data) => {
    dispatch(addUser(data));
  };

  const handleAlert = () => {
    dispatch(clearError());
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" minHeight="90vh" spacing={2} sx={{ my: 2 }} >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Item >
            <Box sx={{ width: '100%' }}>
              <Collapse in={open}>
                <Alert severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleAlert()
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {value.error.message}
                </Alert>
              </Collapse>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h1>User Registration</h1>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="firstName" margin="dense" required fullWidth label="First Name" variant="standard" name="firstName" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="lastName" margin="dense" required fullWidth label="Last Name" variant="standard" name="lastName" {...register("lastName")} error={!!errors.lastName} helperText={errors.lastName?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="email" margin="dense" required fullWidth label="Email" variant="standard" name="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="mobile" margin="dense" required fullWidth label="Mobile" variant="standard" name="mobile" {...register("mobile")} error={!!errors.mobile} helperText={errors.mobile?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="password"
                    margin="dense"
                    required
                    fullWidth
                    label="Password"
                    variant="standard"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="confirmPassword"
                    margin="dense"
                    required
                    fullWidth
                    label="Confirm password"
                    variant="standard"
                    name="confirmPassword"
                    type={'password'}
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="city" margin="dense" required fullWidth label="City" variant="standard" name="city" {...register("city")} error={!!errors.city} helperText={errors.city?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="state" margin="dense" required fullWidth label="State" variant="standard" name="state" {...register("state")} error={!!errors.state} helperText={errors.state?.message} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField id="country" margin="dense" required fullWidth label="Country" variant="standard" name="country" {...register("country")} error={!!errors.country} helperText={errors.country?.message} />
                </Grid>
              </Grid>

              <Button variant="outlined" type="submit" sx={{ mt: 5 }}>Add user</Button>
            </Box>
          </Item>
        </Grid >
      </Grid >
    </>
  );
}
