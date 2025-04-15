import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../App";
import DataTable from "react-data-table-component";
import { customStyles, getUserReportsColumns } from "../../../utils/DataTableColumnsProvider";

const UserReports = () => {
  const { data: users = [], isLoading, isError, error } = getAllUserProfiles();
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };



  const filteredRecords = users.filter((record) => {
    return (
      search === "" ||
      record.registration_date?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.registration_no?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.first_name?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.gender?.toString().toLowerCase().includes(search.toLowerCase()) ||
      record.status?.toString().toLowerCase().includes(search.toLowerCase()) 
    );
  });


  return (
    <Box padding={2} paddingLeft={7} marginTop={8}>
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          color="#34495e"
          marginRight={1}
          fontFamily={"Outfit sans-serif"}
          marginBottom={3}
        >
          Users Reports
        </Typography>
      </Box>

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
        columns={getUserReportsColumns()}
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
        progressPending={isLoading}
        progressComponent={<LoadingComponent />}
      />
    </Box>
  );
};

export default UserReports;
