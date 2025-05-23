import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { FaHome, FaUser, FaUsers, FaServer, FaReceipt, FaBars, FaChevronDown, FaChevronUp, FaDashcube, FaIdBadge } from 'react-icons/fa';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoIosNotifications } from 'react-icons/io';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Collapse, List, ListItem, ListItemText, IconButton, Typography, Menu, MenuItem, Avatar, Badge, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openUserManagement, setOpenUserManagement] = useState(false);
  const [openAssistanceService, setOpenAssistanceService] = useState(false);
  const [openPromoterManagement, setOpenPromoterManagement] = useState(false);
  const [openPromoterReceipts, setOpenPromoterReceipts] = useState(false);
  const [openPromoterReports, setOpenPromoterReports] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "123-456-7890",
    profilePicture: null,
  });
  const [activePath, setActivePath] = useState('');
  const location = useLocation();

  const navigate = useNavigate();
  const adminName = "Admin";
  
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/admin'); 
    }
    // Set active path based on current location
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle dropdown toggles
  const toggleUserManagement = () => {
    setOpenUserManagement(!openUserManagement);
  };

  const toggleAssistanceService = () => {
    setOpenAssistanceService(!openAssistanceService);
  };

  const togglePromoterManagement = () => {
    setOpenPromoterManagement(!openPromoterManagement);
  };
  const toggleReceiptsManagement = () => {
    setOpenPromoterReceipts(!openPromoterReceipts);
  };
  const toggleReportManagement = () => {
    setOpenPromoterReports(!openPromoterReports);
  };
  
  const navigateUserTable = () => {
    navigate('/admin/user-table');
  };
  const handleDashboard=()=>{
    navigate('/admin/dashboard');
  }
  const navigateUserUpgrade=()=>{
    navigate('/admin/userData');
  }
  
  const navigateRenewals=()=>{
    navigate('/admin/renewals');
  }
  const navigateresetpass=()=>{
    navigate('/admin/resetpass');
  }
  const navigateImageVerify=()=>{
    navigate('/admin/imageverify');
  }
  const navigatePendingdata=()=>{
    navigate('/admin/pendingdata');
  }
  const navigateSuccessdata=()=>{
    navigate('/admin/successdata');
  }
  const navigatePromoterdata=()=>{
    navigate('/admin/promotersdata');
  }
  const navigatePaytopromoters=()=>{
    navigate('/admin/paytopromoters');
  }
  const navigatePromotersEarn=()=>{
    navigate('/admin/promoterearn');
  }
  const navigatePromotersData=()=>{
    navigate('/admin/promoters');
  }
  const navigatePromotersUsers=()=>{
    navigate('/admin/promotersusers');
  }
  const navigateOnlineTransaction=()=>{
    navigate('/admin/onlinetransaction');
  }
  const navigateAssistanceData=()=>{
    navigate('/admin/assistance');
  }
  const navigateReceiptsvocher=()=>{
    navigate('/admin/receiptsvocher');
  }

  const navigateUserReports=()=>{
    navigate('/admin/userreports');
  }
  const navigateRenewalReports=()=>{
    navigate('/admin/renewalreports');
  }
  const navigateReceiptsReportsdata=()=>{
    navigate('/admin/receiptsreports');
  }
  const navigateNotification=()=>{
    navigate('/admin/notification');
  }
  
  // Check if a path is active
  const isActive = (path) => {
    return activePath === path;
  };

  // Profile dialog handlers
  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
const handleLogoutDialogOpen = () => {
  setLogoutDialogOpen(true);
  handleMenuClose(); // Close the profile menu
};

const handleLogoutDialogClose = () => {
  setLogoutDialogOpen(false);
};

const handleConfirmLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
  setLogoutDialogOpen(false);
};
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: URL.createObjectURL(file),
    }));
  };


  return (
    <div>
    <div className={`Dash-app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Navbar */}
      <nav className="Dashnavbar">
        <div className="Dashmenu">
          <IconButton onClick={toggleSidebar}>
            <FaBars style={{ color: '#fff', fontSize: '1.8rem' }} />
          </IconButton>
          <Link to="/"  style={{ textDecoration: "none", color: "inherit" }}><h2 className="navtxt">Admin Dashboard</h2></Link>
        </div>
        <div className="nav-right">
        <Badge color="error" variant="dot"  >
        <IoMdNotifications fontSize={40} cursor={'pointer'}/>
        </Badge>
         
        <IconButton onClick={handleMenuOpen}>
            <Avatar alt="Admin Profile" src="/path-to-profile-pic.jpg" style={{background:'black'}}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
      <MenuItem onClick={handleLogoutDialogOpen}>Logout</MenuItem>
          </Menu>
          <Typography style={{ color: '#fff', marginRight: '10px',fontSize:'22px',fontWeight:'bold',fontFamily:'Outfit sans-serif' }}>
            {adminName}
          </Typography>
         
        </div>
      </nav>
    </div>
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
          overflowY: 'auto',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          '&::-webkit-scrollbar': {
            display: 'none', 
          }
        }}>
          <List sx={{ width: '100%' }}>
          <ListItem
            onClick={handleProfileDialogOpen}
            sx={{ 
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: isActive('/admin/profile') ? '#1976d2' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('/admin/profile') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <CgProfile /> Profile
          </ListItem>

            <ListItem 
              onClick={handleDashboard} 
              sx={{ 
                cursor: 'pointer',
                padding: '14px',
                    borderRadius:'2px',
                backgroundColor: isActive('/admin/dashboard') ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/dashboard') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <FaDashcube/> Dashboard
            </ListItem>

            {/* User Management Dropdown */}
            <ListItem 
              button 
              onClick={toggleUserManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '10px',
              
              }}
            >
              <FaUser />
              <ListItemText primary="User Management" />
              {openUserManagement ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openUserManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%' }}>
                <ListItem 
                  button 
                  onClick={navigateUserTable}
                  sx={{
                  padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/user-table') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/user-table') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
 
                  }}
                >
                  <ListItemText primary="User" />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateUserUpgrade}
                  sx={{
                 padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/userData') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/userData') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="User Upgrade" />
                </ListItem>
     
                <ListItem 
                  button 
                  onClick={navigateRenewals}
                  sx={{
                  padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/renewals') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/renewals') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Renewal" />
                </ListItem>             
          
                <ListItem 
                  button 
                  onClick={navigateresetpass}
                  sx={{
                padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/resetpass') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/resetpass') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Password" />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateImageVerify}
                  sx={{
                   padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/imageverify') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/imageverify') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Image Verification" />
                </ListItem>
              </List>
            </Collapse>

            {/* Assistance Service Dropdown */}
            <ListItem 
              button 
              onClick={toggleAssistanceService}
              sx={{ 
                cursor: 'pointer',
                padding: '10px',
               
              }}
            >
              <FaServer />
              <ListItemText primary="Assistance Service" />
              {openAssistanceService ? <FaChevronUp /> : <FaChevronDown />}
           </ListItem>
            <Collapse in={openAssistanceService} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%' }}>
                <ListItem 
                  button 
                  onClick={navigatePendingdata}
                  sx={{
                   padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/pendingdata') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/pendingdata') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Pending" />
                </ListItem>
          
                <ListItem 
                  button 
                  onClick={navigateSuccessdata}
                  sx={{
                  padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/successdata') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/successdata') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Success" />
                </ListItem>
           
                <ListItem 
                  button 
                  onClick={navigatePromoterdata}
                  sx={{
                    padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/promotersdata') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/promotersdata') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Promoter User" />
                </ListItem>
              </List>
            </Collapse>

            {/* Promoter Management Dropdown */}
            <ListItem 
              button 
              onClick={togglePromoterManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '10px',
              
              }}
            >
              <FaUsers />
              <ListItemText primary="Promoter Management" />
              {openPromoterManagement ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openPromoterManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%' }}>
                <ListItem 
                  button 
                  onClick={navigatePromotersData}
                  sx={{
                   padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/promoters') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/promoters') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Promoters" />
                </ListItem>
             
                <ListItem 
                  button 
                  onClick={navigatePromotersUsers}
                  sx={{
               padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/promotersusers') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/promotersusers') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Promoter Users" />
                </ListItem>
              
                <ListItem 
                  button 
                  onClick={navigatePromotersEarn}
                  sx={{
                padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/promoterearn') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/promoterearn') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Promoter Earnings" />
                </ListItem>
      
                <ListItem 
                  button 
                  onClick={navigatePaytopromoters}
                  sx={{
                 padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/paytopromoters') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/paytopromoters') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Pay to Promoters" />
                </ListItem>
              </List>
            </Collapse>
           
             {/* Promoter Receipts Dropdown */}
            <ListItem 
              button 
              onClick={toggleReceiptsManagement}
              sx={{ 
                cursor: 'pointer',
                padding: '10px',
               
              }}
            >
              <FaReceipt />
              <ListItemText primary="Receipts" />
              {openPromoterReceipts ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openPromoterReceipts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%' }}>
                <ListItem 
                  button 
                  onClick={navigateOnlineTransaction}
                  sx={{
                  padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/onlinetransaction') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/onlinetransaction') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Online Transaction" />
                </ListItem>
       
                <ListItem 
                  button 
                  onClick={navigateAssistanceData}
                  sx={{
                   padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/assistance') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/assistance') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Assistance Online Transaction" />
                </ListItem>
               
                <ListItem 
                  button 
                  onClick={navigateReceiptsvocher}
                  sx={{
                padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/receiptsvocher') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/receiptsvocher') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Receipt Voucher" />
                </ListItem>
              </List>
            </Collapse>

               {/* Reports Dropdown */}
             <ListItem 
               button 
               onClick={toggleReportManagement}
               sx={{ 
                 cursor: 'pointer',
                 padding: '10px',
               }}
             >
               <TbMessageReportFilled /> 
              <ListItemText primary="Reports" />
              {openPromoterReports ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openPromoterReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ width: '100%' }}>
                <ListItem 
                  button 
                  onClick={navigateUserReports}
                  sx={{
                    padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/userreports') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/userreports') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Users" />
                </ListItem>
               
                <ListItem 
                  button 
                  onClick={navigateRenewalReports}
                  sx={{
                  padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/renewalreports') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/renewalreports') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Renewals" />
                </ListItem>
              
                <ListItem 
                  button 
                  onClick={navigateReceiptsReportsdata}
                  sx={{
                padding: '7px 10px',
                  borderRadius:'2px',
                    backgroundColor: isActive('/admin/receiptsreports') ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive('/admin/receiptsreports') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary="Receipts" />
                </ListItem>
              </List>
            </Collapse>
            {/* notification */}
            <ListItem 
              button 
              onClick={navigateNotification}
              sx={{ 
                cursor: 'pointer',
                padding: '10px',
                borderRadius:'2px',
                backgroundColor: isActive('/admin/notification') ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/notification') ? '#1976d2' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <IoIosNotifications />
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
        </aside>

        {/* Logout Confirmation Dialog */}
<Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
  <DialogTitle>Confirm Logout</DialogTitle>
  <DialogContent>
    <Typography>
    Are you sure you want to logout from your account?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleLogoutDialogClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleConfirmLogout} color="error" variant="contained">
      Logout
    </Button>
  </DialogActions>
</Dialog>

         {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onClose={handleProfileDialogClose}>
      <DialogTitle color='black' fontWeight={700} display={'flex'} 
      justifyContent={'center'} mt={1} fontSize={24}>Edit Profile</DialogTitle>
      <DialogContent >

        <TextField
          label="Name"
          name="name"
          value={userProfile.name}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userProfile.email}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={userProfile.phone}
          onChange={handleProfileChange}
          fullWidth
          margin="normal"
        />
     <Button
  variant="contained"
  component="label"
  style={{
    marginTop: "10px",
    textTransform: "capitalize",
    background: "#34495e",
  }}
>
  Upload Profile Picture
  <input
    type="file"
    hidden
    onChange={handleImageUpload}
  />
</Button>

        {userProfile.profilePicture && (
          <img
            src={userProfile.profilePicture}
            alt="Profile Preview"
            style={{ marginTop: "10px", width: "100%", borderRadius: "10px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProfileDialogClose}sx={{color:'#34495e',
            "&:hover": {
              backgroundColor: "transparent", 
            
              },
        }}>
          Cancel
        </Button>
        <Button onClick={handleProfileDialogClose} color="success"
        sx={{"&:hover": {
                  backgroundColor: "transparent", 
                
                  },}}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>

        {/* Main Content */}
        <div
          className="main-content"
          style={{
            paddingLeft: isSidebarOpen ? '280px' : '0px', // Adjust paddingLeft
            paddingTop: isSidebarOpen ? '10px' : '10px',
            transition: 'padding-left 0.3s ease',
          }}
        >
          <Outlet />
        </div>
      </div>
    
  );
}

export default AdminDashboard;