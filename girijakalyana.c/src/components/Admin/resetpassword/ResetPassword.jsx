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
import "./Resetpassword.scss";
import { getAllUserProfiles, UserResetPassword } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const filteredRecords = users.filter((record) => {
    const isAdmin = record?.user_role?.toLowerCase() === "admin";
    return (
      !isAdmin &&
      [
        record.first_name,
        record.last_name,
        record.username,
        record.registration_no,
        record.password,
      ].some(
        (field) =>
          field && field.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  });

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
    setSelectedUser(null);
    setNewPassword("");
    setConfirmPassword("");
    setOpenDialog(false);
  };
  const { mutateAsync: resetPassword, isPending } = UserResetPassword();
  const handlePasswordReset = async () => {
    if (!selectedUser) return;
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await resetPassword({
        regno: selectedUser.registration_no,
        password: newPassword,
      });
      handleCloseDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reset-password-user">
      {isPending ? (
        <LoadingComponent />
      ) : (
        <>
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
                    <InputAdornment
                      position="start"
                      style={{ marginRight: "8px" }}
                    >
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
                    Username
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                  >
                    Password
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                    >
                      {record.registration_no}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                    >
                      {record.first_name}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {record.username}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {record.password}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      <Typography
                        color={record.status === "active" ? "green" : "red"}
                      >
                        {record.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: "capitalize",
                          background: "#34495e",
                        }}
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
          {filteredRecords.length > 0 && (
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
          )}
          {/* Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle
              sx={{
                color: "#34495e",
                textTransform: "capitalize",
                fontWeight: 700,
              }}
            >
              Change Password
            </DialogTitle>
            <DialogContent>
              {isPending ? (
                <LoadingComponent />
              ) : (
                <>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isPending}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isPending}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                color="error"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordReset}
                sx={{ color: "#34495e" }}
                disabled={isPending || !newPassword || !confirmPassword}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default ResetPassword;
