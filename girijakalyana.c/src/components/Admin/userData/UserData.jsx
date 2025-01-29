import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
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
import './UserData.css';

const UserData = () => {
  const firstPage = 1;
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = records.slice(indexOfFirstRow, indexOfLastRow);

  const filteredRows = currentRows.filter((data) => {
    return (
      search === "" ||
      data.id.toString().includes(search.toString()) ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(records.length / rowsPerPage);

  const handlePageClick = (event, value) => setCurrentPage(value);
  
  
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      const updatedData = response.data.map((user) => ({
        ...user,
        status: "Pending", // Initialize with default status
      }));
      setRecords(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleUpgrade = (id) => {
    setRecords((prevRecords) =>
      prevRecords.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Pending" ? "Active" : "Pending" }
          : user
      )
    );
  };

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
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Registration No
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Email Id
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Gender
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                User Type
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}>
                Upgrade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    {row.id}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    -
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}>
                    <Typography color={row.status === "Pending" ? "orange" : "green"}>
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => handleUpgrade(row.id)}
                    >
                      Upgrade
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
    </div>
  );
};

export default UserData;
