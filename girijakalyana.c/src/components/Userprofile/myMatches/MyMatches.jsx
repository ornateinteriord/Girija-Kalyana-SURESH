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

  const handleModifyButton = () => {
    navigate("/user/profile");
  };
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
        },
      });
      const filteredUsers = response.data.users.filter(user => user._id !== loggedInUserId); // Filter out logged-in user
      setUserCard(filteredUsers); // Update the state with the filtered list
      setTotalItems(response.data.totalItems); // Update the total items count
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
        <Button
          variant="contained"
          sx={{ background: "#34495e", color: "#fff" }}
          onClick={handleModifyButton}
        >
          Modify
        </Button>
      </Box>
      <Divider />

       {/* Cards Section */}
           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-evenly", marginTop: 2 }}>
             {userCard.map((card, index) => (
               <Card
                 key={index}
                 sx={{
                   width: "270px",
                   height: "390px",
                   borderRadius: 1,
                   boxShadow: 3,
                   textAlign: "center",
                  //  padding: 1,
                   cursor: "pointer",
                   position: "relative",
                   background: 'black',
                   color: '#fff',
                 }}
                
               >
                
     
                 <CardMedia
                   component="img"
                   height="230px"
                   image={card.profileImg || "/default-placeholder.png"}
                   onClick={() => handleCardClick(index)}
                   alt="user-dp"
                   sx={{ borderRadius: "1%" }}
                 />
     
                 <CardContent>
                   <Box display={'flex'} justifyContent={'center'}>
                     <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                       {card.firstName} {card.lastName}
                     </Typography>
                    
                   </Box>
                   <Typography fontWeight={550} sx={{ color: '#fff' }}>{card.address || "N/A"}</Typography>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: 2,
        }}
      >
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
