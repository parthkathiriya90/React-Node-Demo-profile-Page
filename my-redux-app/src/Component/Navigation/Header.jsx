import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../features/crud/userSlice';
import { useAuth } from '../auth/AuthProvider';
import { useDispatch } from 'react-redux';

export default function Header() {
    const value = useAuth();
    const dispatch = useDispatch();
    // const user = useSelector(getUser);
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        React redux demo
                    </Typography>
                    {value.isLogin ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link to='/profile' className='header-auth-button-link'> <MenuItem onClick={handleClose}>My account</MenuItem> </Link>
                                <Link to='/change-password' className='header-auth-button-link'> <MenuItem onClick={handleClose}> Change Password </MenuItem> </Link>
                                <Link to='/list' className='header-auth-button-link'> <MenuItem onClick={handleClose}> List </MenuItem> </Link>
                                <Link to='/login' className='header-auth-button-link'> <MenuItem onClick={() => {
                                    value.logout()
                                    handleClose()
                                }}>Log out</MenuItem> </Link>
                            </Menu>
                        </div>
                    ) : (
                        <>
                            <Link to='/login' className='header-button-link' ><Button color="inherit"> Login </Button> </Link>
                            <Link to='/register' className='header-button-link' > <Button color="inherit"> Register </Button></Link>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}