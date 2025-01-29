import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Pagination,
  Stack,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const PromotersEarningsData = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [search, setSearch] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Filter rows based on search
  const filteredRows = records.filter((data) => {
    return (
      search === "" ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Event handlers
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 4 ,paddingLeft:'40px',paddingTop:'80px'}}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
         <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" fontWeight={600} color="#34495e" fontFamily={"Outfit sans-serif"}>
          Promoters Earning
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="medium"
            sx={{ minWidth: 120 }}
          >
            {[6, 10, 15, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
          
        </Box>
        </Box>

        <TextField
        label='search'
          size="medium"
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{width:'300px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "8px" }}>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Name</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Code</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Total Earnings</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Paid</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Payable</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs. 50,000</TableCell>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs.</TableCell>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs.</TableCell>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>
                  <Button variant="contained" size="small">
                    Pay Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack direction="row" alignItems="center" justifySelf={'end'} mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default PromotersEarningsData;
