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

function ResetPassword() {
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" minHeight="90vh" >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Item >
                        <Box textAlign="start" sx={{ mb: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Reset Password
                            </Typography>

                            <Typography variant="body2" gutterBottom sx={{ my: 3 }}>
                                Please enter your new password below. Make sure it's strong and secure to keep your account safe.
                            </Typography>
                        </Box>

                        <Box sx={{ my: 3 }}>
                            <Box sx={{ my: 3 }}>
                                <TextField id="outlined-basic" label="New password" variant="outlined" fullWidth />
                            </Box>
                            <Box sx={{ my: 3 }}>
                                <TextField id="outlined-basic" label="Confirm new password" variant="outlined" fullWidth />
                            </Box>
                        </Box>

                        <Box>
                            <Button variant="contained" fullWidth>reset password</Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid >
        </>
    )
}

export default ResetPassword