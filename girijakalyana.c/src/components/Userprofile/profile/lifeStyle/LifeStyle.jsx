import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  TextField,
  Button,
 
} from "@mui/material";
import { FaEdit, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const LifeStyle = ({ render }) => {
  const [drink, setDrink] = useState("");
  const [smoke, setSmoke] = useState("");
  const [diet, setDiet] = useState("");
  const [sunsign, setSunsign] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [skinType, setSkinType] = useState("");
  // Fetch user data from localStorage and load their lifestyle
  useEffect(() => {
    const fetchData = async () => {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("No user data found in localStorage");
        return;
      }

      const { _id: userId } = JSON.parse(userData);

      if (!userId) {
        console.error("Invalid userId format:", userId);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/lifeStyle/${userId}`);
        const lifestyle = response.data.lifestyle;

        if (lifestyle) {
          setDrink(lifestyle.drink || "");
          setSmoke(lifestyle.smoke || "");
          setDiet(lifestyle.diet || "");
          setSunsign(lifestyle.sunsign || "");
          setBloodgroup(lifestyle.bloodgroup || "");
          setBodyType(lifestyle.bodyType || "");
          setSkinType(lifestyle.skinType || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  const handleSave = async () => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("No user data found in localStorage");
        return;
      }

      const { _id: userId } = JSON.parse(userData);

      const response = await axios.post("http://localhost:5000/api/lifeStyle", {
        userId,
        drink,
        smoke,
        diet,
        sunsign,
        bloodgroup,
        bodyType,
        skinType,
      });
      toast.success("Lifestyle updated successfully!");
    } catch (error) {
      console.error("Error updating lifestyle:", error);
    }
  };

  

  const handleClear = () => {
    // Reset all fields
    setDrink('');
    setSmoke('');
    setDiet('');
    setSunsign('');
    setBloodgroup('');
    setBodyType('');
    setSkinType('');
  };

  return (
    <>
  <Box
  sx={{
    fontFamily: "Outfit, sans-serif",
    padding: "16px",
    width: "80%",
  }}
>
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
    <Typography variant="h5" color="#34495e" fontWeight={700}>
      Life Style & Appearance
    </Typography>
  </Box>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      rowGap: "24px",
    }}
  >
    {/* Drink */}
    <TextField
      select
      label="Drink"
      fullWidth
      value={drink}
      onChange={(e) => setDrink(e.target.value)}
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
      <MenuItem value="Occasionally">Occasionally</MenuItem>
    </TextField>

    {/* Smoke */}
    <TextField
      select
      label="Smoke"
      fullWidth
      value={smoke}
      onChange={(e) => setSmoke(e.target.value)}
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
      <MenuItem value="Occasionally">Occasionally</MenuItem>
    </TextField>

    {/* Diet */}
    <TextField
      select
      label="Diet"
      fullWidth
      value={diet}
      onChange={(e) => setDiet(e.target.value)}
    >
      <MenuItem value="Veg">Veg</MenuItem>
      <MenuItem value="Non-Veg">Non-Veg</MenuItem>
      <MenuItem value="Eggetarian">Eggetarian</MenuItem>
    </TextField>

    {/* Sunsign */}
    <TextField
      select
      label="Sunsign"
      fullWidth
      value={sunsign}
      onChange={(e) => setSunsign(e.target.value)}
    >
      <MenuItem value="Aries">Aries</MenuItem>
      <MenuItem value="Taurus">Taurus</MenuItem>
      <MenuItem value="Gemini">Gemini</MenuItem>
      <MenuItem value="Cancer">Cancer</MenuItem>
    </TextField>

    {/* Blood Group */}
    <TextField
      select
      label="Blood Group"
      fullWidth
      value={bloodgroup}
      onChange={(e) => setBloodgroup(e.target.value)}
    >
      <MenuItem value="A+">A+</MenuItem>
      <MenuItem value="B+">B+</MenuItem>
      <MenuItem value="O+">O+</MenuItem>
      <MenuItem value="AB+">AB+</MenuItem>
    </TextField>

    {/* Body Type */}
    <TextField
      select
      label="Body Type"
      fullWidth
      value={bodyType}
      onChange={(e) => setBodyType(e.target.value)}
    >
      <MenuItem value="Slim">Slim</MenuItem>
      <MenuItem value="Athletic">Athletic</MenuItem>
      <MenuItem value="Average">Average</MenuItem>
    </TextField>

    {/* Skin Type */}
    <TextField
      select
      label="Skin Type"
      fullWidth
      value={skinType}
      onChange={(e) => setSkinType(e.target.value)}
    >
      <MenuItem value="Fair">Fair</MenuItem>
      <MenuItem value="Wheatish">Wheatish</MenuItem>
      <MenuItem value="Dark">Dark</MenuItem>
    </TextField>
  </Box>
 
  <Box display="flex" justifyContent="end" gap={1} mt={3} >
  <Button variant="outlined" sx={{background:'#34495e',color:'#fff',border:'none'}} onClick={handleClear}>
      Clear
    </Button>
    <Button variant="contained" sx={{background:'#34495e'}} onClick={handleSave}>
      Save
    </Button> 
  </Box>

</Box>

  </>
  )
};
export default LifeStyle;
