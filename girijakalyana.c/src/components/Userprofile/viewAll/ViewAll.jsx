import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Pagination,
  CircularProgress,
  IconButton,
  Chip
} from "@mui/material";
import { FaHeart, FaUser } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import profileimg from "../../../assets/profile.jpg";
import AboutPop from "./popupContent/abouPop/AboutPop";
import EducationPop from "./popupContent/educationPop/EducationPop";
import FamilyPop from "./popupContent/familyPop/FamilyPop";
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop";
import PreferencePop from "./popupContent/preferencePop/PreferencePop";
import premium from ".././../../assets/premium9.png";
import { useGetAllUsersProfiles } from "../../api/User/useGetProfileDetails";
import TokenService from "../../token/tokenService";

const ViewAll = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInterested, setIsInterested] = useState(false);
  const itemsPerPage = 8;

  // Data fetching
  const { data: users = [], isLoading, error } = useGetAllUsersProfiles();

  const loggedInUserId = TokenService.getRegistrationNo(); 

  const filteredUsers = (users || []).filter(
    (user) => user.ref_no !== loggedInUserId && user.user_role !== "Admin"
  );
  

  // Correct pagination calculation
 const paginatedUsers = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  Math.min(currentPage * itemsPerPage, filteredUsers.length)
);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleLikeToggle = (userId) => {
    // Implement like functionality
    console.log("Toggled like for user:", userId);
  };

  const renderContent = () => {
    if (!selectedUser) return null;

    switch (currentTab) {
      case 0: return <AboutPop userDetails={selectedUser} />;
      case 1: return <FamilyPop userDetails={selectedUser} />;
      case 2: return <EducationPop userDetails={selectedUser} />;
      case 3: return <LifeStylePop userDetails={selectedUser} />;
      case 4: return <PreferencePop userDetails={selectedUser} />;
      default: return null;
    }
  };

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Typography color="error">Error loading user profiles: {error.message}</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" fontWeight="bold" color="#34495e" mb={3}>
        Browse Profiles ({users.length})
      </Typography>

      {/* User Cards Grid */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        gap: 3,
        justifyContent: "center"
      }}>
        {paginatedUsers.map((user) => (
          <UserCard 
            key={user._id}
            user={user}
            onViewMore={() => handleOpenDialog(user)}
            onLike={() => handleLikeToggle(user._id)}
          />
        ))}
      </Box>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog maxWidth="lg" open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent sx={{ p: 0, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ 
              width: "900px", 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              gap: 3, 
              p: 3 
            }}>
              {/* Profile Image Section */}
              <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                gap: 2,
               
              }}>
                <CardMedia
                  component="img"
                  image={profileimg}
                  alt="Profile"
                  sx={{ 
                    borderRadius: "8px", 
                    height: 280, 
                    width: "100%",
                    objectFit: "cover" ,
                     
                  }}
                />
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </Typography>
                  <Typography color="text.secondary">
                    {selectedUser.age} yrs, {selectedUser.height}
                  </Typography>
                  <Chip 
                    label={selectedUser.user_role} 
                    color={selectedUser.user_role === "PremiumUser" ? "primary" : "default"}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              {/* Profile Details Section */}
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ mb: 2 }}
                >
                  {["About", "Family", "Education", "LifeStyle", "Preference"].map((label, index) => (
                    <Tab key={index} label={label} />
                  ))}
                </Tabs>

                <Box sx={{ 
                  p: 2, 
                  backgroundColor: "white", 
                  borderRadius: 2,
                  boxShadow: 1,
                  minHeight: 300
                }}>
                  {renderContent()}
                </Box>
              </Box>
            </Box>

            {/* Dialog Footer */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              p: 2, 
              backgroundColor: "white", 
              borderTop: "1px solid #eee" 
            }}>
              <Box display="flex" alignItems="center">
                <RiVerifiedBadgeFill style={{ fontSize: 24, color: "#1976d2", marginRight: 8 }} />
                <Typography variant="body1" fontWeight="bold">
                  Verified Profile
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={() => setIsInterested(!isInterested)}
                  color={isInterested ? "error" : "primary"}
                >
                  {isInterested ? "Remove Interest" : "Express Interest"}
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => setOpenDialog(false)}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Pagination */}
      {users.length > itemsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
          <Pagination
            count={Math.ceil(users.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Box>
  );
};

const UserCard = ({ user, onViewMore, onLike }) => {
  const age = user.age || calculateAge(user.date_of_birth);
  
  return (
    <Card sx={{
      width: "100%",
      height: "420px",
      borderRadius: 2,
      boxShadow: 3,
      overflow: "hidden",
      transition: "transform 0.2s",
      "&:hover": { transform: "translateY(-4px)" }
    }}>
      <Box sx={{ position: "relative",padding:'0 48px '}}>
        <CardMedia
          component="img"
          height="200"
          image={profileimg}
          alt="Profile"
        />
        <IconButton 
          sx={{ 
            position: "absolute", 
            top: 8, 
            right: 8, 
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" }
          }}
          onClick={onLike}
        >
          <FaHeart />
        </IconButton>
        {user.user_role === "PremiumUser" && (
          <Box sx={{ 
            position: "absolute", 
            top: 8, 
            left: 8,
            backgroundColor: "rgba(255,215,0,0.8)",
            px: 1,
            borderRadius: 1
          }}>
            <Typography variant="caption" fontWeight="bold">
              PREMIUM
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
          <Typography sx={{fontSize:'16px'}} fontWeight="bold">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography color="text.secondary">
            {age || "N/A"} yrs
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" mb={0}>
          {user.occupation || "Not specified"}
        </Typography>
        
        <Typography variant="body2" mb={1}>
          {[user.city, user.state, user.country].filter(Boolean).join(", ") || "Location not specified"}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={2}>
          <ProfileInfo label="Height" value={user.height || "N/A"} />
          <ProfileInfo label="Religion" value={user.religion || "N/A"} />
          <ProfileInfo label="Caste" value={user.caste || "N/A"} />
        </Box>
        
        <Button 
          fullWidth 
          variant="contained" 
          onClick={onViewMore}
          startIcon={<FaUser />}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

const ProfileInfo = ({ label, value }) => (
  <Box textAlign="center">
    <Typography variant="subtitle2" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

function calculateAge(dob) {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default ViewAll;