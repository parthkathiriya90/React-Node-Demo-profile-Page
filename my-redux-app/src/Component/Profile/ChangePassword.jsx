import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box, Container, styled } from '@mui/system'
import React from 'react'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography?.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text?.secondary,
}));

function ChangePassword() {
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" minHeight="90vh" >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Item >
                        <Box textAlign="start" sx={{ mb: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Change Password
                            </Typography>
                            <Box textAlign="start">
                                <Typography variant="body2" gutterBottom textAlign="justify">
                                    Keep your account secure by updating your password regularly. Enter your current password and choose a new one below:
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ my: 3 }}>
                            <Box sx={{ my: 3 }}>
                                <TextField id="current-password" label="Current Password" variant="outlined" fullWidth />
                            </Box>
                            <Box sx={{ my: 3 }}>
                                <TextField id="new-password" label="New Password" variant="outlined" fullWidth />
                            </Box>
                            <Box sx={{ my: 3 }}>
                                <TextField id="confirm-password" label="Confirm New Password" variant="outlined" fullWidth />
                            </Box>
                        </Box>

                        <Box>
                            <Button variant="contained" fullWidth>Confirm Password Change</Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid >
        </>
    )
}

export default ChangePassword
