import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";
import rawJsonData from "../eduction/jsondata/data.json";
import toast from "react-hot-toast";
import { useGetMemberDetails, useUpdateProfile } from "../../../api/User/useGetProfileDetails";
import TokenService from "../../../token/tokenService";

const datas = rawJsonData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

const ParentsPrefer = () => {
  const registerNo = TokenService.getRegistrationNo();

  const [formData, setFormData] = useState({
    caste_preference: "",
    from_age_preference: "",
    to_age_preference: "",
    from_height_preference: "",
    to_height_preference: "",
    occupation_country_preference: "",
    maritalstatus_preference: "",
    education_preference: ""
  });

  const { data: userProfile, isLoading: profileLoading, isError: profileError } = useGetMemberDetails(registerNo);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (userProfile) {
      setFormData({
        caste_preference: userProfile.caste_preference || "",
        from_age_preference: userProfile.from_age_preference || "",
        to_age_preference: userProfile.to_age_preference || "",
        from_height_preference: userProfile.from_height_preference || "",
        to_height_preference: userProfile.to_height_preference || "",
        occupation_country_preference: userProfile.occupation_country_preference || "",
        maritalstatus_preference: userProfile.maritalstatus_preference || "",
        education_preference: userProfile.education_preference || ""
      });
    }
  }, [userProfile]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => toast.success("Preferences saved successfully!"),
      onError: () => toast.error("Failed to update preferences.")
    });
  };

  const handleClear = () => {
    setFormData({
      caste_preference: "",
      from_age_preference: "",
      to_age_preference: "",
      from_height_preference: "",
      to_height_preference: "",
      occupation_country_preference: "",
      maritalstatus_preference: "",
      education_preference: ""
    });
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
        <Typography color="error">Failed to load preference data</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Roboto, sans-serif",
        width: "80%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "22px",
          color: "#34495e",
          marginBottom: "24px",
        }}
      >
        Parents' Preference
      </Typography>

      <Stack direction="row" spacing={4}>
        {/* LEFT SIDE */}
        <Box flex={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="caste-label">Caste Preference</InputLabel>
                <Select
                  labelId="caste-label"
                  value={formData.caste_preference}
                  onChange={(e) => handleChange("caste_preference", e.target.value)}
                  label="Caste Preference"
                >
                  {datas?.casteValues?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Age Preference (From)</InputLabel>
                <Select
                  value={formData.from_age_preference}
                  onChange={(e) => handleChange("from_age_preference", e.target.value)}
                  label="Age Preference (From)"
                >
                  {datas?.minAge?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Height Preference (From)</InputLabel>
                <Select
                  value={formData.from_height_preference}
                  onChange={(e) => handleChange("from_height_preference", e.target.value)}
                  label="Height Preference (From)"
                >
                  {datas?.heightValues?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Occupation Country</InputLabel>
                <Select
                  value={formData.occupation_country_preference}
                  onChange={(e) => handleChange("occupation_country_preference", e.target.value)}
                  label="Occupation Country"
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* RIGHT SIDE */}
        <Box flex={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Education Preference</InputLabel>
                <Select
                  value={formData.education_preference}
                  onChange={(e) => handleChange("education_preference", e.target.value)}
                  label="Education Preference"
                >
                  {datas?.qualificationValues?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Age Preference (To)</InputLabel>
                <Select
                  value={formData.to_age_preference}
                  onChange={(e) => handleChange("to_age_preference", e.target.value)}
                  label="Age Preference (To)"
                >
                  {datas?.minAge?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Height Preference (To)</InputLabel>
                <Select
                  value={formData.to_height_preference}
                  onChange={(e) => handleChange("to_height_preference", e.target.value)}
                  label="Height Preference (To)"
                >
                  {datas?.heightValues?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  value={formData.maritalstatus_preference}
                  onChange={(e) => handleChange("maritalstatus_preference", e.target.value)}
                  label="Marital Status"
                >
                  {datas?.marritalStatus?.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      <Box display="flex" justifyContent="end" gap={1} mt={3}>
        <Button
          variant="outlined"
          sx={{ background: "#34495e", color: "#fff", border: "none" }}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#34495e" }}
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default memo(ParentsPrefer);
