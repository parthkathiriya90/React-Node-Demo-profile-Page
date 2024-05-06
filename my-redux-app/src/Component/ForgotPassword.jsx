import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography?.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text?.secondary,
}));

function ForgotPassword() {
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" minHeight="90vh" >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Item >
                        <Box textAlign="start" sx={{ mb: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Forgot Password
                            </Typography>

                            <Typography variant="body2" gutterBottom sx={{ my: 3 }}>
                                Please enter the email address associated with your account below. We'll send you a link to reset your password.
                            </Typography>
                        </Box>

                        <Box sx={{ my: 3 }}>
                            <TextField id="outlined-basic" label="Enter email address" variant="outlined" fullWidth />
                        </Box>

                        <Box>
                            <Button variant="contained" fullWidth>Request reset link</Button>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Link to="/login" display="flex" justifyContent="center" alignItems="center" underline="none" color="inherit">
                                Back to Login
                            </Link>
                        </Box>
                    </Item>
                </Grid>
            </Grid >
        </>
    )
}

export default ForgotPassword