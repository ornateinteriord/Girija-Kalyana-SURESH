import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Pagination,
} from "@mui/material";
import { toast } from "react-toastify";
import TokenService from "../../token/tokenService";

import HomeUserTable from "../../userupgrade/HomeUserTable";
import { useGetMemberDetails } from "../../api/User/useGetProfileDetails";
import { LoadingComponent } from "../../../App";

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

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


  // Dummy array to mimic profile card layout (replace later)
  const dummyProfiles = []; // keep empty or fill with mock data if needed

  const currentCards = dummyProfiles.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "10px 24px",
        mt: "0",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#34495e"
          textTransform="capitalize"
        >
          Welcome {userProfile?.first_name || "User"} {userProfile?.last_name || ""}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      <Stack spacing={3}>
        <HomeUserTable />

        {/* Interested Profiles Section (UI only, logic removed) */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#34495e" }}
            >
              Interested Profiles
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Showing {currentCards.length} of {dummyProfiles.length} profiles
            </Typography>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={4}>
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
              shape="rounded"
              color="primary"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

const ProfileCard = ({ profile }) => (
  <Box
    sx={{
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "16px",
      width: "350px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      },
    }}
  >
    <Box display="flex" alignItems="center">
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <img
          src={profile.profile_img || "/default-profile.png"}
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = "/default-profile.png";
          }}
        />
        <Box ml={2}>
          <Typography variant="h6" fontWeight="bold">
            {profile.first_name || "N/A"} {profile.last_name || ""}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {profile.city || "Location not specified"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Reg No: {profile.registration_no || "N/A"}
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
          {profile.age || "N/A"} yrs
        </Typography>
        <Typography>Age</Typography>
      </Box>
      <Box textAlign="center">
        <Typography fontWeight="bold">
          {profile.height || "N/A"}
        </Typography>
        <Typography>Height</Typography>
      </Box>
      <Box textAlign="center">
        <Typography fontWeight="bold">
          {profile.occupation || "N/A"}
        </Typography>
        <Typography>Occupation</Typography>
      </Box>
    </Box>
    {isLoading && <LoadingComponent/>}
  </Box>
);

export default UserDashboard;
