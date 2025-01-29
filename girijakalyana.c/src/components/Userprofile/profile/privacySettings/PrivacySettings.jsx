import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { FaRegImage } from "react-icons/fa"; // React icon for the image-related settings

const PrivacySettings = () => {
  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginBottom: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Privacy Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Display Photo Section */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <FaRegImage size={32} color="#1976d2" />
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", color: "#555", fontWeight: "500" }}
          >
            Display Photo
          </Typography>
        </Grid>

        {/* Display Only to Paid Users Section */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <FaRegImage size={32} color="#1976d2" />
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", color: "#555", fontWeight: "500" }}
          >
            Display Only to Paid Users
          </Typography>
        </Grid>

        {/* Display Photo on Request Section */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <FaRegImage size={32} color="#1976d2" />
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", color: "#555", fontWeight: "500" }}
          >
            Display Photo on Request
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrivacySettings;
