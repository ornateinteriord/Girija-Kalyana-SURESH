import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@mui/material";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";
import toast from "react-hot-toast";
import rawJsonData from "../eduction/jsondata/data.json";

//  Convert array of objects into a single merged object
const jsonData = rawJsonData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

const Education = () => {
  const registerNo = TokenService.getRegistrationNo();

  const [formData, setFormData] = useState({
    educational_qualification: "",
    occupation: "",
    income_per_month: "",
    occupation_country: ""
  });

  const [customDegree, setCustomDegree] = useState(false);
  const [customOccupation, setCustomOccupation] = useState(false);
  const [customIncome, setCustomIncome] = useState(false);
  const [customCountry, setCustomCountry] = useState(false);

  const { data: userProfile, isLoading: profileLoading, isError: profileError } = useGetMemberDetails(registerNo);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (userProfile) {
      setFormData({
     ...userProfile
      });
    }
  }, [userProfile]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData,
      {  },
     
    );
  };

  const handleClear = () => {
    setFormData({
      educational_qualification: "",
      occupation: "",
      income_per_month: "",
      occupation_country: ""
    });
    setCustomDegree(false);
    setCustomOccupation(false);
    setCustomIncome(false);
    setCustomCountry(false);
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
        <Typography color="error">Failed to load education data</Typography>
      </Box>
    );
  }

  const textFieldStyle = { width: "450px" };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px", width: '73%' }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom sx={{ color: "#34495e" }}>
          Education & Occupation
        </Typography>
        <form>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" gap={3}>
              <Box marginBottom={5}>
                <FormControlLabel
                  control={<Checkbox checked={customDegree} onChange={(e) => setCustomDegree(e.target.checked)} />}
                  label="Enter your Qualification"
                />
               {!customDegree && (
  <TextField
    label="Qualification"
    value={formData.educational_qualification}
    onChange={(e) => handleChange("educational_qualification", e.target.value)}
    select
    sx={textFieldStyle}
  >
    {(jsonData.qualificationValues || []).map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
)}


                <FormControlLabel
                  control={<Checkbox checked={customOccupation} onChange={(e) => setCustomOccupation(e.target.checked)} />}
                  label="Enter your Occupation"
                />
                {!customOccupation && (
  <TextField
    label="Occupation"
    value={formData.occupation}
    onChange={(e) => handleChange("occupation", e.target.value)}
    select
    sx={textFieldStyle}
  >
    {(jsonData.occupationValues || []).map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
)}

              </Box>

              <Box marginBottom={5}>
                <FormControlLabel
                  control={<Checkbox checked={customIncome} onChange={(e) => setCustomIncome(e.target.checked)} />}
                  label="Enter your Income"
                />
              {!customIncome && (
  <TextField
    label="Income Per Month"
    value={formData.income_per_month}
    onChange={(e) => handleChange("income_per_month", e.target.value)}
    select
    sx={textFieldStyle}
  >
    {(jsonData.incomeValues || []).map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
)}


                <FormControlLabel
                  control={<Checkbox checked={customCountry} onChange={(e) => setCustomCountry(e.target.checked)} />}
                  label="Enter your Occupation Country"
                />
              {!customCountry && (
  <TextField
    label="Occupation Country"
    value={formData.occupation_country}
    onChange={(e) => handleChange("occupation_country", e.target.value)}
    select
    sx={textFieldStyle}
  >
    {(jsonData.countries || []).map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
)}

              </Box>
            </Box>
          </Stack>

          <Box sx={{ mt: 3, justifySelf: 'flex-end', display: 'flex', gap: '10px' }}>
            <Button
              onClick={handleClear}
              variant="contained"
              sx={{
                backgroundColor: "#34495e",
                textTransform: "capitalize",
                "&:hover": { backgroundColor: "#2c3e50" }
              }}
            >
              Clear
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={isUpdating}
              sx={{
                backgroundColor: "#34495e",
                textTransform: "capitalize",
                "&:hover": { backgroundColor: "#2c3e50" }
              }}
            >
              {isUpdating ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};

export default Education;
