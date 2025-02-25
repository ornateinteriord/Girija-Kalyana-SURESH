import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Pagination,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaHeart, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import HomeUserTable from "../../userupgrade/HomeUserTable";

const UserDashboard = () => {
  const [interestedProfiles, setInterestedProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const cardsPerPage = 3;

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    const storedLastName = sessionStorage.getItem("lastName"); // Fixed storage retrieval

    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
  }, []);

  useEffect(() => {
    const fetchInterestedUsers = async () => {
      try {
        const storedUser = sessionStorage.getItem("userData");
  
        if (!storedUser) {
          console.warn("No user data found in sessionStorage.");
          return;
        }
        
  
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser || !parsedUser._id) {
          console.warn("Invalid user data in sessionStorage.");
          return;
        }
  
        const response = await fetch(
          `http://localhost:5000/api/user-dashboard/${parsedUser._id}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched User Data:", data); // Debugging step
  
        if (data && data.interestedUsers) {
          setInterestedProfiles(data.interestedUsers);
        } else {
          console.warn("No interested users found in response.");
        }
      } catch (error) {
        console.error("Error fetching interested users:", error.message);
      }
    };
  
    fetchInterestedUsers();
  }, []);
  ;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentCards = interestedProfiles.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "10px 24px",
        mt:'0'
      }}
    >
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#34495e"
          textTransform="capitalize"
        >
          Welcome {firstName} {lastName}
        </Typography>
        <Divider sx={{ mt: 0.5 }} />
      </Box>

      <Stack spacing={3}>
        {/* Top Statistics Cards */}
        {/* <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ marginBottom: "24px" }}
        >
          {[
            {
              count: interestedProfiles.length, // Dynamic count
              label: "Interested Profiles",
              icon: FaHeart,
            },
            { count: 2, label: "Messages", icon: FaRegEnvelope },
            { count: 3, label: "Chats", icon: MdOutlineChatBubble },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "14px 50px",
                textAlign: "center",
                flex: 1,
                "&:hover": {
                  backgroundColor: "#f0f4ff",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Typography>
                  <item.icon size={40} color="black" />
                </Typography>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {item.count}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    fontSize={20}
                    sx={{ color: "#34495e" }}
                  >
                    {item.label}
                  </Typography>
                  <MuiLink
                    component={Link}
                    to="#"
                    sx={{ textDecoration: "none", color: "#3f51b5", mt: 1 }}
                  >
                    View All
                  </MuiLink>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack> */}


        <HomeUserTable/>

        {/* Interested Profiles List */}
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "#34495e" }}
          >
            Interested Profiles
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={4}>
            {interestedProfiles.length > 0 ? (
              currentCards.map((profile, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                    width: "350px",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      display="flex"
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <img
                        src={profile.profileImg || "/default-placeholder.png"}
                        alt="Profile"
                        style={{
                          width: "100px",
                          height: "90px",
                          borderRadius: "10px",
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="h6" fontWeight="bold">
                          {profile.firstName || "N/A"} {profile.lastName || ""}
                        </Typography>
                        <Typography variant="body2" color="textprimary">
                          {profile.address || "Not Available"}
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
                      {profile.dob ? new Date(profile.dob).toLocaleDateString("en-US", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}

                      </Typography>
                      <Typography>Dob</Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography fontWeight="bold">
                        {profile.height || "N/A"}
                      </Typography>
                      <Typography>Height</Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography fontWeight="bold">
                        {profile.regNo || "N/A"}
                      </Typography>
                      <Typography>Reg No</Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  color: "black",
                  fontSize: "17px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                No interested profiles yet.
              </Typography>
            )}
          </Box>

          {/* Pagination */}
          <Pagination
            count={Math.ceil(interestedProfiles.length / cardsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default UserDashboard;
