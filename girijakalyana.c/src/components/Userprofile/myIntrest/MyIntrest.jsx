import React, { useState, useEffect } from "react";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import Accepted from "./insidepage/accepted/Accepted";
import Requests from "./insidepage/requests/Request";
import Pending from "./insidepage/pending/Pending";
import Sent from "./sent/Sent";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const MyInterest = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState(null);
  const [totalCounts, setTotalCounts] = useState({
    accepted: 0,
    requests: 0,
    sent: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = sessionStorage.getItem("userData");
      if (!storedData) return;
      
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      fetchTotalCounts(parsedData._id);
    };

    fetchUserData();
  }, []);

  const fetchTotalCounts = async (userId) => {
    try {
      const endpoints = {
        accepted: `${API_BASE_URL}/accepted-users/${userId}`,
        requests: `${API_BASE_URL}/interested-users/${userId}`,
        sent: `${API_BASE_URL}/sent-interests/${userId}`,
        pending: `${API_BASE_URL}/pending-interests/${userId}`,
      };

      const responses = await Promise.all(
        Object.keys(endpoints).map((key) => axios.get(endpoints[key]))
      );

      setTotalCounts({
        accepted: responses[0].data.length,
        requests: responses[1].data.length,
        sent: responses[2].data.length,
        pending: responses[3].data.length,
      });
    } catch (error) {
      console.error("Error fetching total counts:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderContents = () => {
    switch (tabValue) {
      case 0:
        return <Accepted />;
      case 1:
        return <Requests />;
      case 2:
        return <Sent />;
      case 3:
        return <Pending />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" fontWeight={900} color="#34495e">
          Interested Profiles
        </Typography>
        <Divider sx={{ marginTop: 1 }} />
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ marginBottom: 2 }}
      >
        <Tab label={`Accepted (${totalCounts.accepted})`} />
        <Tab label={`Requests (${totalCounts.requests})`} />
        <Tab label={`Sent (${totalCounts.sent})`} />
        <Tab label={`Pending (${totalCounts.pending})`} />
      </Tabs>

      {/* Content Section */}
      <Box sx={{ padding: 2, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1, color: "black" }}>
        {renderContents()}
      </Box>
    </Box>
  );
};

export default MyInterest;