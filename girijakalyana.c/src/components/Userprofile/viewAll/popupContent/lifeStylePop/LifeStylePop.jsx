import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const LifeStylePop = ({userDetails}) => {
  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Typography>No user details available.</Typography>;
  }


  const data = [
    { label: "Skin Type", value: userDetails?.lifestyle?.skinType  || "N/A" },
    { label: "Body Type", value: userDetails?.lifestyle?.bodyType  || "N/A" },
    { label: "Diet", value: userDetails?.lifestyle?.diet  || "N/A" },
    { label: "Drink", value: userDetails?.lifestyle?.drink  || "N/A" },
    { label: "Smoke", value: userDetails?.lifestyle?.smoke  || "N/A" },
    { label: "Sunsign", value:  userDetails?.lifestyle?.sunsign  || "N/A" },
    { label: "Blood Group", value: userDetails?.lifestyle?.bloodgroup  || "N/A" },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Lifestyle Details
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

export default LifeStylePop;
