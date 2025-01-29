import React, { useState } from "react";
import { Box, Divider, Tab, Tabs, Pagination, Typography } from "@mui/material";
import Accepted from "./insidepage/accepted/Accepted";
import Requests from "./insidepage/requests/Request";

import Pending from "./insidepage/pending/Pending";
import Sent from "./sent/Sent";

const MyInterest = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset pagination on tab change
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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
    <>
      <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        {/* Header */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h5" fontWeight={900} color="#34495e" >
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
          sx={{ marginBottom: 2 ,
             }}
        >
          <Tab label={`Accepted (5)`} sx={{"&:hover": {
            backgroundColor: "transparent", 
            
          },}} />
          <Tab label={`Requests (8)`}  sx={{"&:hover": {
            backgroundColor: "transparent", 
            
          },}} />
          <Tab label={`Sent (3)`}  sx={{"&:hover": {
            backgroundColor: "transparent", 
            
          },}}/>
          <Tab label={`Pending (2)`}  sx={{"&:hover": {
            backgroundColor: "transparent", 
            
          },}}/>
        </Tabs>

        {/* Content Section */}
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#fff",
           
            borderRadius: 2,
            boxShadow: 1,
            color:'black'
          }}
        >
          {renderContents()}
        </Box>

        {/* Pagination Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          {/* <Pagination
            count={Math.ceil(50 / itemsPerPage)} // Example total items divided by items per page
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default MyInterest;
