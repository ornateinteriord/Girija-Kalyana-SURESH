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
} from "@mui/material";
import jsonData from "../eduction/jsondata/data.json";
import toast from "react-hot-toast";
import axios from "axios";

const ParentsPrefer = () => {
  const datas = jsonData;

  const [preferences, setPreferences] = useState({
    caste: "",
    fromAge: "",
    toAge: "",
    fromHeight: "",
    toHeight: "",
    occupation: "",
    maritalStatus: "",
    education: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        toast.error("No user data found. Please log in.");
        return;
      }
      const { _id: userId } = JSON.parse(userData);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/parentsPrefer/${userId}`
        );
        const parentPrefer = response.data?.parentPrefer || {};
        setPreferences({
          caste: parentPrefer.caste || "",
          fromAge: parentPrefer.fromAge || "",
          toAge: parentPrefer.toAge || "",
          fromHeight: parentPrefer.fromHeight || "",
          toHeight: parentPrefer.toHeight || "",
          occupation: parentPrefer.occupation || "",
          maritalStatus: parentPrefer.maritalStatus || "",
          education: parentPrefer.education || "",
        });
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Failed to load preferences.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      toast.error("No user data found. Please log in.");
      return;
    }

    const { _id: userId } = JSON.parse(userData);

    const payload = {
      userId,
      parentPrefer: preferences,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/parentsPrefer",
        payload
      );
      toast.success("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences.");
    }
  };

  const handleReset = () => {
    setPreferences({
      caste: "",
      fromAge: "",
      toAge: "",
      fromHeight: "",
      toHeight: "",
      occupation: "",
      maritalStatus: "",
      education: "",
    });
  };

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
        <Box flex={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
      <InputLabel id="caste-label">Caste Preference</InputLabel>
      <Select
        labelId="caste-label"
        value={preferences.caste}
        onChange={(e) => handleChange("caste", e.target.value)}
        label="Caste Preference" // Ensures label fits within the outlined border
      >
                  {datas[0].casteValues.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.fromAge}>Age Preference (From)</InputLabel>
                <Select
                  value={preferences.fromAge}
                  onChange={(e) => handleChange("fromAge", e.target.value)}
                  label="Age Preference  (From)"
                >
                  {datas[9].minAge.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.fromHeight}>Height Preference (From)</InputLabel>
                <Select
                  value={preferences.fromHeight}
                  onChange={(e) => handleChange("fromHeight", e.target.value)}
                    label="Height Preference (From)"
                >
                  {datas[5].heightValues.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.occupation}>Occupation Country</InputLabel>
                <Select
                  value={preferences.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                   label="Occupation Country"
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box flex={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.education}>Education Preference</InputLabel>
                <Select
                  value={preferences.education}
                  onChange={(e) => handleChange("education", e.target.value)}
                   label="Education Preference"
                >
                  {datas[4].qualificationValues.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.toAge}>Age Preference (To)</InputLabel>
                <Select
                  value={preferences.toAge}
                  onChange={(e) => handleChange("toAge", e.target.value)}
                    label="Age Preference (To)"
                >
                  {datas[9].minAge.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.toHeight}>Height Preference (To)</InputLabel>
                <Select
                  value={preferences.toHeight}
                  onChange={(e) => handleChange("toHeight", e.target.value)}
                   label="Height Preference (To)"
                >
                  {datas[5].heightValues.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink={!!preferences.maritalStatus}>Marital Status</InputLabel>
                <Select
                  value={preferences.maritalStatus}
                  onChange={(e) => handleChange("maritalStatus", e.target.value)}
                  label="Marital Status"
                >
                  {datas[6].marritalStatus.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      <Box
        sx={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#34495e",
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{
            backgroundColor: "#34495e",
            color: "#fff",
            border: "none",
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default memo(ParentsPrefer);
