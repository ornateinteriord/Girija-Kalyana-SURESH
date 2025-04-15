import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import {
  customStyles,
  getReceiptsReportColumns,
} from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const ReceiptsReportsData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const filteredRecords = records.filter((data) => {
    return (
      search === "" ||
      data.id.toString().includes(search) ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  return (
    <Box padding={3} paddingLeft={7} marginTop={8}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#34495e",
          fontWeight: 600,
          fontFamily: "Outfit sans-serif",
        }}
        marginBottom={3}
      >
        Receipts Reports
      </Typography>

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

      <DataTable
        columns={getReceiptsReportColumns()}
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

export default ReceiptsReportsData;
