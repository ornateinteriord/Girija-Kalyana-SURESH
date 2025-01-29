import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const LifeStylePop = () => {
  const data = [
    { label: "Skin Type", value: "Fair" },
    { label: "Body Type", value: "Average" },
    { label: "Diet", value: "Veg" },
    { label: "Drink", value: "No" },
    { label: "Smoke", value: "No" },
    { label: "Sunsign", value: "Libra" },
    { label: "Blood Group", value: "B+" },
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
