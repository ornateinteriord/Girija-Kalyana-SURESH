import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllAssistanceTransactions } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import DataTable from "react-data-table-component";
import {
  customStyles,
  getAssistanceOnlineTransactionDataColumns,
} from "../../../utils/DataTableColumnsProvider";

const AssistanceOnlineTransactionData = () => {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = getAllAssistanceTransactions();
  const [search, setSearch] = useState("");

  console.log(transactions);
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
      data?.amount,
    ];

    return fieldsToSearch.some(
      (field) => field && field.toString().toLowerCase().includes(searchTerm)
    );
  });

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
      <Paper
        sx={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <DataTable
          columns={getAssistanceOnlineTransactionDataColumns()}
          data={filteredRows}
          customStyles={customStyles}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          noDataComponent={
            <Typography padding={3} textAlign="center" fontFamily="Outfit">
              No users found matching your criteria.
            </Typography>
          }
          progressPending={isLoading}
          progressComponent={<LoadingComponent />}
          persistTableHead
          highlightOnHover
        />
      </Paper>
    </Box>
  );
};

export default AssistanceOnlineTransactionData;
