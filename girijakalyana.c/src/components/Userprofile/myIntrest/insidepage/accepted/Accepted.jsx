import React, { useEffect, useState } from "react";
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
};

export default Accepted;
