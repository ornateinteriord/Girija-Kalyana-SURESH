
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { FaHome, FaUser, FaUsers, FaServer, FaReceipt, FaBars, FaChevronDown, FaChevronUp, FaDashcube, FaIdBadge } from 'react-icons/fa';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoIosNotifications } from 'react-icons/io';
import { Outlet } from 'react-router-dom';
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
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "123-456-7890",
    profilePicture: null,
  });



  const navigate = useNavigate();
  const adminName = "Admin";
  

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/admin'); 
    }
  }, []);
  
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
    setOpenUserManagement(false)
  };
  const handleDashboard=()=>{
    navigate('/admin/dashboard');
    setOpenUserManagement(false)
  }
  const navigateUserUpgrade=()=>{
    navigate('/admin/userData');
    setOpenUserManagement(false)
  }
  
  const navigateRenewals=()=>{
    navigate('/admin/renewals');
    setOpenUserManagement(false)
  }
  const navigateresetpass=()=>{
    navigate('/admin/resetpass');
    setOpenUserManagement(false)
  }
  const navigateImageVerify=()=>{
    navigate('/admin/imageverify');
    setOpenUserManagement(false)
  }
  const navigatePendingdata=()=>{
    navigate('/admin/pendingdata');
    setOpenAssistanceService(false)
  }
  const navigateSuccessdata=()=>{
    navigate('/admin/successdata');
    setOpenAssistanceService(false)
  }
  const navigatePromoterdata=()=>{
    navigate('/admin/promotersdata');
    setOpenAssistanceService(false)
  }
  const navigatePaytopromoters=()=>{
    navigate('/admin/paytopromoters');
    setOpenPromoterManagement(false)
  }
  const navigatePromotersEarn=()=>{
    navigate('/admin/promoterearn');
    setOpenPromoterManagement(false)
  }
  const navigatePromotersData=()=>{
    navigate('/admin/promoters');
    setOpenPromoterManagement(false)
  }
  const navigatePromotersUsers=()=>{
    navigate('/admin/promotersusers');
    setOpenPromoterManagement(false)
  }
  const navigateOnlineTransaction=()=>{
    navigate('/admin/onlinetransaction');
    setOpenPromoterReceipts(false)
  }
  const navigateAssistanceData=()=>{
    navigate('/admin/assistance');
    setOpenPromoterReceipts(false)
  }
  const navigateReceiptsvocher=()=>{
    navigate('/admin/receiptsvocher');
    setOpenPromoterReceipts(false)
  }

  const navigateUserReports=()=>{
    navigate('/admin/userreports');
    setOpenPromoterReports(false)
  }
  const navigateRenewalReports=()=>{
    navigate('/admin/renewalreports');
    setOpenPromoterReports(false)
  }
  const navigateReceiptsReportsdata=()=>{
    navigate('/admin/receiptsreports');
    setOpenPromoterReports(false)
  }
  const navigateNotification=()=>{
    navigate('/admin/notification');
  }
  
  
  
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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
          <h2 className="navtxt">Admin Dashboard</h2>
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <Typography style={{ color: '#fff', marginRight: '10px',fontSize:'22px',fontWeight:'bold',fontFamily:'Outfit sans-serif' }}>
            {adminName}
          </Typography>
         
        </div>
      </nav>
    </div>
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <List>
          <ListItem
            onClick={handleProfileDialogOpen}
            style={{  cursor: "pointer", }}
          >
            <CgProfile /> Profile
          </ListItem>

            <ListItem onClick={handleDashboard} 
            style={{ cursor: 'pointer'}}
            >
              < FaDashcube/> Dashboard
            </ListItem>

            {/* User Management Dropdown */}
            <ListItem button onClick={toggleUserManagement}  >
              <FaUser />
              <ListItemText primary="User Management" />
              {openUserManagement ? <FaChevronUp /> : <FaChevronDown />} {/* Arrow Icon */}
            </ListItem>
            <Collapse in={openUserManagement} timeout="auto" unmountOnExit >
              <List component="div" disablePadding sx={{paddingLeft:'20px',cursor:'pointer'}} >

                 <ListItemText primary="User"   onClick={navigateUserTable}  sx={{marginBottom:'15px'}}/>
          
                  <ListItemText primary="User Upgrade"  onClick={navigateUserUpgrade} sx={{marginBottom:'15px'}}/>
     
                  <ListItemText primary="Renewal" onClick={navigateRenewals}  sx={{marginBottom:'15px'}}/>             
          
                  <ListItemText primary="Password" onClick={navigateresetpass} sx={{marginBottom:'15px'}}/>
          
                  <ListItemText primary="Image Verification" onClick={navigateImageVerify} sx={{marginBottom:'15px'}}/>
                 
              </List>
            </Collapse>

            {/* Assistance Service Dropdown */}
            <ListItem button onClick={toggleAssistanceService}>
              <FaServer />
              <ListItemText primary="Assistance Service" />
              {openAssistanceService ? <FaChevronUp /> : <FaChevronDown />} {/* Arrow Icon */}
           </ListItem>
            <Collapse in={openAssistanceService} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{paddingLeft:'20px',cursor:'pointer'}}>
      
                  <ListItemText primary="Pending" onClick={navigatePendingdata} sx={{marginBottom:'15px'}}/>
          
                  <ListItemText primary="Success"  onClick={navigateSuccessdata} sx={{marginBottom:'15px'}}/>
           
                  <ListItemText primary="Promoter User" onClick={navigatePromoterdata} sx={{marginBottom:'15px'}}/>
             
              </List>
            </Collapse>

            {/* Promoter Management Dropdown */}
            <ListItem button onClick={togglePromoterManagement}>
              <FaUsers />
              <ListItemText primary="Promoter Management" />
              {openPromoterManagement ? <FaChevronUp /> : <FaChevronDown />} {/* Arrow Icon */}
            </ListItem>
            <Collapse in={openPromoterManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{paddingLeft:'20px',cursor:'pointer'}}>
               
                  <ListItemText primary="Promoters"   onClick={navigatePromotersData} sx={{marginBottom:'15px'}}/>
             
                  <ListItemText primary="Promoter Users" onClick={navigatePromotersUsers} sx={{marginBottom:'15px'}}/>
              
                
                  <ListItemText primary="Promoter Earnings" onClick={navigatePromotersEarn} sx={{marginBottom:'15px'}}/>
      
                  <ListItemText primary="Pay to Promoters"onClick={navigatePaytopromoters} sx={{marginBottom:'15px'}}/>
      
              </List>
            </Collapse>
           
             {/* Promoter Receipts Dropdown */}
            <ListItem button onClick={toggleReceiptsManagement}>
              <FaReceipt />
              <ListItemText primary="Receipts" />
              {openPromoterReceipts ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openPromoterReceipts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{paddingLeft:'20px',cursor:'pointer'}}>
              
                  <ListItemText primary="Online Transaction" onClick={navigateOnlineTransaction} sx={{marginBottom:'15px'}}/>
       
         
                  <ListItemText primary="Assistance Online Transaction" onClick={navigateAssistanceData} sx={{marginBottom:'15px'}}/>
               
                  <ListItemText primary="Receipt Voucher" onClick={navigateReceiptsvocher} sx={{marginBottom:'15px'}}/>
  
              </List>
            </Collapse>

               {/* Promoter Receipts Dropdown */}
             <ListItem button onClick={toggleReportManagement}>
               <TbMessageReportFilled /> 
              <ListItemText primary="Reports" />
              {openPromoterReports ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openPromoterReports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{paddingLeft:'20px',cursor:'pointer'}}>
                
                  <ListItemText primary="Users" onClick={navigateUserReports} sx={{marginBottom:'15px'}}/>
               
                  <ListItemText primary="Renewals" onClick={navigateRenewalReports} sx={{marginBottom:'15px'}}/>
              
                  <ListItemText primary="Receipts" onClick={navigateReceiptsReportsdata} sx={{marginBottom:'15px'}}/>
             
               
              </List>
            </Collapse>
            {/* notification */}
            <ListItem button onClick={navigateNotification}>
              <IoIosNotifications />
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
        </aside>

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
            paddingTop: isSidebarOpen ? '10px' : '',
            transition: 'padding-left 0.3s ease',
          }}
        >
          <Outlet />
        </div>
      </div>
    
  );
}

export default AdminDashboard;
