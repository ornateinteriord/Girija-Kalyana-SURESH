import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Typography,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import "./UserData.css";
import { getAllUserProfiles, UpgradeUserStatus } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import toast from "react-hot-toast";

const UserData = () => {
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();
  const firstPage = 1;
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [localUsers, setLocalUsers] = useState(users);
   const [selectedStatus, setSelectedStatus] = useState("status");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const upgradeUserMutation = UpgradeUserStatus();

  const handleUpgrade = async (regno, currentStatus) => {
    console.log(`Current status for ${regno}:`, currentStatus);
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
    const matchesSearch = 
    search === "" ||
    data.registration_no.toString().includes(search.toString()) ||
    data.first_name.toLowerCase().includes(search.toLowerCase()) ||
    data.email_id.toLowerCase().includes(search.toLowerCase()) ||
    data.gender.toLowerCase().includes(search.toLowerCase());
  
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
  
  return matchesSearch && matchesStatus;

  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (event, value) => setCurrentPage(value);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

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
          <div className="rows-per-page">
            <FormControl sx={{ width: 100 }}>
              <InputLabel>Rows</InputLabel>
              <Select
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
          </div>
        </Typography>
        <div className="search-div">
          <FormControl
            style={{ minWidth: 200 }}
            fontFamily={"Outfit sans-serif"}
          >
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
            onChange={handleSearchChange}
            placeholder="Search user"
          />
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Registration No
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Email Id
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                User Type
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Upgrade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <TableRow key={row.registration_no}>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    {row.registration_no}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    {row.email_id}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    {row.gender}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    {row.type_of_user}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                  >
                    <Typography
                      color={row.status === "active" ? "green" : "red"}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleUpgrade(row.registration_no,row.status)}
                      disabled={upgradeUserMutation.isLoading && 
                        upgradeUserMutation.variables?.regno === row.registration_no}
                    >
                      {upgradeUserMutation.isLoading && 
                       upgradeUserMutation.variables?.regno === row.registration_no
                        ? "Processing..."
                        : row.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredRows.length > 0 && (
        <Stack spacing={2} direction="row" justifyContent="end" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageClick}
            shape="rounded"
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      )}
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default UserData;
