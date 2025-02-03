import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";


const EducationPop = ({userDetails}) => {
 console.log("educatin POPPP",userDetails)
  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Typography>No user details available.</Typography>;
  }
  const data = [
    { label: "Qualification", value: userDetails?.education?.degree || "Not Available" },
    { label: "Occupation", value: userDetails?.education?.occupation || "Not Available" },
    { label: "Income Per Annum", value: userDetails?.education?.income || "Not Available" },
    { label: "Occupation Country", value: userDetails?.education?.occupationCountry || "Not Available" },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Education & Occupation Information
        </Typography>
        <TableContainer sx={{ boxShadow: 3 }} component={Paper}>
          <Table>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f9f9f9", width: "40%" }}>
                    {row.label}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default EducationPop;
