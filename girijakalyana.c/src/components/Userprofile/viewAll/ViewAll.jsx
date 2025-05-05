import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Pagination,
  Chip
} from "@mui/material";
import { FaUser } from "react-icons/fa";
import profileimg from "../../../assets/profile.jpg";
import AboutPop from "./popupContent/abouPop/AboutPop";
import EducationPop from "./popupContent/educationPop/EducationPop";
import FamilyPop from "./popupContent/familyPop/FamilyPop";
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop";
import PreferencePop from "./popupContent/preferencePop/PreferencePop";
import { useExpressInterest, useGetAllUsersProfiles, } from "../../api/User/useGetProfileDetails";
import TokenService from "../../token/tokenService";
import { useSnackbar } from "notistack";
import { LoadingComponent } from "../../../App";
import ProfileDialog from "../ProfileDialog/ProfileDialog";

// Constants
const itemsPerPage = 8;

/**
 * Main component to display and browse all user profiles
 */
const ViewAll = () => {
  // State management
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [interestStatus, setInterestStatus] = useState({});
  
  // Hooks for data fetching and UI feedback
  const { enqueueSnackbar } = useSnackbar();
  const { data: users = [], isLoading, isError, error } = useGetAllUsersProfiles();
  const loggedInUserId = TokenService.getRegistrationNo();

  // Interest status hook - disabled by default, will be manually triggered
  // const interestStatusQuery = useGetInterestStatus(loggedInUserId, selectedUser?.registration_no, { enabled: false });
  // Mutation for expressing interest
  const expressInterestMutation = useExpressInterest();

  // Filter out current user and admins
  const filteredUsers = useMemo(
    () => users.filter(user => user.registration_no !== loggedInUserId && user.user_role !== "Admin"),
    [users, loggedInUserId]
  );

  // Paginated users
  const paginatedUsers = useMemo(
    () => filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredUsers, currentPage]
  );

  /**
   * Handles opening the profile dialog and fetching interest status
   */
  const handleOpenDialog = useCallback((user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  }, []);
  /**
   * Handles expressing interest in a user
   */

  /**
   * Renders the appropriate content for the dialog based on current tab
   */
  const renderDialogContent = () => {
    if (!selectedUser) return null;

    const contentMap = {
      0: <AboutPop userDetails={selectedUser} />,
      1: <FamilyPop userDetails={selectedUser} />,
      2: <EducationPop userDetails={selectedUser} />,
      3: <LifeStylePop userDetails={selectedUser} />,
      4: <PreferencePop userDetails={selectedUser} />
    };

    return contentMap[currentTab] || null;
  };

  /**
   * Helper function to calculate age from date of birth
   */
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  /**
   * Renders an individual user card
   */
  const renderUserCard = (user) => {
    // const currentStatus = interestStatus[user._id]?.status || "none"; // Fixed: using user._id instead of user.recipientRegistrationNo
    const age = user.age || calculateAge(user.date_of_birth);

    return (
      <Card key={user._id} sx={{ width: "100%", height: 420, borderRadius: 2, boxShadow: 3, overflow: "hidden", transition: "transform 0.2s", '&:hover': { transform: "translateY(-4px)" } }}>
        <Box sx={{ position: "relative", px: 6 }}>
          <CardMedia component="img" height="200" image={profileimg} alt="Profile" />
          {user.user_role === "PremiumUser" && (
            <Chip label="PREMIUM" color="primary" size="small" sx={{ position: "absolute", top: 8, left: 8 }} />
          )}
        </Box>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0}>
            <Typography fontWeight="bold" fontSize={16}>{user.first_name} {user.last_name}</Typography>
            <Typography color="text.secondary">{age || "N/A"} yrs</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">{user.occupation || "Not specified"}</Typography>
          <Typography variant="body2" mb={1}>{[user.city, user.state, user.country].filter(Boolean).join(", ") || "Location not specified"}</Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <ProfileInfo label="Height" value={user.height || "N/A"} />
            <ProfileInfo label="Religion" value={user.religion || "N/A"} />
            <ProfileInfo label="Caste" value={user.caste || "N/A"} />
          </Box>
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => handleOpenDialog(user)}
            startIcon={<FaUser />}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Main component render
  return (
    <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" fontWeight="bold" color="#34495e" mb={3}>
        Browse Profiles ({filteredUsers.length})
      </Typography>
      
      {/* User cards grid */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        },
        gap: 3
      }}>
        {paginatedUsers.map(renderUserCard)}
      </Box>

      {/* Profile Dialog */}
      {selectedUser && (
      <ProfileDialog 
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedUser={selectedUser}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        loggedInUserId={loggedInUserId}  // Pass loggedInUserId as prop
        isLoading={expressInterestMutation.isLoading}
        renderDialogContent={renderDialogContent}
      />
    )}

      {/* Pagination */}
      {filteredUsers.length > itemsPerPage && (
        <Box display="flex" justifyContent="flex-end" my={3}>
          <Pagination 
            count={Math.ceil(filteredUsers.length / itemsPerPage)} 
            page={currentPage} 
            onChange={(e, page) => setCurrentPage(page)} 
            color="primary" 
            shape="rounded" 
          />
        </Box>
      )}
      
      {/* Loading state */}
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

/**
 * Helper component for profile information display
 */
const ProfileInfo = ({ label, value }) => (
  <Box textAlign="center">
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2" fontWeight="bold">{value}</Typography>
  </Box>
);

export default ViewAll;