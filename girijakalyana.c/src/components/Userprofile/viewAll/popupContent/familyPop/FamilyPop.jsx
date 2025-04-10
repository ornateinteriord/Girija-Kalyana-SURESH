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

const FamilyPop = ({ userDetails }) => {
  if (!userDetails || typeof userDetails !== "object" || Object.keys(userDetails).length === 0) {
    return <Typography>No family details available</Typography>;
  }

  const getParentName = (type) => {
    const name = userDetails?.name_of_parent || "";
    if (name.includes(type)) {
      return name.split("-")[1]?.trim() || "N/A";
    }
    return "N/A";
  };

  const sum = (a, b) => (parseInt(a) || 0) + (parseInt(b) || 0);

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
                <TableCell>{getParentName("Father")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Mother's Name</TableCell>
                <TableCell>{getParentName("Mother")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Brothers</TableCell>
                <TableCell>
                  {`${sum(userDetails.brother_elder_married, userDetails.brother_elder_unmarried)} elder, 
                    ${sum(userDetails.brother_younger_married, userDetails.brother_younger_unmarried)} younger`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Sisters</TableCell>
                <TableCell>
                  {`${sum(userDetails.sister_elder_married, userDetails.sister_elder_unmarried)} elder, 
                    ${sum(userDetails.sister_younger_married, userDetails.sister_younger_unmarried)} younger`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Caste</TableCell>
                <TableCell>{userDetails?.caste || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Subcaste</TableCell>
                <TableCell>{userDetails?.subcaste || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Gotra</TableCell>
                <TableCell>{userDetails?.gotra || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rashi</TableCell>
                <TableCell>{userDetails?.rashi || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default FamilyPop;
