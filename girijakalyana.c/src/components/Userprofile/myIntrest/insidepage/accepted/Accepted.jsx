import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Button,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import mathes from '../../../myIntrest/insidepage/accepted/mathes.jpeg'

const Accepted = () => {
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch Data
  const getData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setUserCard(data.slice(0, 2)); // Adjust slice as per requirement
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getData(page);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  return (
    <Box sx={{ padding: 3 }}>
      {/* User Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {userCard.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: 250,
              boxShadow: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <CardMedia
              component="img"
              alt="User Profile"
              height="200"
              image={mathes}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
              {card.name}
              </Typography>
              <Typography color="text.primary">Bangalore</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    {card.id}
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    Age
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    5.4
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    Height
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    SGM333
                  </Typography>
                  <Typography variant="caption" color="text.primary" >
                    Reg No
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifySelf:'end',
          alignItems: "center",
          marginTop: 4,
          gap: 2,
        }}
      >
        <Button
        //   startIcon={<FaChevronLeft />}
          onClick={() => handlePageChange(null, currentPage - 1)}
          disabled={currentPage === 1}
         
        >
         
        </Button>
        <Pagination
          count={Math.ceil(8 / itemsPerPage)} // Adjust as needed
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
        <Button
        //   endIcon={<FaChevronRight />}
          onClick={() => handlePageChange(null, currentPage + 1)}
          disabled={currentPage === Math.ceil(10 / itemsPerPage)}
          
        >
         
        </Button>
      </Box>
    </Box>
  );
=======
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import placeholderImg from "../../../myIntrest/insidepage/accepted/mathes.jpeg";
import toast from "react-hot-toast";
const API_BASE_URL = "http://localhost:5000/api";

const Accepted = () => {
    const [acceptedUsers, setAcceptedUsers] = useState([]);

    useEffect(() => {
        const fetchAcceptedUsers = async () => {
            try {
                const userData = sessionStorage.getItem("userData");
                if (!userData) return;
                const parsedUserData = JSON.parse(userData);
                const loggedInUserId = parsedUserData._id;

                const response = await axios.get(`${API_BASE_URL}/accepted-users/${loggedInUserId}`);
                setAcceptedUsers(response.data);
            } catch (error) {
                console.error("Error fetching accepted users:", error);
            }
        };

        fetchAcceptedUsers();
    }, []);

   
const handleRemoveUser = async (userId) => {
    try {
        const userData = sessionStorage.getItem("userData");
        if (!userData) return;
        const parsedUserData = JSON.parse(userData);
        const loggedInUserId = parsedUserData._id;

        await axios.post(`${API_BASE_URL}/remove-accepted`, {
            userId: loggedInUserId,
            targetUserId: userId,
        });

        setAcceptedUsers(acceptedUsers.filter(user => user._id !== userId));
        toast.success("User removed successfully!");
    } catch (error) {
        console.error("Error removing connection:", error);
    }
};

    return (
        <Box sx={{ padding: 3, backgroundColor: "aliceblue" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
                {acceptedUsers.length > 0 ? (
                    acceptedUsers.map((user, index) => (
                        <Card 
                            key={user._id} 
                            sx={{ 
                                width: "270px",
                                height: "380px", 
                                borderRadius: 1, 
                                boxShadow: 3, 
                                textAlign: "center", 
                                backgroundColor: "black", 
                                color: "white",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            <CardMedia 
                                component="img" 
                                alt="User Profile" 
                                height="210px" 
                                image={user.profileImg || placeholderImg} 
                                sx={{ objectFit: "cover", borderRadius: "1%" }} 
                            />
                            <CardContent>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6" fontWeight="bold">
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Typography fontWeight={550}>
                                        {user.address || "N/A"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2}}>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {user.age || "N/A"}
                                        </Typography>
                                        <Typography variant="caption">
                                            Age
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {user.height || "N/A"}
                                        </Typography>
                                        <Typography variant="caption">
                                            Height
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {user.registrationNumber || "N/A"}
                                        </Typography>
                                        <Typography variant="caption">
                                            Reg No
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Button
                                fullWidth
                                    variant="contained"                   
                                    sx={{ marginTop: 0.5 ,textTransform:"none",
                                        height:'40px',background:'red',color:'#fff',fontWeight:'600px',fontSize:'18px' }}
                                    onClick={() => handleRemoveUser(user._id)}
                                >
                                    Remove 
                                </Button>
                              
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="h6" textAlign="center" sx={{ color: "black" }}>
                        No accepted users yet.
                    </Typography>
                )}
            </Box>
        </Box>
    );
>>>>>>> 90302d1 (my intrest updated)
};

export default Accepted;
