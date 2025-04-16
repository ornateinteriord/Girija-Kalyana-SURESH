import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";
import { LoadingComponent } from "../../../../App";
import { toast } from "react-toastify";

const LifeStyle = () => {
  const registerNo = TokenService.getRegistrationNo();
  const [formData, setFormData] = useState({
    drink: "",
    smoke: "",
    diet: "",
    sunsign: "",
    bloodgroup: "",
    body_type: "", 
    skin_type: ""  
  });

  const { 
    data: userProfile, 
    isLoading, 
    isError,
    error 
  } = useGetMemberDetails(registerNo);

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
      if (userProfile) {
        setFormData({
          ...userProfile,
        });
      }
    }, [userProfile]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData, {
    });
  };

  const handleClear = () => {
    setFormData({
      drink: "",
      smoke: "",
      diet: "",
      sunsign: "",
      bloodgroup: "",
      body_type: "",
      skin_type: ""
    });
  };

  useEffect(() => {
     if (isError) {
       toast.error(error.message);
     }
   }, [isError, error]);

  return (
    <Box sx={{ fontFamily: "Outfit, sans-serif", padding: "16px", width: "80%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="#34495e" fontWeight={700}>
          Life Style & Appearance
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", rowGap: "24px" }}>
        {/* Drink */}
        <TextField
          select
          name="drink"
          label="Drink"
          fullWidth
          value={formData.drink}
          onChange={handleChange}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Occasionally">Occasionally</MenuItem>
        </TextField>

        {/* Smoke */}
        <TextField
          select
          name="smoke"
          label="Smoke"
          fullWidth
          value={formData.smoke}
          onChange={handleChange}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Occasionally">Occasionally</MenuItem>
        </TextField>

        {/* Diet */}
        <TextField
          select
          name="diet"
          label="Diet"
          fullWidth
          value={formData.diet}
          onChange={handleChange}
        >
          <MenuItem value="Veg">Veg</MenuItem>
          <MenuItem value="Non-Veg">Non-Veg</MenuItem>
          <MenuItem value="Eggetarian">Eggetarian</MenuItem>
        </TextField>

        {/* Sunsign */}
        <TextField
          select
          name="sunsign"
          label="Sunsign"
          fullWidth
          value={formData.sunsign}
          onChange={handleChange}
        >
          <MenuItem value="Aries">Aries</MenuItem>
          <MenuItem value="Taurus">Taurus</MenuItem>
          <MenuItem value="Gemini">Gemini</MenuItem>
          <MenuItem value="Cancer">Cancer</MenuItem>
        </TextField>

        {/* Blood Group */}
        <TextField
          select
          name="bloodgroup"
          label="Blood Group"
          fullWidth
          value={formData.bloodgroup}
          onChange={handleChange}
        >
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="O+">O+</MenuItem>
          <MenuItem value="AB+">AB+</MenuItem>
        </TextField>

        {/* Body Type */}
        <TextField
          select
          name="body_type"
          label="Body Type"
          fullWidth
          value={formData.body_type}
          onChange={handleChange}
        >
          <MenuItem value="Slim">Slim</MenuItem>
          <MenuItem value="Athletic">Athletic</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
        </TextField>

        {/* Skin Type */}
        <TextField
          select
          name="skin_type"
          label="Skin Type"
          fullWidth
          value={formData.skin_type}
          onChange={handleChange}
        >
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Wheatish">Wheatish</MenuItem>
          <MenuItem value="Dark">Dark</MenuItem>
        </TextField>
      </Box>
     
      <Box display="flex" justifyContent="end" gap={1} mt={3}>
        <Button 
          variant="outlined" 
          sx={{background:'#34495e',color:'#fff',border:'none'}} 
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button 
          variant="contained" 
          sx={{background:'#34495e'}} 
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </Box>
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default LifeStyle;