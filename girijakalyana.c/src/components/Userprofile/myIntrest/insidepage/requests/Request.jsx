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
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      {validPageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 4 }}>
          <Pagination count={validPageCount} page={currentPage} onChange={(event, page) => setCurrentPage(page)} shape="rounded" color="primary" />
        </Box>
      )}
    </Box>
  );
};

export default Requests;
