import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";
import HomeUserTable from "../../userupgrade/HomeUserTable";
import { useGetMemberDetails } from "../../api/User/useGetProfileDetails";

const UserDashboard = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = isMobile ? 1 : isTablet ? 2 : 3;

  const registerNo = TokenService.getRegistrationNo();
  const { data: userProfile, isLoading, isError, error } = useGetMemberDetails(registerNo);

  const dummyProfiles = []; // Your existing dummy data

  const currentCards = dummyProfiles.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: isMobile ? "10px" : "10px 24px",
      }}
    >
      <Box sx={{ textAlign: isMobile ? "center" : "left", mb: 1 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          color="#34495e"
        >
          Welcome {userProfile?.first_name || "User"} {userProfile?.last_name || ""}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      <Stack spacing={3}>
        <HomeUserTable />

        <Box>
          <Box 
            display="flex" 
            flexDirection={isMobile ? "column" : "row"} 
            justifyContent="space-between" 
            alignItems={isMobile ? "flex-start" : "center"}
            gap={1}
            mb={2}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              sx={{ color: "#34495e" }}
            >
              Interested Profiles
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Showing {currentCards.length} of {dummyProfiles.length} profiles
            </Typography>
          </Box>

          <Box 
            display="grid"
            gridTemplateColumns={
              isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
            }
            gap={3}
          >
            {currentCards.length > 0 ? (
              currentCards.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
              ))
            ) : (
              <Typography
                sx={{
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  gridColumn: "1 / -1"
                }}
              >
                No interested profiles yet.
              </Typography>
            )}
          </Box>

          {dummyProfiles.length > cardsPerPage && (
            <Pagination
              count={Math.ceil(dummyProfiles.length / cardsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                '& .MuiPaginationItem-root': {
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

const ProfileCard = ({ profile }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: isMobile ? "12px" : "16px",
        width: "100%",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box display="flex" alignItems="center">
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <img
            src={profile?.profile_img || "/default-profile.png"}
            alt="Profile"
            style={{
              width: isMobile ? "80px" : "100px",
              height: isMobile ? "80px" : "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = "/default-profile.png";
            }}
          />
          <Box ml={2}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="bold">
              {profile?.first_name || "N/A"} {profile?.last_name || ""}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile?.city || "Location not specified"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Reg No: {profile?.registration_no || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
        sx={{ fontSize: "14px", color: "gray" }}
      >
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {profile?.age || "N/A"} yrs
          </Typography>
          <Typography>Age</Typography>
        </Box>
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {profile?.height || "N/A"}
          </Typography>
          <Typography>Height</Typography>
        </Box>
        <Box textAlign="center">
          <Typography fontWeight="bold">
            {profile?.occupation || "N/A"}
          </Typography>
          <Typography>Occupation</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;