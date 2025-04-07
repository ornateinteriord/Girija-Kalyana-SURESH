import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Divider,
} from "@mui/material";
import toast from "react-hot-toast";
import useGetMemberDetails, { useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";


const FamilyReligious = () => {
  const registerNo = TokenService.getRegistrationNo();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    religion: '',
    caste: '',
    subcaste: '',
    gotra: '',
    rashi: '',
    nakshatra: '',
    sunsign: '',
    name_of_parent: '',
    brother_younger_unmarried: '',
    brother_younger_married: '',
    brother_elder_unmarried: '',
    brother_elder_married: '',
    sister_younger_unmarried: '',
    sister_younger_married: '',
    sister_elder_unmarried: '',
    sister_elder_married: ''
  });

  const { data: userProfile, isLoading: profileLoading, isError: profileError } =
    useGetMemberDetails(registerNo);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const handleReset = () => {
      setFormData({
        religion: '',
        caste: '',
        subcaste: '',
        gotra: '',
        rashi: '',
        nakshatra: '',
        sunsign: '',
        name_of_parent: '',
        brother_younger_unmarried: '',
        brother_younger_married: '',
        brother_elder_unmarried: '',
        brother_elder_married: '',
        sister_younger_unmarried: '',
        sister_younger_married: '',
        sister_elder_unmarried: '',
        sister_elder_married: ''
      })
  };

  if (profileLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (profileError) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">Failed to load profile data</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 1200,
        mx: 'auto'
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Family & Religious Information
        </Typography>
        <Button
          variant={isEditing ? 'outlined' : 'contained'}
          color={isEditing ? 'error' : 'primary'}
          onClick={() => setIsEditing(!isEditing)}
          disabled={isUpdating}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </Box>

      {/* Sections */}
      <Stack spacing={4}>
        {/* Religious Section */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Religious Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={2}>
            {[
              { name: 'religion', label: 'Religion' },
              { name: 'caste', label: 'Caste' },
              { name: 'subcaste', label: 'Subcaste' },
              { name: 'gotra', label: 'Gotra' },
              { name: 'rashi', label: 'Rashi' },
              { name: 'nakshatra', label: 'Nakshatra' },
              { name: 'sunsign', label: 'Sun Sign' },
            ].map(({ name, label }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                disabled={!isEditing || isUpdating}
                fullWidth
              />
            ))}
          </Box>
        </Box>

        {/* Family Section */}
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Family Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
            <TextField
              label="Name of Parent"
              name="name_of_parent"
              value={formData.name_of_parent}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
              fullWidth
            />
            {[
              'brother_younger_unmarried',
              'brother_younger_married',
              'brother_elder_unmarried',
              'brother_elder_married',
              'sister_younger_unmarried',
              'sister_younger_married',
              'sister_elder_unmarried',
              'sister_elder_married',
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={!isEditing || isUpdating}
                fullWidth
              />
            ))}
          </Box>
        </Box>
      </Stack>

      {/* Actions */}
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
    </Box>
  );
};

export default FamilyReligious;
