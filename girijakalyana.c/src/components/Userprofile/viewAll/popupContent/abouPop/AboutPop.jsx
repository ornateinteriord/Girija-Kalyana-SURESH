import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const AboutPop = ({ details }) => {
  if (!details || Object.keys(details).length === 0) {
    return <Typography>No user details available</Typography>;
  }

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
                <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                <TableCell>{`${details.firstName} ${details.lastName}` || "N/A"} </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                <TableCell>{details.lastName || "N/A"}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                <TableCell>{details.dob || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Marital Status</TableCell>
                <TableCell>{details.maritalStatus || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Language</TableCell>
                <TableCell>{details.language || "N/A"}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                <TableCell>{details.occupationCountry || details.country || "N/A"}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                <TableCell>{details.state || "N/A"}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell>{details.address || "N/A"}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Contact No</TableCell>
                <TableCell>{details.mobile || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell>{details.email || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default AboutPop;
