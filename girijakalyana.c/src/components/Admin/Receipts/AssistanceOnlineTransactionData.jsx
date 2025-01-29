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
  Typography,
  Pagination,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const AssistanceOnlineTransactionData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = records.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(records.length / rowsPerPage);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setRecords(res.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  // Handle search filter
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filter rows based on search
  const filteredRows = currentRows.filter((data) => {
    return (
      search === "" ||
      data.id.toString().includes(search.toString()) ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 4 ,paddingLeft:'50px',marginTop:'50px'}}>
      <Typography variant="h4" sx={{ marginBottom: 3 }} color="#34495e" fontWeight={600} fontFamily={"Outfit sans-serif"}>
        Assistance  Transaction
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
      <FormControl variant="outlined" sx={{width:'90px'}}>
          <InputLabel id="rows-per-page-label">Rows</InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            label="Rows"
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        {/* Search */}
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          style={{width:'300px'}}
          InputProps={{
            startAdornment:(
                <InputAdornment>
                <FaSearch/>
                </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Date</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>UserName</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Registration No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Bank Reference Number</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mode Of Payment</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Amount</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}} >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>06-01-2025</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.username}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.id}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs.1200</TableCell>
                <TableCell>
                  {showActive ? (
                    <Typography sx={{ color: "green" }}>TXN_Success</Typography>
                  ) : (
                    <Typography sx={{ color: "orange" }}>TXN_Pending</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifySelf:'end',
          alignItems: "center",
          marginTop: 3,
        }}
      >
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

export default AssistanceOnlineTransactionData;
