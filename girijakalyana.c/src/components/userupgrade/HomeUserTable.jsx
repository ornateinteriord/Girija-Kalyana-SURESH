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
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/membership"; // Update this URL if needed

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
    <Box>
      <Container maxWidth="lg" sx={{ my: 2, px: { xs: 2, sm: 3, md: 5 } }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight={700} color="primary">
            Upgrade Your Membership
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} fontSize={{ xs: 14, sm: 16 }}>
            Choose your plan and enjoy <strong>exclusive benefits</strong> tailored for you!
          </Typography>
        </Box>
  
        {currentMembership && (
          <Box
            sx={{
              border: '1px solid black',
              p: { xs: 2, sm: 3 },
              borderRadius: '10px',
              background: 'black',
              color: '#fff',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 4,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Current Plan: <span>{currentMembership.type}</span>
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              Price: {currentMembership.price}
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                background: 'red',
                color: '#fff',
                textTransform: 'capitalize',
                border: 'none',
                px: 3,
                py: 1,
              }}
              onClick={handleRemoveMembership}
            >
              Remove Membership
            </Button>
          </Box>
        )}
  
        <Grid container spacing={3} justifyContent="center">
          {membershipOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.type}>
              <Card
                sx={{

                  width:280,
                  
                  textAlign: 'center',
                  boxShadow: 6,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: option.gradient,
                  color: '#fff',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    {option.type} Membership
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, opacity: 0.9 }}>
                    {option.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#fff',
                      color: '#333',
                      fontWeight: 'bold',
                      borderRadius: '20px',
                      textTransform: 'capitalize',
                      '&:hover': { backgroundColor: '#eee' },
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
  
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontSize: { xs: '18px', sm: '22px' },
            fontWeight: 700,
            textAlign: 'center',
            p: 3,
          }}
        >
          {selectedPlan?.type} Membership
          <IconButton sx={{ position: 'absolute', right: 15, top: 15 }} onClick={handleClose}>
            <AiOutlineClose size={24} />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Benefits of {selectedPlan?.type} Plan:
          </Typography>
          <ul style={{ paddingLeft: '1.2rem' }}>
            {selectedPlan?.benefits.map((benefit, index) => (
              <Typography key={index} variant="body1" component="li" sx={{ fontSize: '16px' }}>
                {benefit}
              </Typography>
            ))}
          </ul>
        </DialogContent>
  
        <DialogActions
          sx={{ flexDirection: 'column', alignItems: 'center', gap: 2, pb: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total: {selectedPlan?.price}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '12px',
              px: 4,
              py: 1,
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
