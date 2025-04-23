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
    <Box sx={{ padding: 4,  paddingTop: "85px" }}>
      {/* Header */}
          <Typography
            variant="h4"
            gutterBottom
            color="#34495e"
            fontWeight={600}
            marginRight={2}
            fontFamily={"Outfit sans-serif"}
            sx={{textAlign:{xs:"center",sm:"left"},mb:"20px"}}
          >
            Pay to Promoters
          </Typography>

        {/* Search Field */}
        <TextField
          placeholder="Search user"
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ width: { xs: '100%',sm:"auto", md: 'auto' },mb:"20px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "8px" }}>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      

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
