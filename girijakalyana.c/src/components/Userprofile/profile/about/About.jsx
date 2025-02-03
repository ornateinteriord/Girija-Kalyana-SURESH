import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import toast from "react-hot-toast";

const About = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [occupationCountry, setOccupationCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get user ID from localStorage
        if (!userId) {
          toast.error("User ID not found. Please log in again.");
          return;
        }

        // Fetch user data from the backend
        const { data } = await axios.get(`http://localhost:5000/api/about/${userId}`);
      
        const formattedDob = data.dob ? new Date(data.dob).toISOString().split('T')[0] : "";

        // Set state with the fetched data
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setDob(formattedDob);
        setPincode(data.pincode || "");
        setAddress(data.address || "");
        setOccupationCountry(data.occupationCountry || "");
        setLanguage(data.language || "");
        setState(data.state || "");
        setMobile(data.mobile || "");
        setEmail(data.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please login again.");
        return;
      }

      const updatedData = {
        firstName,
        lastName,
        dob,
        pincode,
        address,
        state,
        occupationCountry,
        language,
        mobile,
        email
      };

      // Send the updated data to the backend
      await axios.patch(`http://localhost:5000/api/update/${userId}`, updatedData);

      toast.success("User updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data.");
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setPincode("");
    setAddress("");
    setState("");
    setOccupationCountry("");
    setLanguage("");
    setMobile("");
    setEmail("");
  };

  return (
    <>
    <Box
      sx={{
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        width: "90%",
        // padding:'0px 10px'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant={isEditing ? "outlined" : "contained"}
          style={{
            cursor: "pointer",
            color: "#fff",
            fontSize: "16px",
            background: `${isEditing ? "red" : "#34495e"}`,
            textTransform: "capitalize",
            marginRight: "62px",
            border: "none",
          }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </Box>

      <Stack>
        <Box sx={{ display: "flex", gap: "20px", justifyContent: "space-evenly",padding:1 }} >
          <Box>
            <Typography variant="h5" fontWeight={700} color="#34495e" gutterBottom>
            Personal Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
              <TextField
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
              <TextField
                label="Email"
                value={email}
                disabled={!isEditing}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "500px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} color="#34495e" gutterBottom>
             Basic Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
              <TextField
                label="Pin Code"
                placeholder="Pin Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
               <TextField
                label="State"
                placeholder="State name"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />

              <TextField
                label="Language"
                placeholder="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
              <TextField
                label=" Country"
                placeholder="Occupation Country"
                value={occupationCountry}
                onChange={(e) => setOccupationCountry(e.target.value)}
                disabled={!isEditing}
                sx={{ width: "500px" }}
              />
            </Stack>
          </Box>
        </Box>
      </Stack>

      {isEditing && (
        <Box mt={1} display="flex" gap={2} sx={{ marginRight: "62px",marginBottom:1 }} justifySelf="flex-end">
          <Button
            variant="contained"
            sx={{ background: "#34495e", textTransform: "capitalize" }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ background: "#34495e", textTransform: "capitalize" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
    </>
  );
};

export default About;
