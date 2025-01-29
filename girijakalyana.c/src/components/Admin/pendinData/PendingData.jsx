import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Stack,
  Pagination,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const PendingData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filteredRecords = records.filter((record) =>
    [
      record.id.toString(),
      record.name.toLowerCase(),
      record.username.toLowerCase(),
      record.email.toLowerCase(),
      record.phone.toLowerCase(),
    ].some((field) => field.includes(search.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box p={5} marginTop={6}>
      
           <Box display="flex" justifyContent="space-between" marginBottom={2}>
           <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={'Outfit sans-serif'}>
             Pending data
           </Typography>
           <Select
               value={rowsPerPage}
               onChange={handleRowsPerPageChange}
               size="medium"
               style={{width:'90px'}}
               displayEmpty
             >
               {[5, 7, 10].map((size) => (
                 <MenuItem key={size} value={size}>
                   {size}
                 </MenuItem>
               ))}
             </Select>
           </Typography>
           
     
             <TextField
             placeholder="Search user"
               label="Search"
               variant="outlined"
               value={search}
               onChange={handleSearch}
               size="medium"
               style={{width:'300px'}}
               InputProps={{
                 startAdornment: (
                   <InputAdornment position="start" style={{ marginRight: "8px" }}>
                     <FaSearch />
                   </InputAdornment>
                 ),
               }}
             />
            
           </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Registration No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Phone</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Caste</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.id}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Free/Silver User</TableCell>
                {/* <TableCell>
                  <Button variant="contained" color="success">
                    Active
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" alignItems="center" justifySelf={"end"} mt={3}>
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

export default PendingData;
