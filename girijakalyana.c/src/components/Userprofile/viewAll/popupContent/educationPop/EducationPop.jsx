import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const EducationPop = () => {
  const data = [
    { label: "Qualification", value: "B.E/B.Tech" },
    { label: "Occupation", value: "Software Professional (Others)" },
    { label: "Income Per Annum", value: "4 Lakh - 5 Lakh" },
    { label: "Occupation Country", value: "India" },
    { label: "Other Info", value: "Not Specified" },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Education & Occupation Information
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

export default EducationPop;
