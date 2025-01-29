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
  Button,
  Box,
  Typography,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const PromotersUsersData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Search handler
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); 
  };

  // Rows per page handler
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  };

  // Filter records based on search input
  const filteredRecords = records.filter((data) =>
    [data.name, data.email, data.phone, data.username, data.address.city]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Paginate filtered records
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={3} marginTop={8} paddingLeft={7}>
     <Box display="flex" justifyContent="space-between" marginBottom={1}>
               <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
               <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={"Outfit sans-serif"}>
                 Promoters Users
               </Typography>
               <Select
                   value={rowsPerPage}
                   onChange={handleRowsPerPageChange}
                   size="medium"
                   style={{width:'90px'}}
                   displayEmpty
                 >
                   {[6, 7, 10].map((size) => (
                     <MenuItem key={size} value={size}>
                       {size}
                     </MenuItem>
                   ))}
                 </Select>
               </Typography>

        <TextField
          label="Search"
          placeholder="Search user"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px" }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promocode</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mobile</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Assistance Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Total Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell>
                  <Button variant="contained" size="medium" style={{textTransform:'capitalize'}}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" justifySelf={"end"} mt={3}>
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

export default PromotersUsersData;
