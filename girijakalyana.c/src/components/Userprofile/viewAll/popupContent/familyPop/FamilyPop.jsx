import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const FamilyPop = ({ userDetails }) => {


  if (!userDetails || typeof userDetails !== "object" || Object.keys(userDetails).length === 0) {
    return <Typography>No family details available</Typography>;
  }

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
                <TableCell>{userDetails?.fatherName || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Mother's Name</TableCell>
                <TableCell>{userDetails?.motherName || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Siblings</TableCell>
                <TableCell>{userDetails?.Siblings || "N/A"}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Religion</TableCell>
                <TableCell>{userDetails?.religion || "N/A"}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Caste</TableCell>
                <TableCell>{userDetails?.caste || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rashi</TableCell>
                <TableCell>{userDetails?.rashi || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Gotra</TableCell>
                <TableCell>{userDetails?.gotra || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default FamilyPop;
