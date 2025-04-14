import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { customStyles, getPendingandSuccessUserDataColumns } from "../../../utils/DataTableColumnsProvider";

const SuccessData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredRecords = records.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase()) ||
    data.email.toLowerCase().includes(search.toLowerCase()) ||
    data.phone.includes(search) ||
    data.username.toLowerCase().includes(search.toLowerCase()) ||
    data.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", paddingLeft: "50px", paddingTop: "100px" }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography
          variant="h4"
          gutterBottom
          color="#34495e"
          fontWeight={600}
          fontFamily={"Outfit sans-serif"}
        >
          Success Data
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
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
    </div>
  );
};

export default SuccessData;
