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
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const Education = () => {
  const [degree, setDegree] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [occupationCountry, setOccupationCountry] = useState("");
  const [userId,setUserId] = useState("");
 
  // Toggle between dropdown and text input for each field
  const [customDegree, setCustomDegree] = useState(false);
  const [customOccupation, setCustomOccupation] = useState(false);
  const [customIncome, setCustomIncome] = useState(false);
  const [customCountry, setCustomCountry] = useState(false);

  // Manually defined options
  const qualificationOptions = ["B.E/B.Tech", "M.E/M.Tech", "MBA", "Ph.D", "Diploma"];
  const occupationOptions = ["Software Engineer", "Doctor", "Teacher", "Business Owner", "Artist"];
  const incomeOptions = ["Less than 5Lakh", "5Lakh-10Lakh", "10Lakh-15Lakh", "16Lakh-18Lakh", "More than 18Lakh"];
  const countryOptions = ["India", "USA", "UK", "Canada", "Australia"];

  const [education, setEducation] = useState(null); // Store education data
  const [isNewRecord, setIsNewRecord] = useState(false); // Track if no existing record
  const [error, setError] = useState(null); // Handle errors

  const [user, setUser] = useState(null); // Store the entire user object

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const userData = sessionStorage.getItem("userData");
              if (userData) {
                  const { _id: userId } = JSON.parse(userData);
                  const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
                  setUser(response.data); // Store the entire user object
                  if (response.data.education) {
                      setDegree(response.data.education.degree || "");
                      setOccupation(response.data.education.occupation || "");
                      setIncome(response.data.education.income || "");
                      setOccupationCountry(response.data.education.occupationCountry || "");
                      setIsNewRecord(false);
                  } else {
                      setIsNewRecord(true);
                  }
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
              setIsNewRecord(true);
          }
      };

      fetchUserData();
  }, []);


  const handleSave = async (e) => {
    e.preventDefault();

    const educationData = {
      degree,
      occupation,
      income,
      occupationCountry,
    };

    if (!degree || !occupation || !income || !occupationCountry) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    try {
      const userData = sessionStorage.getItem("userData");
      const { _id: userId } = JSON.parse(userData);

    
      let response;
      if (isNewRecord) {
        response = await axios.post("http://localhost:5000/api/education", {
          userId,
          ...educationData,
        });
        toast.success("Education data saved successfully!", response.data);
        setUser(response.data.user); // Update local user state after save
        if(response.data.user.education){
          setIsNewRecord(false)
        }
      } else {
        response = await axios.put(`http://localhost:5000/api/education/${userId}`,{
          userId,
          ...educationData,
        });
        toast.success("Education data updated successfully!", response.data);
        setEducation(response.data); // Update state with updated data after PUT
      }
    } catch (error) {
      console.error("Error saving/updating data:", error);
      if (error.response) {
        toast.error(`Server Error: ${error.response.data.error || "Unknown error occurred"}`);
      } else {
        toast.error("Network Error. Please try again.");
      }
    }
  };


  const handleClear = () => {
    setDegree("");
    setOccupation("");
    setIncome("");
    setOccupationCountry("");
    setCustomDegree(false);
    setCustomOccupation(false);
    setCustomIncome(false);
    setCustomCountry(false);
  };

  const textFieldStyle = { width: "450px" };

  return (
    <Box sx={{  backgroundColor: "#f9f9f9", borderRadius: "8px",  width:'73%' }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom sx={{ color: "#34495e" }}>
          Education & Occupation
        </Typography>
        <form >
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" gap={3} >
              <Box marginBottom={5}>
                <FormControlLabel
                  control={<Checkbox checked={customDegree} onChange={(e) => setCustomDegree(e.target.checked)} />}
                  label="Enter your Qualification"
                />
                {customDegree ? (
                  <TextField label="Qualification" value={degree} onChange={(e) => setDegree(e.target.value)} sx={textFieldStyle} />
                ) : (
                  <TextField label="Qualification" value={degree} onChange={(e) => setDegree(e.target.value)} select sx={textFieldStyle}>
                    {qualificationOptions.map((option, index) => (
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
                {customOccupation ? (
                  <TextField label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} sx={textFieldStyle} />
                ) : (
                  <TextField label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} select sx={textFieldStyle}>
                    {occupationOptions.map((option, index) => (
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
                {customIncome ? (
                  <TextField label="Income Per Annum" value={income} onChange={(e) => setIncome(e.target.value)} sx={textFieldStyle} />
                ) : (
                  <TextField label="Income Per Annum" value={income} onChange={(e) => setIncome(e.target.value)} select sx={textFieldStyle}>
                    {incomeOptions.map((option, index) => (
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
                {customCountry ? (
                  <TextField label="Occupation Country" value={occupationCountry} onChange={(e) => setOccupationCountry(e.target.value)} sx={textFieldStyle} />
                ) : (
                  <TextField label="Occupation Country" value={occupationCountry} onChange={(e) => setOccupationCountry(e.target.value)} select sx={textFieldStyle}>
                    {countryOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Box>
            </Box>
          </Stack>

          <Box sx={{ mt: 3,  justifySelf:'flex-end',display:'flex', gap:'10px'  }}>
            <Button onClick={handleClear} variant="contained" sx={{ backgroundColor: "#34495e", textTransform: "capitalize", "&:hover": { backgroundColor: "#2c3e50" } }}>
              Clear
            </Button>
            <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#34495e", textTransform: "capitalize", "&:hover": { backgroundColor: "#2c3e50" } }}>
              Save
            </Button>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};

export default Education;
