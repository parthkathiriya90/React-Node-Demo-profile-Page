import { Grid } from '@mui/material'
import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            {/* <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <User />
                </Grid>

                <Grid item md={8} xs={12}>
                    <UserList />
                </Grid>
            </Grid> */}
        </>
    )
}

export default Layout