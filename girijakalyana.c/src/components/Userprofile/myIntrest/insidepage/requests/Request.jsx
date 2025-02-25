<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Pagination } from "@mui/material";
import mathes from '../requests/mathes.jpeg';

const Requests = () => {
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;  // Set to 2 items per page
  const totalItems = 8;   // Assume we have 10 items in total

  // Fetch data for the current page using async/await
  const getData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setUserCard(data);
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
      {/* Cards Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
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
              <Typography color="text.primary">{card.address.city}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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
                  <Typography variant="caption" color="text.primary">
                    Reg No 
                  </Typography>
                </Box>
=======
import React, { useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Pagination, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { InterestContext } from "../../UserContext/IntrestProvider";

const API_BASE_URL = "http://localhost:5000/api";

const Requests = () => {
  const { acceptedUsers } = useContext(InterestContext);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [validPageCount, setValidPageCount] = useState(1);

  useEffect(() => {
    fetchInterestedUsers();
  }, [acceptedUsers, currentPage]);

  const fetchInterestedUsers = async () => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) return;
      const { _id: loggedInUserId } = JSON.parse(userData);

      const response = await axios.get(`${API_BASE_URL}/interested-users/${loggedInUserId}`);
      const filteredUsers = response.data.filter(user => !acceptedUsers.some(acc => acc._id === user._id));

      const pageCount = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
      setValidPageCount(pageCount);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

      if (paginatedUsers.length === 0 && currentPage > 1) {
        setCurrentPage(prev => Math.max(prev - 1, 1));
      }

      setInterestedUsers(paginatedUsers);
    } catch (error) {
      console.error("Error fetching interested users:", error);
    }
  };

  const handleInterestResponse = async (user, accept) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) return;
      const { _id: loggedInUserId } = JSON.parse(userData);

      const response = await axios.post(`${API_BASE_URL}/accept-interest`, {
        userId: loggedInUserId,
        targetUserId: user._id,
        accept,
      });

      if (response.data.success) {
        toast.success(accept ? "Request Accepted Successfully!" : "Request Rejected Successfully!");
        setInterestedUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
      }
    } catch (error) {
      console.error("Error updating interest status:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start", marginTop: 1 }}>
        {interestedUsers.map(user => (
          <Card key={user._id} sx={{ width: 270, height: 380, borderRadius: 1, boxShadow: 3, textAlign: "center", position: "relative", background: 'black', color: '#fff' }}>
            <CardMedia component="img" height="210px" image={user.profileImg || "/default-placeholder.png"} alt="user-dp" sx={{ borderRadius: "1%" }} />
            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>{user.firstName} {user.lastName}</Typography>
              <Typography fontWeight={550} sx={{ color: '#fff' }}>{user.address || "N/A"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
               <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>{user.age || "N/A"}</Typography>
                <Typography variant="caption" sx={{ color: "#fff" }}>Age</Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>{user.height || "N/A"}</Typography>
                <Typography variant="caption" sx={{ color: "#fff" }}>Height</Typography>
                  </Box>
                <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>{user.registrationNumber || "N/A"}</Typography>
                <Typography variant="caption" sx={{ color: "#fff" }}>RegNo</Typography>
                  </Box>
              </Box>
              <Box display={'flex'} gap={1}>
              <Button fullWidth variant="contained" sx={{ marginTop: 1, background: '#34495e', color: '#fff' }} onClick={() => handleInterestResponse(user, true)}>Accept</Button>
              <Button fullWidth variant="outlined" sx={{ marginTop: 1, borderColor: '#ff4d4d', color: '#ff4d4d' }} onClick={() => handleInterestResponse(user, false)}>Reject</Button>
>>>>>>> 90302d1 (my intrest updated)
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
<<<<<<< HEAD

      {/* Pagination Section */}
      <Box sx={{ display: "flex",    justifySelf:'end', marginTop: 4 }}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
=======
      {validPageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 4 }}>
          <Pagination count={validPageCount} page={currentPage} onChange={(event, page) => setCurrentPage(page)} shape="rounded" color="primary" />
        </Box>
      )}
>>>>>>> 90302d1 (my intrest updated)
    </Box>
  );
};

export default Requests;
