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
  Typography,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Users"); // For user type filtering
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(6); // Rows per page

  useEffect(() => {
    // Fetch data from API or use mock data
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchName = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle user type selection
  const handleUserTypeChange = (e) => {
    setSelectedCategory(e.target.value);
    const filtered = users.filter((user) => 
      e.target.value === "All Users" || user.userType === e.target.value
    );
    setFilteredUsers(filtered);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px",paddingLeft:'40px',marginTop:'40px' }}>
      <h1 style={{ color: "#34495e", fontFamily:'Outfit sans-serif'}}>User Table</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Search Bar */}
        <Typography>

        <TextField
        placeholder="Search user"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px", marginRight:'9px' }}
        />

          <FormControl style={{ width: "100px" }}>
          <InputLabel>Rows per page</InputLabel>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange} label="Rows per page">
            {[6, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Typography>
       

        {/* User Type Dropdown */}
        <FormControl style={{ width: "150px"}}>
          <InputLabel>User Type</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleUserTypeChange}
            label="User Type"
          >
            <MenuItem value="All Users">All Users</MenuItem>
            <MenuItem value="Silver">Silver</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
            <MenuItem value="Premium">Free users</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>ID</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Phone</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}} >Gender</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{user.id}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{user.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{user.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{user.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px',color:'blue'}}>
                {user.id % 2 === 0 ? "Silver" : "Premium"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
        {/* Rows per page dropdown */}
      
        {/* Pagination */}
        <Stack spacing={2} direction="row" justifySelf={'end'} mt={3}>
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
      {/* </Typography> */}
    </div>
  );
};

export default UserTable;
