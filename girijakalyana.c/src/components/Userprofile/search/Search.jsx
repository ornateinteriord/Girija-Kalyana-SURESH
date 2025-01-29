import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import jsonData from "../../Userprofile/profile/eduction/jsondata/data.json";

const Search = () => {
  const datas = jsonData;
  const [caste, setCaste] = useState("");
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [fromHeight, setFromHeight] = useState("");
  const [toHeight, setToHeight] = useState("");
  const [occupation, setOccupation] = useState("");
  const [marrital, setMarrital] = useState("");
  const [showMarrital, setShowMarrital] = useState(false);

  const handleMaritalChange = (event) => {
    const value = event.target.value;
    setShowMarrital(value === "No");
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{color:'#34495e'}}>
          Profile Based on Preference
        </Typography>
      </Box>

      {/* Search Input */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Reg No"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
           
            variant="contained"
           
            sx={{
              height: "56px",
              textTransform: "capitalize",
              fontSize: "20px",
              width:'130px',
              backgroundColor:'#34495e',
              "&:hover": {
                backgroundColor: "#34495e", 
               
                },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Marital Status */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          First Marriage *
        </Typography>
        <RadioGroup
          row
          value={showMarrital ? "No" : "Yes"}
          onChange={handleMaritalChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
        {showMarrital && (
          <FormControl sx={{ minWidth: 200, mt: 2 }} size="small">
            <InputLabel>Marital Status</InputLabel>
            <Select
              value={marrital}
              onChange={(e) => setMarrital(e.target.value)}
            >
              {datas[6].marritalStatus.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Preferences */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 3 }}>
        {/* Left Column */}
        <Box>
          <FormControl sx={{ minWidth: 200, mb: 2,marginRight:'5px' }} size="small">
            <InputLabel>Caste Preference</InputLabel>
            <Select
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
            >
              {datas[0].casteValues.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 2 }} size="small">
            <InputLabel>Age Preference (From)</InputLabel>
            <Select
              value={fromAge}
              onChange={(e) => setFromAge(e.target.value)}
            >
              {datas[9].minAge.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Height Preference (From)</InputLabel>
            <Select
              value={fromHeight}
              onChange={(e) => setFromHeight(e.target.value)}
            >
              {datas[5].heightValues.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Right Column */}
        <Box>
          <FormControl sx={{ minWidth: 200, mb: 2,marginRight:'5px' }} size="small">
            <InputLabel>Education Preference</InputLabel>
            <Select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              {datas[4].qualificationValues.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, mb: 2 }} size="small">
            <InputLabel>Age Preference (To)</InputLabel>
            <Select
              value={toAge}
              onChange={(e) => setToAge(e.target.value)}
            >
              {datas[9].minAge.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Height Preference (To)</InputLabel>
            <Select
              value={toHeight}
              onChange={(e) => setToHeight(e.target.value)}
            >
              {datas[5].heightValues.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Buttons */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          
          sx={{
            textTransform: "capitalize",
            fontSize: "18px",
            mr: 2,
            backgroundColor:'#34495e',
            "&:hover": {
              backgroundColor: "#34495e", 
             
              },
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            fontSize: "18px",
            backgroundColor:'#34495e',
            color:'#fff',
            "&:hover": {
              backgroundColor: "#34495e", 
             
              },
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
