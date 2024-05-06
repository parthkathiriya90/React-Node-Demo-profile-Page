import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Alert, Box, Button, Collapse, Container, Grid, IconButton, InputAdornment, Paper, TextField, styled } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from './auth/AuthProvider';
import { clearError } from '../features/crud/userSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// Define validation schema using Yup
const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Must be a valid email address'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const value = useAuth();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (value.error.isError && value.error.location === 'login') {
            setOpen(true);
        }
    }, [value.error]);

    const onSubmit = (data) => {
        value.login(data);
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
            <Grid container justifyContent="center" alignItems="center" minHeight="90vh" >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Item >
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={open}>
                                <Alert severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={handleAlert}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {value?.error?.message}
                                </Alert>
                            </Collapse>
                        </Box>
                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1>User Login</h1>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        margin="dense"
                                        required
                                        fullWidth
                                        label="Email"
                                        variant="standard"
                                        {...register("email")}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                    <Box textAlign='end' sx={{ mt: 1 }}>
                                        <Link to="/forgot-password">
                                            Forgot password?
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box>
                                <Button variant="outlined" type="submit" sx={{ mt: 5 }}>Login</Button>
                            </Box>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </>
    );
}
