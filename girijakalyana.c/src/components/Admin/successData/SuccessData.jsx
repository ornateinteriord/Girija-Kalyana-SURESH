import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Pagination,
  Stack,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";
import { customStyles, getAssistanceSuccessColumns } from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const SuccessData = () => {
  const {data:users =[],isLoading,isError,error} = getAllUserProfiles()
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [search, setSearch] = useState("");


    useEffect(() => {
        if (isError) {
          toast.error(error.message);
        }
      }, [isError, error]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filterCurrentRowData = users.filter((data) => {
    const isAdmin = data?.user_role?.toLowerCase() === "admin";
    const isActive = data?.status?.toLowerCase() === "active";
    
    return (
      !isAdmin && 
      isActive && 
      (
        search === "" ||
        data.registration_no?.toString().toLowerCase().includes(search.toLowerCase()) ||
        data.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        data.username?.toString().toLowerCase().includes(search.toLowerCase()) ||
        data.mobile_no?.toString().toLowerCase().includes(search.toLowerCase()) ||
        data.caste?.toString().toLowerCase().includes(search.toLowerCase()) ||
        data.type_of_user?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filterCurrentRowData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
      <Paper>
        <DataTable
          columns={getAssistanceSuccessColumns()}
          data={filterCurrentRowData}
          customStyles={customStyles}
          pagination
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Rows per page:',
            rangeSeparatorText: 'of',
            noRowsPerPage: false,
          }}
          noDataComponent={<Typography padding={3}>No data available</Typography>}
          progressPending={isLoading}
          progressComponent={<LoadingComponent />}
        />
      </Paper>
    </div>
  );
};

export default SuccessData;
