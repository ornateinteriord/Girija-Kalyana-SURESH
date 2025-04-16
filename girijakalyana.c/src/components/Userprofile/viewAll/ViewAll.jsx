import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { useExpressInterest, useGetAllUsersProfiles, useGetInterestStatus } from "../../api/User/useGetProfileDetails";
import TokenService from "../../token/tokenService";
import { useSnackbar } from "notistack";

const itemsPerPage = 8;
const tabLabels = ["About", "Family", "Education", "LifeStyle", "Preference"];

const ViewAll = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [interestStatus, setInterestStatus] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const { data: users = [], isLoading, error } = useGetAllUsersProfiles();
  const loggedInUserId = TokenService.getRegistrationNo();

  const expressInterestMutation = useExpressInterest();
  const { mutateAsync: checkInterestStatus } = useGetInterestStatus();

  const filteredUsers = useMemo(
    () => users.filter(user => user.registration_no !== loggedInUserId && user.user_role !== "Admin"),
    [users, loggedInUserId]
  );

  const paginatedUsers = useMemo(
    () => filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredUsers, currentPage]
  );

  useEffect(() => {
    if (!filteredUsers.length || !loggedInUserId) return;

    const fetchStatuses = async () => {
      const statusMap = {};
      await Promise.all(
        filteredUsers.map(async (user) => {
          try {
            const res = await checkInterestStatus({
              senderRegistrationNo: loggedInUserId,
              recipientRegistrationNo: user.registration_no
            });
            statusMap[user._id] = res;
          } catch {
            statusMap[user._id] = { status: "none" };
          }
        })
      );
      setInterestStatus(statusMap);
    };

    fetchStatuses();
  }, [filteredUsers, loggedInUserId, checkInterestStatus]);
  const handleOpenDialog = useCallback(async (user) => {
    console.log('Opening dialog for user:', user._id); // Debug
    setSelectedUser(user);
    try {
      console.log('Fetching interest status...'); // Debug
      const status = await checkInterestStatus({
        senderRegistrationNo: loggedInUserId,
        recipientRegistrationNo: user.registration_no
      });
      console.log('Received status:', status); // Debug
      setInterestStatus(prev => {
        const newStatus = { ...prev, [user._id]: status };
        console.log('Updated interestStatus:', newStatus); // Debug
        return newStatus;
      });
    } catch (error) {
      console.error('Error fetching status:', error); // Debug
      enqueueSnackbar("Failed to check interest status", { variant: "error" });
      setInterestStatus(prev => ({ ...prev, [user._id]: { status: "none" } }));
    }
    setOpenDialog(true);
  }, [checkInterestStatus, loggedInUserId, enqueueSnackbar]);

  const handleExpressInterest = useCallback(async (userMongoId) => {
    const recipient = filteredUsers.find(user => user._id === userMongoId);
    if (!recipient) return;
  
    try {
      await expressInterestMutation.mutateAsync({
        senderRegistrationNo: loggedInUserId, // this is a registration_no
        recipientRegistrationNo: recipient.registration_no,
        message: "I'd like to connect with you!"
      });
  
      setInterestStatus(prev => ({
        ...prev,
        [userMongoId]: { status: "pending" }
      }));
  
      enqueueSnackbar("Interest expressed successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Failed to express interest", {
        variant: "error"
      });
    }
  }, [filteredUsers, loggedInUserId, expressInterestMutation, enqueueSnackbar]);
  
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

  const renderUserCard = (user) => {
    const currentStatus = interestStatus[user._id]?.status || "none";
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

  if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><CircularProgress /></Box>;

  if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><Typography color="error">Error loading profiles: {error.message}</Typography></Box>;

  return (
    <Box sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" fontWeight="bold" color="#34495e" mb={3}>Browse Profiles ({filteredUsers.length})</Typography>
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

      {selectedUser && (
        <Dialog maxWidth="lg" open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogContent sx={{ p: 0, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, p: 3 }}>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <CardMedia component="img" image={profileimg} alt="Profile" sx={{ borderRadius: 2, height: 280, width: "100%", objectFit: "cover" }} />
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold">{selectedUser.first_name} {selectedUser.last_name}</Typography>
                  <Typography color="text.secondary">{selectedUser.age || calculateAge(selectedUser.date_of_birth)} yrs, {selectedUser.height}</Typography>
                  <Chip label={selectedUser.user_role} color={selectedUser.user_role === "PremiumUser" ? "primary" : "default"} size="small" sx={{ mt: 1 }} />
                </Box>
              </Box>
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
                  {tabLabels.map((label, index) => (<Tab key={index} label={label} />))}
                </Tabs>
                <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 2, boxShadow: 1, minHeight: 300 }}>
                  {renderDialogContent()}
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, backgroundColor: "white", borderTop: "1px solid #eee" }}>
              <Box display="flex" alignItems="center">
                <RiVerifiedBadgeFill style={{ fontSize: 24, color: "#1976d2", marginRight: 8 }} />
                <Typography variant="body1" fontWeight="bold">Verified Profile</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
    <Button
      variant="contained"
      color={
        interestStatus[selectedUser?._id]?.status === "pending" ? "warning" :
        interestStatus[selectedUser?._id]?.status === "accepted" ? "success" :
        interestStatus[selectedUser?._id]?.status === "rejected" ? "error" : "primary"
      }
      onClick={() => handleExpressInterest(selectedUser._id)}
      disabled={interestStatus[selectedUser?._id]?.status !== "none" || expressInterestMutation.isLoading}
      startIcon={expressInterestMutation.isLoading ? <CircularProgress size={20} /> : <FaHeart />}
    >
      {
        interestStatus[selectedUser?._id]?.status === "pending" ? "Interest Pending" :
        interestStatus[selectedUser?._id]?.status === "accepted" ? "Connected!" :
        interestStatus[selectedUser?._id]?.status === "rejected" ? "Rejected" : "Express Interest"
      }
    </Button>
    <Button variant="outlined" onClick={() => setOpenDialog(false)}>Close</Button>
  </Box>
</Box>
          </DialogContent>
        </Dialog>
      )}

      {filteredUsers.length > itemsPerPage && (
        <Box display="flex" justifyContent="flex-end" my={3}>
          <Pagination count={Math.ceil(filteredUsers.length / itemsPerPage)} page={currentPage} onChange={(e, page) => setCurrentPage(page)} color="primary" shape="rounded" />
        </Box>
      )}
    </Box>
  );
};

const ProfileInfo = ({ label, value }) => (
  <Box textAlign="center">
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2" fontWeight="bold">{value}</Typography>
  </Box>
);

const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export default ViewAll;