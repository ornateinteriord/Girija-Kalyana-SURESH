import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";
import toast from "react-hot-toast";
import rawJsonData from "../eduction/jsondata/data.json";

// Merge array of JSON objects into one object
const jsonData = rawJsonData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

const Education = () => {
  const registerNo = TokenService.getRegistrationNo();

  const [formData, setFormData] = useState({
    educational_qualification: "",
    occupation: "",
    income_per_month: "",
    occupation_country: ""
  });

  const [showCustomDegree, setShowCustomDegree] = useState(false);
  const [showCustomOccupation, setShowCustomOccupation] = useState(false);
  const [showCustomIncome, setShowCustomIncome] = useState(false);
  const [showCustomCountry, setShowCustomCountry] = useState(false);

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

  const handleSelectChange = (field, value) => {
    if (value === "Other") {
      switch (field) {
        case "educational_qualification":
          setShowCustomDegree(true);
          handleChange(field, "");
          break;
        case "occupation":
          setShowCustomOccupation(true);
          handleChange(field, "");
          break;
        case "income_per_month":
          setShowCustomIncome(true);
          handleChange(field, "");
          break;
        case "occupation_country":
          setShowCustomCountry(true);
          handleChange(field, "");
          break;
        default:
          break;
      }
    } else {
      handleChange(field, value);
    }
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => toast.success("Profile updated successfully!"),
      onError: () => toast.error("Failed to update profile.")
    });
  };

  const handleClear = () => {
    setFormData({
      educational_qualification: "",
      occupation: "",
      income_per_month: "",
      occupation_country: ""
    });
    setShowCustomDegree(false);
    setShowCustomOccupation(false);
    setShowCustomIncome(false);
    setShowCustomCountry(false);
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
            <Box display="flex" justifyContent="space-evenly" alignItems="center" gap={6}>
              <Box marginBottom={5} padding={6} >
                {showCustomDegree ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      label="Qualification"
                      value={formData.educational_qualification}
                      onChange={(e) => handleChange("educational_qualification", e.target.value)}
                      sx={textFieldStyle}
                      
                    />
                    <Button size="small" onClick={() => {
                      setShowCustomDegree(false);
                      handleChange("educational_qualification", "");
                    }}>Cancel</Button>
                  </Box>
                ) : (
                  <TextField
                    label="Qualification"
                    value={formData.educational_qualification}
                    onChange={(e) => handleSelectChange("educational_qualification", e.target.value)}
                    select
                    sx={textFieldStyle}
                  >
                    {(jsonData.qualificationValues || []).map((option, index) => (
                      <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}

                {showCustomOccupation ? (
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <TextField
                      label="Occupation"
                      value={formData.occupation}
                      onChange={(e) => handleChange("occupation", e.target.value)}
                      sx={textFieldStyle}
                    />
                    <Button size="small" onClick={() => {
                      setShowCustomOccupation(false);
                      handleChange("occupation", "");
                    }}>Cancel</Button>
                  </Box>
                ) : (
                  <TextField
                    label="Occupation"
                    value={formData.occupation}
                    onChange={(e) => handleSelectChange("occupation", e.target.value)}
                    select
                    sx={{ ...textFieldStyle, mt: 2 }}
                  >
                    {(jsonData.occupationValues || []).map((option, index) => (
                      <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}
              </Box>

              <Box marginBottom={5}>
                {showCustomIncome ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                      label="Income Per Month"
                      value={formData.income_per_month}
                      onChange={(e) => handleChange("income_per_month", e.target.value)}
                      sx={textFieldStyle}
                    />
                    <Button size="small" onClick={() => {
                      setShowCustomIncome(false);
                      handleChange("income_per_month", "");
                    }}>Cancel</Button>
                  </Box>
                ) : (
                  <TextField
                    label="Income Per Month"
                    value={formData.income_per_month}
                    onChange={(e) => handleSelectChange("income_per_month", e.target.value)}
                    select
                    sx={textFieldStyle}
                  >
                    {(jsonData.incomeValues || []).map((option, index) => (
                      <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}

                {showCustomCountry ? (
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <TextField
                      label="Occupation Country"
                      value={formData.occupation_country}
                      onChange={(e) => handleChange("occupation_country", e.target.value)}
                      sx={textFieldStyle}
                    />
                    <Button size="small" onClick={() => {
                      setShowCustomCountry(false);
                      handleChange("occupation_country", "");
                    }}>Cancel</Button>
                  </Box>
                ) : (
                  <TextField
                    label="Occupation Country"
                    value={formData.occupation_country}
                    onChange={(e) => handleSelectChange("occupation_country", e.target.value)}
                    select
                    sx={{ ...textFieldStyle, mt: 2 }}
                  >
                    {(jsonData.countries || []).map((option, index) => (
                      <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                )}
              </Box>
            </Box>
          </Stack>

          <Box sx={{ mt: 0, justifySelf: 'flex-end', display: 'flex', gap: '10px' }}>
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
