import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";

const RenewalsData = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
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

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredRecords = records.filter((record) =>
    Object.values(record)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const currentRows = filteredRecords.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);

  // Handlers
  const handleSearch = (e) => setSearch(e.target.value);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };
  const handlePageChange = (event, page) => setCurrentPage(page);

  return (
    <Box padding={2} marginTop={8} paddingLeft={6}>
    
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={"Outfit sans-serif"}>
        Renewals
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
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email Id</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Gender</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Expiry Date</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Status</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Renewal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.email}</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>02-9-2025</TableCell>
                  <Button color="error" style={{textTransform:'capitalize',fontSize:'16px'}}>
                    Pending
                  </Button>
                  <TableCell>-</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifySelf={'end'} marginTop={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RenewalsData;
