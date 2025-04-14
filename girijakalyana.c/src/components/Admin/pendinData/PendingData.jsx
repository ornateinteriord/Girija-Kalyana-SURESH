import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { customStyles, getPendingandSuccessUserDataColumns } from "../../../utils/DataTableColumnsProvider";

// Dummy static user data
const dummyUsers = [
  {
    id: 101,
    name: "Abhinav Kumar",
    username: "abhinavk",
    email: "abhinav@example.com",
    phone: "9876543210",
  },
  {
    id: 102,
    name: "Suma Ramesh",
    username: "suma123",
    email: "suma@example.com",
    phone: "9988776655",
  },
  {
    id: 103,
    name: "John Doe",
    username: "jdoe",
    email: "john@example.com",
    phone: "9123456789",
  },
  {
    id: 104,
    name: "Priya Shetty",
    username: "priyas",
    email: "priya@example.com",
    phone: "9888997766",
  },
  {
    id: 105,
    name: "Arun N",
    username: "arunn",
    email: "arun@example.com",
    phone: "9001234567",
  },
  {
    id: 106,
    name: "Divya Rao",
    username: "divrao",
    email: "divya@example.com",
    phone: "9012345678",
  },
  {
    id: 107,
    name: "Ravi Patel",
    username: "ravip",
    email: "ravi@example.com",
    phone: "9876512345",
  },
  {
    id: 108,
    name: "Sneha Joshi",
    username: "sneha88",
    email: "sneha@example.com",
    phone: "8899776655",
  },
];

const PendingData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  // Load dummy data
  useEffect(() => {
    setRecords(dummyUsers);
  }, []);

  const filteredRecords = records.filter((record) =>
    [
      record.id.toString(),
      record.name?.toLowerCase(),
      record.username?.toLowerCase(),
      record.email?.toLowerCase(),
      record.phone?.toLowerCase(),
    ].some((field) => field?.includes(search.toLowerCase()))
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  return (
    <Box p={5} marginTop={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" color="#34495e" fontWeight={600} fontFamily="Outfit sans-serif">
          Pending Data
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            label="Search"
            placeholder="Search user"
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <DataTable
        columns={getPendingandSuccessUserDataColumns()}
        data={filteredRecords}
        pagination
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6, 10, 15, 20]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
        }}
       noDataComponent={
          <Typography padding={3} textAlign="center">
            No records found
          </Typography>
        }
        customStyles={customStyles}
      />
    </Box>
  );
};

export default PendingData;
