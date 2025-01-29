import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  Box,
  Button,
  InputAdornment,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const ImageVerificationData = () => {
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to page 1
  };

  const filteredRecords = records.filter((data) =>
    [
      data.id.toString(),
      data.name.toLowerCase(),
      data.username.toLowerCase(),
      data.email.toLowerCase(),
      data.phone.toLowerCase(),
      data.address?.city?.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box p={7} marginTop={4} >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
       <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <h2 style={{marginRight:'8px',color:'#34495e',fontFamily: "Outfit sans-serif"}}>Image Verify</h2>

        {/* Rows per page */}
        <div className="rows-per-page">
          {/* <label>Show </label> */}
          <FormControl sx={{ width: 100 }}>
            <InputLabel>Rows</InputLabel>
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange} label="Rows">
              {[6, 10, 15, 20].map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <label> Entries</label> */}
        </div>
        </Typography>

        <TextField
          placeholder="Search record"
          variant="outlined"
          size="large"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "8px" }}>
                <FaSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px" }}
        />
      </Box>

      <TableContainer component={Paper} >
        <Table  >
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Registration No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email Id</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Gender</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Image Status</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Notify</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <Button  style={{backgroundColor:'#ffefcc',
                  borderRadius:'5px',marginTop:'15px',textTransform:'capitalize'
                }}>Upload</Button>
                <TableCell>NA</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color={row.isActive ? "success" : "error"}
                    size="small"
                    style={{ textTransform: "capitalize",fontSize:'16px' }}
                  >
                    {row.isActive ? "Active" : "Pending"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" justifySelf={"end"} alignItems="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredRecords.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </Box>
  );
};

export default ImageVerificationData;
