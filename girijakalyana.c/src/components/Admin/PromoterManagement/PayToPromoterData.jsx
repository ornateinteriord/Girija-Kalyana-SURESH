import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Pagination,
  InputAdornment,
  Stack,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const PayToPromoterData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filter rows based on search
  const filteredData = records.filter((data) =>
    [data.id, data.name, data.username, data.email, data.phone, data.address.city]
      .map((field) => field?.toString().toLowerCase())
      .some((field) => field.includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page
  };

  return (
    <Box sx={{ padding: 4, paddingLeft: "50px", paddingTop: "85px" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        {/* Rows Per Page Selector */}
        <Box display="flex" alignItems="center">
          <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={"Outfit sans-serif"}>
            Pay to Promoters
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="medium"
            style={{ width: "90px" }}
            displayEmpty
          >
            {[6, 10, 15].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Search Field */}
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          size="medium"
          style={{ width: "300px" }}
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
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}} >Paid</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Payable</TableCell>
              <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell  sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs. 50000</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs. 30000</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs. 20000</TableCell>
                <TableCell>
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
      <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center" marginTop={3}>
        <Pagination
          count={totalPages}
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

export default PayToPromoterData;
