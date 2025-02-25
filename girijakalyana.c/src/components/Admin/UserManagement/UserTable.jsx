import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Pagination, Stack, InputAdornment, MenuItem, Select, FormControl, InputLabel,
  Typography,
  Box
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("all");
 const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error("Fetch error:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterUsers(value, selectedUserType);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
    filterUsers(searchTerm, event.target.value);
  };

  const filterUsers = (search, userType) => {
    let filtered = users.filter(user => 
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.mobile.includes(search)
    );
    
    if (userType !== "all") {
      filtered = filtered.filter(user => user.userType.toLowerCase() === userType);
    }
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: "20px", marginTop: "60px", fontFamily: "Outfit, sans-serif", marginLeft: '20px' }}>
      <Typography variant="h4" fontWeight={600} color="#34495e" fontFamily={"Outfit sans-serif"} marginBottom={3}>
        User Table
      </Typography>
      
      {/* Filter Options */}
      <Stack direction="row" spacing={2} mb={2} justifyContent={'space-between'}>
        <Box gap={2} display={'flex'}>
        <Box>
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px" }}
          fontFamily={"Outfit sans-serif"}
        />
        </Box>
        
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
        <FormControl style={{ minWidth: 200 }} fontFamily={"Outfit sans-serif"}>
          <Select value={selectedUserType} onChange={handleUserTypeChange}>
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="silver">Silver Users</MenuItem>
            <MenuItem value="premium">Premium Users</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>S.No</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>Name</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>Email</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>Phone</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>{indexOfFirstUser + index + 1}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>{user.firstName} {user.lastName}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>{user.email}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>{user.mobile}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '18px' }}>{user.userType}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredUsers.length > rowsPerPage && (
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={3}>
          <Pagination
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            shape="rounded"
            color="primary"
          />
        </Stack>
      )}
    </div>
  );
};

export default UserTable;
