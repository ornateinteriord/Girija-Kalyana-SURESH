import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const PreferencePop = ({userDetails}) => {

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Typography>No user details available.</Typography>;
  }
  
  const data = [
    { label: "Marital Status", value: userDetails?.parentPrefer?.maritalStatus || "N/A" },
    { label: "Age Preference", value: userDetails?.parentPrefer?.toAge  || "N/A" },
    { label: "Height Preference", value: userDetails?.parentPrefer?.fromHeight  || "N/A" },
    { label: "Education Preference", value: userDetails?.parentPrefer?.education  || "N/A" },
    { label: "Caste Preference", value:userDetails?.parentPrefer?.caste  },
    { label: "Occupation Country", value: userDetails?.parentPrefer?.occupation  || "N/A" },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Partner Preferences
        </Typography>
        <TableContainer  sx={{ boxShadow: 3 }}>
          <Table>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold", width: "40%", backgroundColor: "#f9f9f9" }}
                  >
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

export default PreferencePop;
