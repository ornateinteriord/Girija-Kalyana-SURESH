import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import {
  customStyles,
  getImageVerificationColumns,
} from "../../../utils/DataTableColumnsProvider";

const dummyImageVerificationRecords = [
  {
    id: 1,
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    isActive: true,
  },
  {
    id: 2,
    name: "Ayesha Singh",
    email: "ayesha.singh@example.com",
    isActive: false,
  },
  {
    id: 3,
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    isActive: true,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    isActive: false,
  },
  {
    id: 5,
    name: "Manoj Das",
    email: "manoj.das@example.com",
    isActive: true,
  },
  {
    id: 6,
    name: "Divya Iyer",
    email: "divya.iyer@example.com",
    isActive: false,
  },
  {
    id: 7,
    name: "Arun Mehta",
    email: "arun.mehta@example.com",
    isActive: true,
  },
  {
    id: 8,
    name: "Meera Joseph",
    email: "meera.joseph@example.com",
    isActive: false,
  },
];

const ImageVerificationData = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");

  // Handle Search
  useEffect(() => {
    const filtered = records.filter((data) =>
      [
        data.id.toString(),
        data.name?.toLowerCase(),
        data.username?.toLowerCase(),
        data.email?.toLowerCase(),
        data.phone?.toLowerCase(),
        data.address?.city?.toLowerCase(),
      ].some((field) => field?.includes(search.toLowerCase()))
    );
    setFilteredRecords(filtered);
  }, [search, records]);

  useEffect(() => {
    setRecords(dummyImageVerificationRecords);
  }, []);

  return (
    <Box p={6} mt={6}>
      {/* Header & Controls */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color="#34495e"
          fontFamily={"Outfit sans-serif"}
        >
          Image Verification
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Field */}
          <TextField
            placeholder="Search record"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
            style={{ width: "300px" }}
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <DataTable
        columns={getImageVerificationColumns()}
        data={filteredRecords}
        progressPending={false}
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

export default ImageVerificationData;
