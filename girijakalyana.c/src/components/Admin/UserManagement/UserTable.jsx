import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Pagination, Stack, InputAdornment, MenuItem, Select, FormControl,
  Typography,
  Box
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useGetAllMembersDetails } from "../../api/Admin/index";
import toast from "react-hot-toast";

const UserTable = () => {
  const { data: users = [], isLoading, error } = useGetAllMembersDetails();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    if (users && users.length > 0) {
      filterUsers(searchTerm, selectedUserType);
    }
  }, [users, searchTerm, selectedUserType]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const filterUsers = (search, userType) => {
    let filtered = users.filter(user => {
      const username = user?.username?.toLowerCase() || '';
      const ref_no = user?.ref_no?.toLowerCase() || '';
      const searchLower = search.toLowerCase();
      
      return username.includes(searchLower) || ref_no.includes(searchLower);
    });
    
    if (userType !== "all") {
      filtered = filtered.filter(user => {
        const userRole = user?.user_role?.toLowerCase();
        
        // Map frontend filter names to backend role names
        switch(userType) {
          case "premium":
            return userRole === "premiumuser";
          case "silver":
            return userRole === "silveruser";
          case "free":
            return userRole === "freeuser";
          default:
            return true;
        }
      });
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

  const formatUserRole = (role) => {
    // Remove 'User' suffix and capitalize first letter
    if (!role) return '';
    return role.replace('User', '').replace(/^\w/, c => c.toUpperCase());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

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
              placeholder="Search by username or reference"
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
              sx={{ minWidth: 120, height: '55px' }}
            >
              {[6, 10, 15, 20].map((size) => (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <FormControl style={{ minWidth: 200 }} fontFamily={"Outfit sans-serif"}>
          <Select 
            value={selectedUserType} 
            onChange={handleUserTypeChange}
            sx={{ height: '50px' }}
          >
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="premium">Premium Users</MenuItem>
            <MenuItem value="silver">Silver Users</MenuItem>
            <MenuItem value="free">Free Users</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      {/* User Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell style={{ fontFamily: "Outfit sans-serif", fontSize: '19px', fontWeight: 'bold' }}>Sl.No</TableCell>
              <TableCell style={{ fontFamily: 'Outfit sans-serif', fontSize: '19px', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell style={{ fontFamily: 'Outfit sans-serif', fontSize: '19px', fontWeight: 'bold' }}>Reference No</TableCell>
              <TableCell style={{ fontFamily: 'Outfit sans-serif', fontSize: '19px', fontWeight: 'bold' }}>Membership</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '19px', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '19px', fontWeight: 'bold' }}>Last Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <TableRow key={user._id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px' }}>{indexOfFirstUser + index + 1}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px', fontWeight: 500 }}>{user.username}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px' }}>{user.ref_no}</TableCell>
                  <TableCell sx={{ 
                    fontFamily: 'Outfit sans-serif', 
                    fontSize: '15px',
                    color: user.user_role === 'PremiumUser' ? '#FFD700' : 
                           user.user_role === 'SilverUser' ? '#C0C0C0' : 
                           user.user_role === 'FreeUser' ? '#4CAF50' : '#333',
                    fontWeight: 'bold'
                  }}>
                    {formatUserRole(user.user_role)}
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: 'Outfit sans-serif', 
                    fontSize: '17px',
                    color: user.status === 'active' ? '#4CAF50' : '#F44336'
                  }}>
                    {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px' }}>
  {user.last_loggedin ? new Date(user.last_loggedin).toLocaleDateString() : 'Never'}
</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", padding: "20px", fontFamily: 'Outfit' }}>
                  No users found matching your criteria.
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