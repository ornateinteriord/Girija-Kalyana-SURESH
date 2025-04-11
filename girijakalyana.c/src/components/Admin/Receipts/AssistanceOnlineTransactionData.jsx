import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Typography,
  Pagination,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllAssistanceTransactions } from "../../api/Admin";
import { LoadingComponent } from "../../../App";

const AssistanceOnlineTransactionData = () => {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = getAllAssistanceTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [search, setSearch] = useState("");

 
console.log(transactions)
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


   useEffect(() => {
      if (isError) {
        toast.error(error.message);
      }
    }, [isError, error]);
  // Filter rows based on search
  const filteredRows = transactions.filter((data) => {
    if (!search) return true;
    
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [
      data?.date,
      data?.username,
      data?.registration_no,
      data?.bank_ref_no,
      data?.mode,
      data?.amount
    ];
  
    return fieldsToSearch.some(
      field => field && field.toString().toLowerCase().includes(searchTerm)
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 4, paddingLeft: "50px", marginTop: "50px" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3 }}
        color="#34495e"
        fontWeight={600}
        fontFamily={"Outfit sans-serif"}
      >
        Assistance Transaction
      </Typography>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <FormControl variant="outlined" sx={{ width: "90px" }}>
          <InputLabel id="rows-per-page-label">Rows</InputLabel>
          <Select
            labelId="rows-per-page-label"
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

        {/* Search */}
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          style={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                UserName
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Registration No
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Bank Reference Number
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Mode Of Payment
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ fontFamily: "Outfit sans-serif", fontSize: "18px" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.username}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.registration_no}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.bank_ref_no}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.mode}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Outfit sans-serif", fontSize: "17px" }}
                >
                  {row.amount}
                </TableCell>
                <TableCell>
                  <Typography color={row.status === "TXN_SUCCESS" ? "green" : "red"}>
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredRows.length > 0 && (
      <Box
        sx={{
          display: "flex",
          justifySelf: "end",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
      )}
      {isLoading && <LoadingComponent/>}
    </Box>
    
  );
};

export default AssistanceOnlineTransactionData;
