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
import { Outlet, useNavigate } from "react-router-dom";
import UserDashboard from "../userdDashboard/UserDashboard";
import { convertFromBase64 } from "../profile/photo/Photos";
import useStore from "../../../store";

const drawerWidth = 240;
// const user = "Ramesh V";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit sans-serif",
  },
});

const UserNavBar = () => {
  const {profileImage,firstName, setFirstName}=useStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigation = useNavigate();
  const [file, setFile] = useState("");

  const profileImg = localStorage.getItem("profileImg");
  // console.log("====!!!>", profileImg)
  useEffect(() => {
    if (profileImg) {
      try {
        
        const parsedProfileImg = JSON.parse(profileImg);
        if (parsedProfileImg.startsWith("data:image/")) {
          convertFromBase64(parsedProfileImg, "profileImg")
            .then((convertedFile) => {
              setFile(convertedFile); 
            })
            .catch((error) => {
              console.error("Error converting Base64 to File:", error.message);
            });
        } else {
          console.error("Invalid Base64 image format.");
        }
      } catch (error) {
        console.error("Error parsing profileImg from localStorage:", error.message);
      }
    }
  }, [profileImage]);
  
  const imageUrl = file ? URL.createObjectURL(file) : null;
  
  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName); // Update state with first name
    }
  }, [firstName]);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigation("/");
    setAnchorEl(null);
    localStorage.clear();
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
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <FaBars />
              </IconButton>

              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Girija❤️Kalyana
              </Typography>

              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Typography
                  color="#fff"
                  fontFamily={"Outfit sans-serif"}
                  fontSize={"20px"}
                  marginRight={"10px"}
                  textTransform={"capitalize"}
                >
                  {firstName}
                </Typography>
                {
                  <Avatar
                  src={imageUrl ? imageUrl : firstName}
                    alt={firstName}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />
                }
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
                <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
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
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <Typography
                      variant="h5"
                      marginLeft={2}
                      textTransform={"capitalize"}
                    >
                      {firstName}
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
        </Box>
      </ThemeProvider>
      {/* <UserDashboard/> */}
    </>
  );
};

export default UserNavBar;
