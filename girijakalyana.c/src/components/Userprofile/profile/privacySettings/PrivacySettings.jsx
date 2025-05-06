import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FaRegImage } from "react-icons/fa";

const privacyOptions = [
  "Display Photo",
  "Display Only to Paid Users",
  "Display Photo on Request",
];

const PrivacySettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "100%",
        margin: "auto",
        fontFamily: "Roboto, sans-serif",
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "start",
          marginBottom: "24px",
          fontWeight: "bold",
          color: "#34495e",
          fontSize: "1.75rem",
        }}
      >
        Privacy Settings
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "1fr" ,
            lg: "1fr ",
          },
        }}
      >
        {privacyOptions.map((option, index) => (
          <Box
            key={index}
            sx={{
                maxWidth:'550px',
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
            <FaRegImage size={isMobile ? 24 : 32} color="#1976d2" />
            <Typography
              variant="h6"
              sx={{
                fontSize: {xs:'16px',md:'18px'},
                color: "#555",
                fontWeight: 500,
                p:1,
                maxWidth:'600px'
              }}
            >
              {option}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PrivacySettings;
