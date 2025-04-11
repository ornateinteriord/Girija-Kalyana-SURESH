import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Pagination, Stack, InputAdornment, MenuItem, Select, FormControl,
  Typography,
  Box
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles, } from "../../api/Admin";
import { LoadingComponent } from "../../../App";

const UserTable = () => {
  const { data: users = [], isLoading, isError,error } = getAllUserProfiles();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("status");
  const [rowsPerPage, setRowsPerPage] = useState(6);


   useEffect(() => {
      if (isError) {
        toast.error(error.message);
      }
    }, [isError, error]);

  useEffect(() => {
    if (users && users.length > 0) {
      filterUsers(searchTerm, selectedUserType,selectedStatus);
    }
  }, [users, searchTerm, selectedUserType,selectedStatus]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const filterUsers = (search, userType,Status) => {
    let filtered = users.filter(user => {
      const isAdmin = user?.user_role?.toLowerCase() === "admin";
      return !isAdmin;
    });

    // Then apply search filter
    filtered = filtered.filter(user => {
      const username = user?.username?.toLowerCase() || '';
      const registration_no = user?.registration_no?.toLowerCase() || '';
      const searchLower = search.toLowerCase();
      
      return username.includes(searchLower) || registration_no.includes(searchLower);
    });

    if(Status !=="status"){
      filtered = filtered.filter(user =>{
        const UserStatus = user?.status?.toLowerCase() 
        switch(Status.toLowerCase()) {  // Make comparison case-insensitive
          case "active":
            return UserStatus === "active";
          case "inactive":
            return UserStatus === "inactive";
          case "pending":
            return UserStatus === "pending";
          case "expires":
            return UserStatus === "expires";
          default:
            return true;
        }
      })
    }
    
    // Then apply user type filter if not "all"
    if (userType !== "all") {
      filtered = filtered.filter(user => {
        const userRole = user?.user_role?.toLowerCase();
        
        // Map frontend filter names to backend role names
        switch(userType.toLowerCase()) {  // Make comparison case-insensitive
          case "assistance":
            return userRole === "assistance";
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
    if (!role) return '';
    // Special case for Assistance
    if (role.toLowerCase() === "assistance") return "Assistance";
    // For other roles, remove 'User' suffix and capitalize
    return role.replace('User', '').replace(/^\w/, c => c.toUpperCase());
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
        <Box sx={{display:"flex",gap:2}}>
        <FormControl style={{ minWidth: 200 }} fontFamily={"Outfit sans-serif"}>
          <Select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ height: '50px' }}
          >
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="expires">Expires</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ minWidth: 200 }} fontFamily={"Outfit sans-serif"}>
          <Select 
            value={selectedUserType} 
            onChange={handleUserTypeChange}
            sx={{ height: '50px' }}
          >
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="premium">Premium Users</MenuItem>
            <MenuItem value="silver">Silver Users</MenuItem>
            <MenuItem value="Assistance">Assistance Users</MenuItem>
            <MenuItem value="free">Free Users</MenuItem>
          </Select>
        </FormControl>
        </Box>
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
                <TableRow key={user.id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px' }}>{indexOfFirstUser + index + 1}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px', fontWeight: 500 }}>{user.username}</TableCell>
                  <TableCell sx={{ fontFamily: 'Outfit sans-serif', fontSize: '17px' }}>{user.registration_no}</TableCell>
                  <TableCell sx={{ 
                    fontFamily: 'Outfit sans-serif', 
                    fontSize: '15px',
                    color: user.user_role === 'PremiumUser' ? '#FFD700' : 
                           user.user_role === 'SilverUser' ? '#C0C0C0' : 
                           user.user_role === 'FreeUser' ? '#4CAF50' :
                           user.user_role === 'Assistance' ? '#3498db' : '#333',
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
      {isLoading && <LoadingComponent/>}
    </div>
  );
};

export default UserTable;