import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaHeart,
  FaSearch,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaDashcube, FaUsersViewfinder } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserDashboard from "../userdDashboard/UserDashboard";
import { convertFromBase64 } from "../profile/photo/Photos";
import useStore from "../../../store";

import TokenService from "../../token/tokenService";
import { useGetMemberDetails } from "../../api/User/useGetProfileDetails";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../App";

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: "Outfit sans-serif",
  },
});

const UserNavBar = () => {
  const { profileImage, firstName, setFirstName, setProfileImage } = useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigation = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const registerNo = TokenService.getRegistrationNo();

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useGetMemberDetails(registerNo);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      if (userProfile.profileImage) {
        const url = convertFromBase64(userProfile.profileImage);
        setImageUrl(url);
        setProfileImage(url);
      }
    }
  }, [userProfile, setFirstName, setProfileImage]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigation("/");
    setAnchorEl(null);
    TokenService.removeToken();
    window.dispatchEvent(new Event("storage"));
  };

  const handleDashboardClick = () => {
    navigation("/user/userdashboard");
  };

  const handleProfileClick = () => {
    navigation("/user/profile");
  };

  const handleMatchesClick = () => {
    navigation("/user/MyMatches");
  };

  const handleInterestClick = () => {
    navigation("/user/myintrest");
  };

  const handleViewAllClick = () => {
    navigation("/user/viewAll");
  };

  const handleSearchClick = () => {
    navigation("/user/search");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {/* Navbar */}
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              background: "#1a4f72",
              height: "60px",
            }}
          >
            <Toolbar sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleSidebar}
              >
                <FaBars />
              </IconButton>
            
            <Box sx={{textAlign:"left" ,width:"100%"}}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                >
                  Girija❤️Kalyana
                </Typography>
              </Link>
              </Box>

              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Typography
                  color="#fff"
                  fontFamily={"Outfit sans-serif"}
                  fontSize={"20px"}
                  marginRight={"10px"}
                  textTransform={"capitalize"}
                >
                  {userProfile?.first_name}
                </Typography>
                <Avatar
                  src={imageUrl || profileImage}
                  alt={firstName}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {!imageUrl && !profileImage && firstName?.[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant="persistent"
            open={isSidebarOpen}
            sx={{
              width: isSidebarOpen ? drawerWidth : 0,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: isSidebarOpen ? drawerWidth : 0,
                boxSizing: "border-box",
                background: "#1a4f72",
                color: "#fff",
                transition: "width 0.6s ease, opacity 0.6s ease",
                opacity: isSidebarOpen ? 1 : 0,
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem>
                  <Box sx={{ textAlign: "center", py: 0 }}>
                    {/* <Avatar
                      src={imageUrl || profileImage}
                      alt={firstName}
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        mb: 2,
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {!imageUrl && !profileImage && firstName?.[0]}
                    </Avatar> */}
                    <Typography
                      variant="h5"
                      marginLeft={2}
                      textTransform={"capitalize"}
                    >
                      {userProfile?.first_name}
                    </Typography>
                  </Box>
                </ListItem>
                {[
                  {
                    text: "Dashboard",
                    icon: <FaDashcube />,
                    onClick: handleDashboardClick,
                  },
                  {
                    text: "Profile",
                    icon: <FaUser />,
                    onClick: handleProfileClick,
                  },
                  {
                    text: "My Matches",
                    icon: <FaUsers />,
                    onClick: handleMatchesClick,
                  },
                  {
                    text: "My Interest",
                    icon: <FaHeart />,
                    onClick: handleInterestClick,
                  },
                  {
                    text: "View All",
                    icon: <FaUsersViewfinder />,
                    onClick: handleViewAllClick,
                  },
                  {
                    text: "Search",
                    icon: <FaSearch />,
                    onClick: handleSearchClick,
                  },
                  {
                    text: "Logout",
                    icon: <FaSignOutAlt />,
                    onClick: handleLogout,
                  },
                ].map((item, index) => (
                  <ListItem button key={index} onClick={item.onClick}>
                    <Button
                      variant="text"
                      startIcon={item.icon}
                      sx={{
                        color: "#fff",
                        fontSize: "1.2rem",
                        textTransform: "capitalize",
                        marginLeft: "10px",
                        gap: "10px",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "#fff",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginTop: 1,
              paddingLeft: isSidebarOpen ? `30px` : "20px",
              transition: "padding-left 0.4s ease",
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
          {isLoading && <LoadingComponent />}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UserNavBar;
