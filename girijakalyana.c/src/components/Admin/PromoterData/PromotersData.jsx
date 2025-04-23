import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import {
  customStyles,
  getPromotersDataColumns,
} from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const PromotersData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRecords = records.filter((data) => {
    return (
      search === "" ||
      data.id.toString().includes(search) ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Box padding={4} marginTop={7} >
      <Typography
        variant="h4"
        fontWeight={600}
        color="#34495e"
        sx={{ textAlign: { xs: "center", sm: "left" }, mb: "10px" }}
        fontFamily={"Outfit sans-serif"}
      >
        Promoters
      </Typography>
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        label="search"
        variant="outlined"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        sx={{ width: { xs: "100%", sm: "auto", md: "auto" } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginRight: "8px" }}>
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />
      </Box>

      <RadioGroup
        row
        defaultValue="all"
        onChange={(e) => setShowActive(e.target.value === "active")}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
        <FormControlLabel
          value="inactive"
          control={<Radio />}
          label="Inactive"
        />
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
      </RadioGroup>

      <DataTable
        columns={getPromotersDataColumns()}
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

export default PromotersData;
