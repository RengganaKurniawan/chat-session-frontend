import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    { text: 'Status', icon: <NotificationsIcon />, link: "/status", isActive: false },
    { text: 'Favorite', icon: <FavoriteIcon />, link: "/favorite", isActive: false},
];

const bottomIcons = [
    { text: 'Settings', icon: <SettingsIcon /> },
];

function LeftNav() {
    const navigate = useNavigate();
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
                bgcolor: 'grey',
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
                                }}
                            >
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{ fontWeight: '600' }}
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
                    {middleIcon.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.25, 
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
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
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
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }} />
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
                                    }}
                                    // HANDLE TOKEN
                                    
                                    onClick={() => {
                                        localStorage.removeItem("user");
                                        navigate("/login")
                                    }}
                                    
                                >
                                    <LogoutIcon />
                                </IconButton>
                            ) : null
                        }
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.25,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Profile"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    transition: 'opacity 0.2s',
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