import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const FamilyPop = ({ details }) => {
  console.log(" FamilyPop Received Details:", details);

  if (!details || typeof details !== "object" || Object.keys(details).length === 0) {
    return <Typography>No family details available</Typography>;
  }

  const { familyDetails } = details;

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Family Information
        </Typography>
        <TableContainer sx={{ boxShadow: 3 }} component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Father's Name</TableCell>
                <TableCell>{familyDetails?.fatherName || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Mother's Name</TableCell>
                <TableCell>{familyDetails?.motherName || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Siblings</TableCell>
                <TableCell>{familyDetails?.siblings || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Religion</TableCell>
                <TableCell>{familyDetails?.religion || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Caste</TableCell>
                <TableCell>{familyDetails?.caste || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rashi</TableCell>
                <TableCell>{familyDetails?.rashi || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Gotra</TableCell>
                <TableCell>{familyDetails?.gotra || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default FamilyPop;
