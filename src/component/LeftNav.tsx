import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
    Box, 
    Drawer, 
    IconButton, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    styled, 
    Typography, 
    type CSSObject, 
    type Theme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { secureStorage } from "../utils/secureStorage";



const menuWidthOpen = 240;
const menuWidthClose = 60;

const openMenu = (theme: Theme): CSSObject => ({
    width: menuWidthOpen,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: 200
    }),
    overflowX: "hidden",
});

const closeMenu = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: 200
    }),
    overflowX: "hidden",
    width: `${menuWidthClose}px`,
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: menuWidthOpen,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openMenu(theme),
            '& .MuiDrawer-paper': openMenu(theme),
        }),
        ...(!open && {
            ...closeMenu(theme),
            '& .MuiDrawer-paper': closeMenu(theme),
        }),
    }),
);


const middleIcon = [
    { text: 'Home', icon: <HomeIcon />, link: "/", isActive: true },
    { text: 'Sessions', icon: <ChatIcon />, link: "/sessions", isActive: true },
    { text: 'Status', icon: <NotificationsIcon />, link: "/status", isActive: true },
    { text: 'Favorite', icon: <FavoriteIcon />, link: "/favorite", isActive: true},
];

const bottomIcons = [
    { text: 'Settings', icon: <SettingsIcon />, link: "/settings", isActive: true },
];

function LeftNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <StyledDrawer variant="permanent" open={open} anchor="left">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: '#1F2937',
            }}>
                {/* top */}
                <List sx={{ pt: 1 }}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleToggleDrawer}
                            sx={{
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.25,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{ fontWeight: '600', color: 'white' }}
                                    >
                                        Chat App
                                    </Typography>
                                }
                                sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

                {/* middle */}
                <List sx={{ flexGrow: 1, pt: 0  }}>
                    {middleIcon.map((item) => {
                    const isSelected = location.pathname === item.link;

                    return(
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={isSelected}
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.25,
                                    '&:hover': {
                                        bgcolor: 'rgba(59, 130, 246, 0.3)',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(59, 130, 246, 0.3)',
                                    },
                                }}
                                onClick={() => {
                                    if(item.isActive)
                                        navigate(item.link)
                                    }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s', color: 'white' }} />
                            </ListItemButton>
                        </ListItem>
                    )    
                })}
                </List>

                {/* bottom */}
                <List sx={{ pt: 2 }}>

                    {/* setting icon */}
                    {bottomIcons.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.25,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                                onClick={() => {
                                    if(item.isActive)
                                        navigate(item.link)
                                    }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s', color: 'white' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {/* profile and logout icon */}
                    <ListItem
                        key="Profile"
                        disablePadding
                        sx={{ display: 'block' }}
                        secondaryAction={
                            open ? (
                                <IconButton
                                    edge="end"
                                    aria-label="logout"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        transition: 'opacity 0.2s',
                                        mr: open ? 1.5 : 0,
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                    // HANDLE TOKEN
                                    
                                    onClick={() => {
                                        secureStorage.removeItem("user");
                                        secureStorage.removeItem("app_all_sessions");
                                        navigate("/login")
                                    }}
                                    
                                >
                                    <LogoutIcon />
                                </IconButton>
                            ) : null
                        }
                    >
                        <ListItemButton
                            onClick={() => navigate('/profile')}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.25,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Profile"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    transition: 'opacity 0.2s',
                                    color: 'white',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </StyledDrawer>
    )
}

export default LeftNav;