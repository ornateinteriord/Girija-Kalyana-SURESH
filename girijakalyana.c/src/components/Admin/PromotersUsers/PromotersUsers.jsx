import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { customStyles, getPromoterTableColumns } from "../../../utils/DataTableColumnsProvider";


const PromotersUsers = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All Users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredRows = records.filter((row) => {
    const matchesSearch = 
      search === "" ||
      row.id.toString().includes(search) ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.username.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.toLowerCase().includes(search.toLowerCase()) ||
      row.address?.city?.toLowerCase().includes(search.toLowerCase());
    
    // In a real app, you would filter by user type here
    const matchesFilter = filterType === "All Users" || true;
    
    return matchesSearch && matchesFilter;
  });


  return (
    <Box p={3} paddingLeft={7} marginTop={8}>
      <Typography 
        variant="h4" 
        gutterBottom 
        color="#34495e" 
        fontWeight={600} 
        fontFamily={"Outfit sans-serif"}
      >
        Promoter Users
      </Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">          
          <FormControl sx={{ width: 140 }}>
            <InputLabel>Filter Users</InputLabel>
            <Select 
              value={filterType}
              onChange={handleFilterChange}
              label="Filter Users"
            >
              <MenuItem value="All Users">All Users</MenuItem>
              <MenuItem value="premium">Premium Users</MenuItem>
              <MenuItem value="silver">Silver Users</MenuItem>
              <MenuItem value="free">Free Users</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            size="medium"
            style={{ width: '300px' }}
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
          columns={getPromoterTableColumns()}
          data={filteredRows}
          customStyles={customStyles}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Rows per page:',
            rangeSeparatorText: 'of',
          }}
          noDataComponent={
            <Typography padding={3} textAlign="center">
              No promoters found
            </Typography>
          }
          persistTableHead
        />
      </Paper>
    </Box>
  );
};

export default PromotersUsers;