import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Stack,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  customStyles,
  getPromoterPaymentColumns,
} from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";
import DataTable from "react-data-table-component";

const PayToPromoterData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filter rows based on search
  const filteredData = records.filter((data) =>
    [
      data.id,
      data.name,
      data.username,
      data.email,
      data.phone,
      data.address.city,
    ]
      .map((field) => field?.toString().toLowerCase())
      .some((field) => field.includes(search.toLowerCase()))
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <Box sx={{ padding: 4, paddingLeft: "50px", paddingTop: "85px" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        {/* Rows Per Page Selector */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            gutterBottom
            color="#34495e"
            fontWeight={600}
            marginRight={2}
            fontFamily={"Outfit sans-serif"}
          >
            Pay to Promoters
          </Typography>
        </Box>

        {/* Search Field */}
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          size="medium"
          style={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "8px" }}>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <DataTable
        columns={getPromoterPaymentColumns()}
        data={filteredData}
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
        progressPending={false}
        progressComponent={<LoadingComponent />}
      />
    </Box>
  );
};

export default PayToPromoterData;
