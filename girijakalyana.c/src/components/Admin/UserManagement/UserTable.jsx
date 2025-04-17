import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Box,
  Stack,
  InputAdornment,
  Paper
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import toast from "react-hot-toast";
import { customStyles, getUserTableColumns } from "../../../utils/DataTableColumnsProvider";


const UserTable = () => {
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("status");

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (users && users.length > 0) {
      filterUsers(searchTerm, selectedUserType, selectedStatus);
    }
  }, [users, searchTerm, selectedUserType, selectedStatus]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const formatUserRole = (role) => {
    if (!role) return '';
    if (role.toLowerCase() === "assistance") return "Assistance";
    return role.replace('User', '').replace(/^\w/, c => c.toUpperCase());
  };

  const filterUsers = (search, userType, Status) => {
    let filtered = users.filter(user => {
      const isAdmin = user?.user_role?.toLowerCase() === "admin";
      return !isAdmin;
    });

    filtered = filtered.filter(user => {
      const username = user?.username?.toLowerCase() || '';
      const registration_no = user?.registration_no?.toLowerCase() || '';
      const searchLower = search.toLowerCase();
      return username.includes(searchLower) || registration_no.includes(searchLower);
    });

    if (Status !== "status") {
      filtered = filtered.filter(user => {
        const UserStatus = user?.status?.toLowerCase();
        switch (Status.toLowerCase()) {
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
      });
    }

    if (userType !== "all") {
      filtered = filtered.filter(user => {
        const userRole = user?.user_role?.toLowerCase();
        switch (userType.toLowerCase()) {
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
  };


  const paginationComponentOptions = {
    rowsPerPageText: 'Show',
    rangeSeparatorText: 'of',
    noRowsPerPage: false,
  };

  return (
    <div style={{ padding: "20px", marginTop: "60px", fontFamily: "Outfit, sans-serif", marginLeft: '20px' }}>
      <Typography variant="h4" fontWeight={600} color="#34495e" fontFamily={"Outfit sans-serif"} marginBottom={3}>
        User Table
      </Typography>
      
      {/* Filter Options */}
      <Stack direction="row" spacing={2} mb={2} justifyContent={'space-between'}>
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
        
        <Box sx={{ display: "flex", gap: 2 }}>
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
      
      {/* DataTable */}
      <Paper sx={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <DataTable
          columns={getUserTableColumns(formatUserRole)}
          data={filteredUsers}
          customStyles={customStyles}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={
            <Typography padding={3} textAlign="center" fontFamily="Outfit">
              No users found matching your criteria.
            </Typography>
          }
          progressPending={isLoading}
          progressComponent={<LoadingComponent />}
          persistTableHead
          highlightOnHover
        />
      </Paper>
    </div>
  );
};

export default UserTable;