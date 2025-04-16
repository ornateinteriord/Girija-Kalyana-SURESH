import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "./UserData.css";
import { getAllUserProfiles, UpgradeUserStatus } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import toast from "react-hot-toast";
import { customStyles, getUserDataColumns } from "../../../utils/DataTableColumnsProvider";


const UserData = () => {
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();
  const [localUsers, setLocalUsers] = useState(users);
  const [selectedStatus, setSelectedStatus] = useState("status");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      setLocalUsers(users);
    }
  }, [users]);

  const upgradeUserMutation = UpgradeUserStatus();

  const handleUpgrade = async (regno, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await upgradeUserMutation.mutateAsync(
        { regno, status: newStatus },
        {
          onSuccess: () => {
            setLocalUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.registration_no === regno
                  ? { ...user, status: newStatus }
                  : user
              )
            );
          },
          onError: (error) => {
            console.error(error.message);
          },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const filteredRows = localUsers.filter((data) => {
    const isAdmin = data?.user_role?.toLowerCase() === "admin";
    const matchesSearch = 
      search === "" ||
      data.registration_no?.toString().includes(search.toString()) ||
      data.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      data.username?.toLowerCase().includes(search.toLowerCase()) ||
      data.gender?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = (() => {
      switch(selectedStatus.toLowerCase()) {
        case "active":
          return data.status === "active";
        case "inactive":
          return data.status === "inactive";
        case "pending":
          return data.status === "pending";
        case "expires":
          return data.status === "expires";
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && !isAdmin;
  });


  return (
    <div className="upgrade-user">
      <div className="fist-head">
        <Typography display="flex" alignItems="center">
          <Typography
            variant="h4"
            fontWeight={600}
            color="#34495e"
            fontFamily={"Outfit sans-serif"}
          >
            Users Upgrade
          </Typography>
        </Typography>
        <div className="search-div">
          <FormControl style={{ minWidth: 200 }} fontFamily={"Outfit sans-serif"}>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              sx={{ height: "50px" }}
            >
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="expires">Expires</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            id="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user"
          />
        </div>
      </div>

      {/* DataTable */}
      <Paper sx={{mt:2}}>
        <DataTable
          columns={getUserDataColumns(upgradeUserMutation ,handleUpgrade)}
          data={filteredRows}
          customStyles={customStyles}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Rows per page:',
            rangeSeparatorText: 'of',
            noRowsPerPage: false,
          }}
          noDataComponent={<Typography padding={3}>No data available</Typography>}
          progressPending={isLoading}
          progressComponent={<LoadingComponent />}
        />
      </Paper>
    </div>
  );
};

export default UserData;