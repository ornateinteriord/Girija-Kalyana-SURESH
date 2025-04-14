import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { customStyles, getRenewalsColumns } from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const RenewalsData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setRecords(response.data);
        setFilteredRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter data when search or records change
  useEffect(() => {
    const filtered = records.filter((record) =>
      Object.values(record)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [search, records]);


  return (
    <Box padding={2} marginTop={8} paddingLeft={6}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography
          variant="h4"
          gutterBottom
          color="#34495e"
          fontWeight={600}
          fontFamily={"Outfit sans-serif"}
        >
          Renewals
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            placeholder="Search user"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
      </Box>

      <DataTable
        columns={getRenewalsColumns()}
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
        progressPending={false}
        progressComponent={<LoadingComponent />}
      />
    </Box>
  );
};

export default RenewalsData;
