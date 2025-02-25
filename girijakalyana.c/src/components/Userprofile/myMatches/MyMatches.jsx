import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyMatches = () => {
  const navigate = useNavigate();
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;



 
  const getData = async (page) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("No user data found in session storage");
        return;
      }
      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;
  
      const response = await axios.get("http://localhost:5000/api/users", {
        params: {
          page: page,
          limit: itemsPerPage,
          userId: loggedInUserId,
        },
      });
  
      console.log("API Response:", response.data); // Debugging
  

      let users = response.data.users; // Expecting an object, but got an array
  
      // ✅ Temporary fix: If response is an array, assign directly
      if (Array.isArray(response.data)) {
        users = response.data;
      }
  
      // Filter out the logged-in user
      const filteredUsers = users.filter((user) => user._id !== loggedInUserId);
  
      setUserCard(filteredUsers);
      setTotalItems(response.data.totalItems || filteredUsers.length); // Handle missing totalItems
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  

  const handlePageChange = (event, page) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
      getData(page);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  return (
    <Box sx={{ padding: 1, backgroundColor: "#f9f9f9", marginBottom: "10px" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#34495e">
          My Matches
        </Typography>

     
      </Box>
      <Divider />

      {/* Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
          marginTop: 2,
        }}
      >
        {userCard.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: "270px",
              height: "360px",
              borderRadius: 1,
              boxShadow: 3,
              textAlign: "center",
              cursor: "pointer",
              position: "relative",
              background: "black",
              color: "#fff",
            }}
          >
           <CardMedia
  component="img"
  height="230px"
  image={card.profileImg ? card.profileImg : "/default-placeholder.png"}
  alt="user-dp"
  sx={{ borderRadius: "1%" }}
  // onError={(e) => {
  //   e.target.onerror = null;
  //   e.target.src = "/default-placeholder.png"; // Fallback if image not found
  // }}
/>


            <CardContent>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                  {card.firstName} {card.lastName}
                </Typography>
              </Box>
              <Typography fontWeight={550} sx={{ color: "#fff" }}>
                {card.address || "N/A"}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                    {card.parentPrefer?.toAge || "N/A"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#fff" }}>
                    Age
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                    {card.parentPrefer?.toHeight || "N/A"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#fff" }}>
                    Height
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                    {index + 1}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#fff" }}>
                    Reg No
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination Section */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: 2 }}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
};

export default MyMatches;
