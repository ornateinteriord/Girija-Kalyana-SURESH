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

const LifeStylePop = ({ userDetails }) => {
  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <Typography>No user details available.</Typography>;
  }

  // 👉 Map root-level fields into a pseudo 'lifestyle' object
  const lifestyle = {
    skinType: userDetails.skin_type || "N/A",
    bodyType: userDetails.body_type || "N/A",
    diet: userDetails.diet || "N/A",
    drink: userDetails.drink || "N/A",
    smoke: userDetails.smoke || "N/A",
    sunsign: userDetails.sunsign || "N/A",
    bloodgroup: userDetails.bloodgroup || "N/A",
  };

  const data = [
    { label: "Skin Type", value: lifestyle.skinType },
    { label: "Body Type", value: lifestyle.bodyType },
    { label: "Diet", value: lifestyle.diet },
    { label: "Drink", value: lifestyle.drink },
    { label: "Smoke", value: lifestyle.smoke },
    { label: "Sunsign", value: lifestyle.sunsign },
    { label: "Blood Group", value: lifestyle.bloodgroup },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Lifestyle Details
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                      width: "40%",
                      backgroundColor: "#f9f9f9",
                    }}
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
