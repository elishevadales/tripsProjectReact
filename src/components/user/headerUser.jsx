import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ConfirmPopUp from '../general/confirmPopUp';
import { updateUserInfo, updateNotification } from '../reducer/userInfoSlice';
import { API_URL, TOKEN_NAME, doApiGet } from '../../services/apiService';
import StyledBadge from '@mui/material/Badge';
import Notification from '../general/notification/notification';
import Avatar from '@mui/material/Avatar';

// mui:
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


const HeaderUser = (props) => {

    const userInfo = useSelector((myStore) =>
        myStore.userInfoSlice
    )

    // mui code:

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const privateMenu = [
        { title: 'איזור אישי', path: `/${userInfo.user.role}/myInfo` },
        { title: 'פרופיל', path: `/${userInfo.user.role}/profile` },
    ]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //   my code:

    const [notifications, setNotifications] = useState(false)
    const [showLogOutPopup, setShowLogOutPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch();




    const checkNotification = async () => {
        let url = API_URL + `/users/chackJoinRequest`;
        try {

            let resp = await doApiGet(url);
            setNotifications(resp.data)
            dispatch(updateNotification({ notification: resp.data }));

        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }
    }


    const handleNotificationClose = () => {
        setShowNotification(false);
    };


    useEffect(() => {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) {
            nav('/')
        }
        else {
            doApiMyInfo();

        }
        props.socket.on("new-notification", notification => {
            setNotifications(true)
            setShowNotification(true)
            dispatch(updateNotification({ notification: true }));
        })

        return () => {
            props.socket.off("new-notification");
        };
    }, [props.socket])


    const handleLogOutClick = () => {
        setShowLogOutPopup(true)
    }
    const handleConfirmLogout = () => {

        localStorage.removeItem(TOKEN_NAME);
        dispatch(updateUserInfo({
            update: {}
        }))
        setShowLogOutPopup(false)
        nav('/')
    }
    const handleCancelLogout = () => {
        setShowLogOutPopup(false)
    }

    const doApiMyInfo = async () => {
        let url = API_URL + "/users/myInfo";
        try {
            let resp = await doApiGet(url);
            console.log("my info:", resp.data);
            await dispatch(updateUserInfo({
                update: resp.data

            }))
            props.socket.emit("user", resp.data._id)
            checkNotification()
        }
        catch (err) {
            console.log(err);
            alert("there is a problem ,try again later")
        }

    }

    const onClickLogo = () => {
        nav(`/${userInfo.user.role}/events`)
    }

    return (
        <header className='p-0 m-0'>
            <AppBar className='container-fluid m-0 py-2 px-0'
                style={{
                    boxShadow: "-4px 7px 13px -2px rgba(0,0,0,0.75)",
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: "blur(20px)",
                }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>



                        {/* logo LG */}
                        <IconButton onClick={onClickLogo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                            <i className='fa fa-car' aria-hidden='true' style={{ color: "rgb(35, 140, 156)", fontSize: '28px' }}></i>
                        </IconButton>
                        <Typography
                            onClick={onClickLogo}
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 1,
                                display: { xs: 'none', md: 'flex' },
                                color: 'rgb(35, 140, 156)',
                                textDecoration: 'none',
                                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                fontSize: "32px"
                            }}
                        >
                            trips
                        </Typography>




                        {/* bureger icon */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon style={{ fontSize: "32px", color: "rgb(35, 140, 156)" }} />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {props.links.map((link) => (
                                    <MenuItem key={link.title} onClick={() => { handleCloseNavMenu(); nav(link.path) }}>
                                        <Typography textAlign="center">
                                            <span style={{ color: "rgb(35, 140, 156)" }} >{link.title}</span>

                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>



                        {/* logo mobile */}
                        <IconButton onClick={onClickLogo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                            <i className='fa fa-car' aria-hidden='true' style={{ color: "rgb(35, 140, 156)", fontSize: '28px' }}></i>
                        </IconButton>
                        <Typography
                            onClick={onClickLogo}
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 1,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                color: 'rgb(35, 140, 156)',
                                textDecoration: 'none',
                                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                fontSize: "32px"
                            }}
                        >
                            trips
                        </Typography>


                        {/* menu LG */}
                        <Box className='justify-content-end ms-4' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {props.links.map((link, i) => (
                                <span className='my-2 mx-3' key={i} style={{ color: "rgb(35, 140, 156)", fontSize: "18px", cursor: "pointer" }} onClick={() => { handleCloseNavMenu(); nav(link.path) }}>{link.title}</span>


                            ))}
                        </Box>


                        {/* avatar */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {
                                        userInfo.notifications &&
                                        <StyledBadge color="error" overlap="circular" badgeContent=" " anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant="dot" >
                                            <Avatar variant="soft" color="neutral" src={userInfo?.user?.profile_image} style={{ boxShadow: '0 4px 8px rgba(137,137,137,0.75)' }} />
                                        </StyledBadge>
                                    }
                                    {
                                        !userInfo.notifications &&
                                        <Avatar variant="soft" color="neutral" src={userInfo?.user?.profile_image} />
                                    }
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                             
                                    <Typography  className='text-center px-2'>
                                        <span style={{ color: "grey" }} >{userInfo.user.name}</span>
                                    </Typography>
                               
                                    <Typography  className='text-center p-2' style={{borderBottom:"solid grey 1px"}}>
                                        <span style={{ color: "grey" }} >{userInfo.user.email}</span>
                                    </Typography>
                                {
                                    privateMenu.map((link, i) => (
                                        <MenuItem key={i} onClick={() => { handleCloseUserMenu(); nav(link.path) }}>
                                            <Typography textAlign="center">
                                                <span style={{ color: "rgb(35, 140, 156)" }} >{link.title}</span>
                                            </Typography>
                                        </MenuItem>
                                    ))

                                }
                                <MenuItem>
                                    <button onClick={() => { handleCloseUserMenu(); handleLogOutClick() }} className='btn text-white' style={{ background: '#077F7A', width: "100%" }}>יציאה</button>
                                </MenuItem>


                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {showNotification && (
                <Notification
                    message="קיבלת בקשת הצטרפות חדשה לאירוע שלך"
                    onClose={handleNotificationClose}
                />
            )}



            <Outlet />
            {showLogOutPopup && (
                <ConfirmPopUp
                    show={showLogOutPopup}
                    message={"האם אתה בטוח שברצונך לצאת מהמערכת?"}
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />
            )}

        </header>
    )
}

export default HeaderUser