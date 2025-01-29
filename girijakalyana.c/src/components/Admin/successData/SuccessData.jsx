import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SuccessData = () => {
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
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filterCurrentRowData = records.filter((data) => {
    return (
      search === "" ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.includes(search) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filterCurrentRowData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px", paddingLeft: "50px", paddingTop: "100px" }}>
       <Box display="flex" justifyContent="space-between" marginBottom={2}>
           <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={"Outfit sans-serif"}>
             Success data
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
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mobile No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Caste</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Here Caste</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Free/Silver User</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" alignItems="center" justifySelf={"end"} mt={3}>
        <Pagination
          count={Math.ceil(filterCurrentRowData.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </div>
  );
};

export default SuccessData;
