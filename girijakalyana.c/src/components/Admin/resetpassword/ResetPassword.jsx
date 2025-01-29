import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import './Resetpassword.scss';

const ResetPassword = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for password reset

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRecords = records.filter((record) =>
    [record.name, record.username, record.email, record.phone, record.address.city]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const displayedRecords = filteredRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (e) => setSearch(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handlePasswordReset = () => {
    // Logic for password reset can be added here
    handleCloseDialog();
  };

  return (
    <div className="reset-password-user">
      <div className="firsthead">
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="#34495e"
            fontWeight={600}
            marginBottom={2}
            fontFamily={"Outfit sans-serif"}
          >
            Reset Password
          </Typography>

          {/* Rows per page */}
          <div className="rows-per-page">
            <FormControl sx={{ width: 100 }}>
              <InputLabel>Rows</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                label="Rows"
              >
                {[6, 10, 15, 20].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Typography>
        {/* Search input */}
        <div className="search-div">
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            onChange={handleSearch}
            placeholder="Search records"
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ marginRight: "8px" }}>
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Registration No</TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Name</TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Username</TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Password</TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Status</TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>{record.id}</TableCell>
                <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>{record.name}</TableCell>
                <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>{record.username}</TableCell>
                <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>-</TableCell>
                <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                  {record.id % 2 === 0 ? "Active" : "Pending"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{textTransform:'capitalize',background:'#34495e'}}
                    onClick={() => handleOpenDialog(record)}
                  >
                    Change Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} direction="row" justifyContent="end" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{color:'#34495e',textTransform:'capitalize',fontWeight:700}}>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handlePasswordReset} sx={{color:'#34495e'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResetPassword;
