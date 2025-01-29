
import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";

const FamilyReligious = ({email}) => {
  // const [userId, setUserId] = useState(null); 
 
  const [fields, setFields] = useState({
    fatherName: "",
    motherName: "",
    Siblings:"",
    caste: "",
    nakshatra: "",
    rashi: "",
    gotra: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  // const [selectedField, setSelectedField] = useState("fatherName");
  const [tempValue, setTempValue] = useState(fields.fatherName);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = sessionStorage.getItem("userData");
        const { _id: userId } = JSON.parse(userData);

        const response = await axios.get(`http://localhost:5000/api/familyReligious/${userId}`);
        if (response.data) {
          setFields(response.data);
          setIsNewRecord(false);
        }
      } catch (error) {     
        console.warn("No existing record found:", error);
        setIsNewRecord(true);
      }
    };      

    fetchData();
  }, []);

      const clearData =()=>{
        setFields({
          fatherName: "",
          motherName: "",
          Siblings:"",
          caste: "",
          nakshatra: "",
          rashi: "",
          gotra: "",
        }) 
      }   


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // const updatedFields = { ...fields, [selectedField]: tempValue };

    try {
      const userData = sessionStorage.getItem("userData");
      const { _id: userId } = JSON.parse(userData);

      if (isNewRecord) {
        // Add new record
        const response = await axios.post("http://localhost:5000/api/addFamilyReligious", {
          userId,
         ...fields ,
        });
        toast.success(response.data.message || "Data added successfully!");
      } else {
        // Update existing record
        const response = await axios.put("http://localhost:5000/api/updateFamilyReligious", {
          userId,
         ...fields ,
        });
        toast.success(response.data.message || "Data updated successfully!");
      }
   
      setFields(fields);
      setIsNewRecord(false);
    } catch (error) {
      toast.error("Failed to save data.");
    }

    setOpenDialog(false);
  };

  

  const tableHeaderStyle = {
    fontWeight: "bold",
    backgroundColor: "#f4f6f8",
    color: "#34495e",
    fontSize: "18px",
  };

  return (
    <Box
    padding={1}
    sx={{
      // Width: "80vw",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#fff",
        width:'90%'
    }}
  >
    <Box sx={{display:'flex',justifySelf:'end',mr:9}}>
 
        <Button variant={isEditing ? 'outlined' : 'contained'}   style={{ cursor: "pointer", color: "#fff", 
        fontSize: "16px",background:`${isEditing?'red':'#34495e'}`
        ,textTransform:'capitalize',border:'none' }}
        onClick={() => setIsEditing(!isEditing)}>
         {isEditing ? 'Cancel': 'Edit'}
          </Button>
   
    </Box>

    <Stack spacing={4} >
      <Box sx={{ display:'flex',gap:'10px',justifyContent:'space-evenly'
      }}>
    
      <Box>
        <Typography variant="h5" fontWeight={700} color="#34495e" gutterBottom>
          Religious Background
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Caste"
            name="caste"
            value={fields.caste}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
          <TextField
            label="Nakshatra"
            name="nakshatra"
            value={fields.nakshatra}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
          <TextField
            label="Rashi"
            name="rashi"
            value={fields.rashi}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
          <TextField
            label="Gotra"
            name="gotra"
            value={fields.gotra}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
        </Stack>
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={700} color="#34495e" gutterBottom>
          Family Information
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Father Name"
            name="fatherName"
            value={fields.fatherName}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
          <TextField
            label="Mother Name"
            name="motherName"
            value={fields.motherName}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
           <TextField
            label="Sibling Name"
            name="Siblings"
            value={fields.Siblings}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          />
           {/* <TextField
            label="Mother Name"
            name="motherName"
            value={fields.motherName}
            onChange={handleFieldChange}
            disabled={!isEditing}
            sx={{width:'500px'}}
          /> */}
        </Stack>
      </Box>

      </Box>
    </Stack>

    {isEditing && (
      <Box mt={3} display="flex" gap={2} justifyContent={'flex-end'} mr={9}>
        <Button
          variant="contained"
        sx={{background:'#34495e',textTransform:'capitalize'}}
          onClick={clearData}
        >
          clear
        </Button>
        <Button variant="contained"  sx={{background:'#34495e',textTransform:'capitalize'}} onClick={handleSave}>
          Save
        </Button>
      </Box>
    )}
  </Box>
  );
};

export default FamilyReligious;
