import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Pagination,
  MenuItem,
  Select,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../App";

const UserReports = () => {
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1); // Adjust for Material-UI's 1-based page index
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredRecords = users.filter((record) => {
    return (
      search === "" ||
      record.registration_date?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.registration_no?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.first_name?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.gender?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.status?.toString().toLowerCase().includes(search.toLowerCase()) 
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);

  return (
    <Box padding={2} paddingLeft={7} marginTop={8}>
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          color="#34495e"
          marginRight={1}
          fontFamily={"Outfit sans-serif"}
          marginBottom={3}
        >
          Users Reports
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        alignItems="center"
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginTop={1}
        marginLeft={2}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ marginRight: "10px" }}
            value={fromDate}
            onChange={handleFromDateChange}
          />

          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={handleToDateChange}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "14px 22px",
              backgroundColor: "#34495e",
              textTransform: "capitalize",
            }}
          >
            Submit
          </Button>
        </Box>

        <Box
          marginRight={7}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            paddingRight: "90px",
          }}
        >
          <InputLabel id="rows-per-page-label">Rows</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="medium"
            sx={{ width: "100px" }}
          >
            {[5, 10, 15, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              sx={{ width: "320px", display: "flex" }}
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
          </Grid>
        </Box>
      </Grid>

      <Paper sx={{ marginTop: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                >
                  Activation Date
                </TableCell>
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
                  Gender
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecords
                .slice(
                  currentPage * rowsPerPage,
                  (currentPage + 1) * rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {row.registration_date}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {row.registration_no}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {row.first_name}
                      {row.last_name}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                    >
                      {row.gender}
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          padding={2}
        >
          <Pagination
            count={totalPages}
            page={currentPage + 1} // Adjust for 1-based index
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Paper>
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default UserReports;
