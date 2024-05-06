import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, CircularProgress, Grid, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation } from "react-router-dom";
import { verifyEmail } from '../features/crud/userAPI';
import { useDispatch } from 'react-redux';
import { useAuth } from './auth/AuthProvider';

const Item = styled(Paper)(({ theme, boxShadow }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography?.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text?.secondary,
    borderRadius: '10px',
    boxShadow: boxShadow || '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

function VerifyEmail() {
    const dispatch = useDispatch();
    const value = useAuth()
    const { search } = useLocation();
    const [isLoaded, setIsLoaded] = useState(true)
    const [boxShadow, setBoxShadow] = useState(null)
    const [isError, setIsError] = useState(false)
    const code = useMemo(() => new URLSearchParams(search), [search]).get('code');

    useEffect(() => {
        if (isLoaded) {
            dispatch(verifyEmail(code))
            setIsLoaded(false)
        }
    }, [code])

    useEffect(() => {
        if (value.error.location == 'verifyEmail') {
            if (!value.error.isError) {
                setIsError(false)
                setBoxShadow('0px 4px 10px rgb(40 110 9 / 67%);')
            } else {
                setIsError(true)
                setBoxShadow('0px 4px 10px rgb(234 16 16 / 56%);')
            }
        } else {
            setBoxShadow(undefined)
        }
    }, [value.error])

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="90vh" >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box sx={{ mx: 2 }}>
                    <Item boxShadow={boxShadow}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://source.unsplash.com/featured/100x100/?developer"
                            sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
                        />

                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Verify your email address
                            </Typography>
                        </Box>

                        <Box sx={{ my: 2 }}>
                            {value.error.location == 'verifyEmail' ?
                                !isError ? <Typography variant="body1" gutterBottom>
                                    Congratulations! Your email address has been successfully verified.
                                </Typography>
                                    :
                                    <Typography variant="body1" gutterBottom>
                                        Sorry, the token provided is invalid or has expired. Please try again or request a new verification email.
                                    </Typography>
                                : <CircularProgress />
                            }

                        </Box>

                        <Box >
                            <Link href="/login" display="flex" justifyContent="center" alignItems="center" underline="none" color="inherit">
                                <KeyboardBackspaceIcon /> Back to Login
                            </Link>
                        </Box>
                    </Item>
                </Box>
            </Grid>
        </Grid >
    );
}

export default VerifyEmail;
