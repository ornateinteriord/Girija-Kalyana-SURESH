import React, { useEffect, useState } from "react";
import {
  Box,
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
  Button,
  Typography,
  Pagination,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const PromotersUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = records.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(records.length / rowsPerPage);

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

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = currentRows.filter((row) => {
    return (
      search === "" ||
      row.id.toString().includes(search) ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.username.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.toLowerCase().includes(search.toLowerCase()) ||
      row.address?.city?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Box p={3} paddingLeft={7} marginTop={8}>
      <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} fontFamily={"Outfit sans-serif"}>
        Promoter Users
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex"  alignItems="center" >
        <FormControl>
          <InputLabel>Rows</InputLabel>
          <Select value={rowsPerPage} sx={{marginRight:'5px',width:'80px'}} onChange={handleRowsPerPageChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
       
        <FormControl sx={{width:'140px'}}>
          <InputLabel>Filter Users</InputLabel>
          <Select defaultValue="" onChange={() => {}}>
            <MenuItem value="All Users">All Users</MenuItem>
            <MenuItem value="premium">Premium Users</MenuItem>
            <MenuItem value="silver">Silver Users</MenuItem>
            <MenuItem value="free">Free Users</MenuItem>
          </Select>
        </FormControl>
        </Box>
        <Box>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
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
      </Box>

      

        {/* <Typography>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, records.length)} of{" "}
          {records.length} entries
        </Typography> */}
     

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter's Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promocode</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mobile</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Free Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Premium Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Silver Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Total Users</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" sx={{textTransform:'capitalize'}}>
                    DETAILS
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} display="flex" justifySelf={'end'}>
        <Pagination
          count={totalPages}
          page={currentPage}
          shape="rounded"
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PromotersUsers;
