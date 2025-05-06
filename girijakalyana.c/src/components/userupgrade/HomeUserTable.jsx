import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/membership";

const membershipOptions = [
  { 
    type: "Silver", 
    price: "$10/month", 
    color: "#b0bec5", 
    gradient: "linear-gradient(135deg, #b0bec5, #78909c)", 
    benefits: ["Basic Support", "Access to limited features", "Community Forum Access"]
  },
  { 
    type: "Gold", 
    price: "$20/month", 
    color: "#ffd700", 
    gradient: "linear-gradient(135deg, #ffd700, #ffb300)", 
    benefits: ["Priority Support", "Access to most features", "Exclusive Webinars"]
  },
  { 
    type: "Diamond", 
    price: "$50/month", 
    color: "#00bcd4", 
    gradient: "linear-gradient(135deg, #00bcd4, #00838f)", 
    benefits: ["24/7 VIP Support", "All Features Unlocked", "One-on-One Mentorship"]
  },
];

const HomeUserTable = ({ userId }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentMembership, setCurrentMembership] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userIdFromStorage = userData?._id;

        if (!userIdFromStorage) {
          console.error("No user ID found in session storage.");
          return;
        }

        console.log(`Fetching membership for user: ${userIdFromStorage}`);
        const response = await axios.get(`${API_BASE_URL}/${userIdFromStorage}`);
        console.log("API Response:", response.data);
        setCurrentMembership(response.data);
      } catch (error) {
        console.error("Error fetching membership:", error.response?.data || error);
      }
    };

    fetchMembership();
  }, []);

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedPlan) return;

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userIdFromStorage = userData?._id;

    if (!userIdFromStorage) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/${userIdFromStorage}`, {
        type: selectedPlan.type,
        price: selectedPlan.price,
      });

      setCurrentMembership(response.data.membership);
      toast.success(response.data.message);
      setOpen(false);
    } catch (error) {
      console.error("Error upgrading membership:", error);
      toast.error(error.response?.data?.message || "Failed to upgrade membership!");
    }
  };

  const handleRemoveMembership = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userIdFromStorage = userData?._id;

    if (!userIdFromStorage) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/${userIdFromStorage}`);
      setCurrentMembership(response.data.membership);
      toast.success("Membership removed successfully!");
    } catch (error) {
      toast.error("Failed to remove membership!");
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Container sx={{ 
        mb: 0, 
        mt: 0,
        px: isSmallScreen ? 1 : 3,
        maxWidth: isSmallScreen ? "100%" : "lg"
      }}>
        <Box textAlign="center" mb={3}>
          <Typography 
            variant={isSmallScreen ? "h6" : "h5"} 
            fontWeight={700} 
            color="primary"
            sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
          >
            Upgrade Your Membership
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            mt={1}
            sx={{ fontSize: isSmallScreen ? "0.9rem" : "1rem" }}
          >
            Choose your plan and enjoy <strong>exclusive benefits</strong> tailored for you!
          </Typography>
        </Box>

        {currentMembership && (
          <Box 
            sx={{
              border: '1px solid black',
              padding: isSmallScreen ? '8px' : '10px',
              borderRadius: '10px',
              background: 'black',
              mb: 3,
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: isSmallScreen ? 1 : 0
            }}
          >
            <Typography 
              variant={isSmallScreen ? "subtitle1" : "h6"} 
              sx={{ fontWeight: "bold", color: "#fff", textAlign: isSmallScreen ? 'center' : 'left' }}
            >
              Current Plan: <span style={{ color: "#fff" }}>{currentMembership.type}</span>
            </Typography>
            <Typography 
              variant={isSmallScreen ? "subtitle1" : "h6"} 
              sx={{ color: "#fff", fontWeight: 'bold', textAlign: isSmallScreen ? 'center' : 'left' }}
            >
              Price: {currentMembership.price}
            </Typography>
            <Button
              variant="outlined"
              sx={{ 
                fontSize: isSmallScreen ? '14px' : '16px', 
                fontWeight: "bold",
                background: 'red',
                color: '#fff',
                textTransform: 'capitalize',
                border: 'none',
                width: isSmallScreen ? '100%' : 'auto',
                mt: isSmallScreen ? 1 : 0
              }}
              onClick={handleRemoveMembership}
            >
              Remove Membership
            </Button>
          </Box>
        )}

        <Grid 
          container 
          spacing={isSmallScreen ? 2 : 4} 
          justifyContent="center"
          sx={{ 
            padding: isSmallScreen ? '0 8px' : 0,
            marginLeft: isSmallScreen ? '-8px' : 0 
          }}
        >
          {membershipOptions.map((option) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={option.type}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: isSmallScreen ? '100%' : '400px'
              }}
            >
              <Card 
                sx={{ 
                  p: 0, 
                  textAlign: "center", 
                  boxShadow: 6, 
                  borderRadius: 3, 
                  position: "relative",
                  overflow: "hidden",
                  background: option.gradient,
                  color: "#fff",
                  width: '300px',
                  marginBottom:'15px'
                }}
              >
                <CardContent sx={{ p: isSmallScreen ? 2 : 3 }}>
                  <Typography 
                    variant={isSmallScreen ? "h6" : "h5"} 
                    fontWeight={700}
                    sx={{ fontSize: isSmallScreen ? '1.25rem' : '1.5rem' }}
                  >
                    {option.type} Membership
                  </Typography>
                  <Typography 
                    variant={isSmallScreen ? "subtitle1" : "h6"} 
                    sx={{ mt: 0, opacity: 0.9 }}
                  >
                    {option.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#fff",
                      color: "#333",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      fontSize: isSmallScreen ? '0.875rem' : '1rem',
                      padding: isSmallScreen ? '6px 16px' : '8px 22px',
                      "&:hover": { backgroundColor: "#eee" },
                    }}
                    onClick={() => handleUpgrade(option)}
                  >
                    Upgrade to {option.type}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isSmallScreen}
      >
        <DialogTitle 
          sx={{ 
            fontSize: isSmallScreen ? "1.25rem" : "1.5rem", 
            fontWeight: 700, 
            textAlign: "center", 
            p: isSmallScreen ? 2 : 3 
          }}
        >
          {selectedPlan?.type} Membership
          <IconButton 
            sx={{ 
              position: "absolute", 
              right: isSmallScreen ? 8 : 15, 
              top: isSmallScreen ? 8 : 15 
            }} 
            onClick={handleClose}
          >
            <AiOutlineClose size={isSmallScreen ? 20 : 24} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ p: isSmallScreen ? 2 : 3 }}>
          <Typography 
            variant={isSmallScreen ? "h6" : "h5"} 
            gutterBottom 
            sx={{ 
              textAlign: "center", 
              mb: 2,
              fontSize: isSmallScreen ? '1.1rem' : '1.25rem'
            }}
          >
            Benefits of {selectedPlan?.type} Plan:
          </Typography>
          <Box component="ul" sx={{ pl: isSmallScreen ? 2 : 3, mb: 0 }}>
            {selectedPlan?.benefits.map((benefit, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                component="li" 
                sx={{ 
                  fontSize: isSmallScreen ? "0.9rem" : "1rem",
                  mb: 1
                }}
              >
                {benefit}
              </Typography>
            ))}
          </Box>
        </DialogContent>

        <DialogActions 
          sx={{ 
            flexDirection: "column", 
            alignItems: "center", 
            p: isSmallScreen ? 2 : 3,
            pt: 1
          }}
        >
          <Typography 
            variant={isSmallScreen ? "h6" : "h5"} 
            sx={{ 
              fontWeight: "bold", 
              mb: 1,
              fontSize: isSmallScreen ? '1.1rem' : '1.25rem'
            }}
          >
            Total: {selectedPlan?.price}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ 
              fontWeight: "bold", 
              fontSize: isSmallScreen ? "1rem" : "1.125rem", 
              borderRadius: "12px", 
              padding: isSmallScreen ? "6px 20px" : "8px 24px",
              width: isSmallScreen ? '100%' : 'auto'
            }}
            onClick={handleConfirmUpgrade}
          >
            Proceed to Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeUserTable;