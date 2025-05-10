import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const AboutPop = ({ userDetails }) => {
  
  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Typography>No user details available.</Typography>;
  }
  console.log(userDetails)
  
  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          User Information
        </Typography>
        <TableContainer sx={{ boxShadow: 3 }} component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold",width:'150px' }}>Full Name</TableCell>
                <TableCell>{`${userDetails?.first_name || "N/A"} ${userDetails?.last_name || ""}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                <TableCell>{userDetails?.date_of_birth || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Marital Status</TableCell>
                <TableCell>{userDetails?.marital_status || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Language</TableCell>
                <TableCell>{userDetails?.mother_tounge || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell>{userDetails?.address || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Contact No</TableCell>
                <TableCell>{userDetails?.mobile_no || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell>{userDetails?.email_id || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default AboutPop;