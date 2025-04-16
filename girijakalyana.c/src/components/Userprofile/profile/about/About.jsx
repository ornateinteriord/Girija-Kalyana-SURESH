import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


import TokenService from "../../../token/tokenService";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import { LoadingComponent } from "../../../../App";


const About = () => {
  const registerNo = TokenService.getRegistrationNo();
  const [isEditing, setIsEditing] = useState(false);
      // Form state
      const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        pincode: '',
        address: '',
        occupation_country: '',
        mother_tounge: '',
        state: '',
        mobile_no: '',
        email_id: '',
        age: ''
      });

      
  // Fetch profile data
  const { 
    data: userProfile, 
    isLoading, 
    isError,
    error
  } = useGetMemberDetails(registerNo);

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);
  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      pincode: '',
      address: '',
      occupation_country: '',
      mother_tounge: '',
      state: '',
      mobile_no: '',
      email_id: '',
      age: ''
    });
  };

  // Initialize form when data loads
  useEffect(() => {
    if (userProfile) {
      setFormData({
        ...userProfile,
        date_of_birth: userProfile.date_of_birth?.split('T')[0] || ""
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => setIsEditing(false)
    });
  };



  return (
    <Box sx={{
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      p: 3,
      maxWidth: 1200,
      mx: 'auto'
    }}>
      {/* Header with edit button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Profile Information
        </Typography>
        <Button
          variant={isEditing ? "outlined" : "contained"}
          color={isEditing ? "error" : "primary"}
          onClick={() => setIsEditing(!isEditing)}
          disabled={isUpdating}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Box>

      {/* Two-column form layout */}
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
        {/* Personal Information */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Personal Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
          </Stack>
        </Box>

        {/* Contact Information */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Contact Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Mobile Number"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Email"
              name="email_id"
              type="email"
              value={formData.email_id}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
          </Stack>
        </Box>

        {/* Location Information */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Location Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Pin Code"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            <TextField
              label="Occupation Country"
              name="occupation_country"
              value={formData.occupation_country}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
          </Stack>
        </Box>

        {/* Additional Information */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Additional Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Mother Tongue"
              name="mother_tounge"
              value={formData.mother_tounge}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
          </Stack>
        </Box>
      </Box>

      {/* Save/Reset buttons */}
      {isEditing && (
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            disabled={isUpdating}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isUpdating}
            startIcon={isUpdating ? <CircularProgress size={20} /> : null}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      )}
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default About;