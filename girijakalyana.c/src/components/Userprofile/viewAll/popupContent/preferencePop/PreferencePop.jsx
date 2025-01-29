import React from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const PreferencePop = () => {
  const data = [
    { label: "Marital Status", value: "Unmarried" },
    { label: "Age Preference", value: "36 to 63" },
    { label: "Height Preference", value: "4' 11'' - 149cm to 4' 11'' - 149cm" },
    { label: "Education Preference", value: "Any" },
    { label: "Caste Preference", value: "Any Brahmin" },
    { label: "Occupation Country", value: "India" },
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
