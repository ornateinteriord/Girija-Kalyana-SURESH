import React, { useEffect, useState } from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, MenuItem, Select, InputAdornment, Pagination } from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const PromotersData = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(false);

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageClick = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
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

  const currentRows = filteredRecords.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);  // Calculate the total number of pages

  return (
    <Box padding={4} marginTop={7} paddingLeft={8}>
       <Box display="flex" justifyContent="space-between" alignItems="center" >
         <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h4" fontWeight={600} color="#34495e" marginRight={1} fontFamily={"Outfit sans-serif"}>
          Promoters 
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="medium"
            sx={{ minWidth: 100 }}
          >
            {[5, 10, 15, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
          
        </Box>
        </Box>

        <TextField
        label='search'
          size="medium"
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{width:'300px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "8px" }}>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <RadioGroup row defaultValue="all" onChange={(e) => setShowActive(e.target.value === "active")}> 
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
        <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
      </RadioGroup>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Code</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mobile</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email ID</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Promoter Type</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Status</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Change Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>
                  {showActive ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="orange">Pending</Typography>
                  )}
                </TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>
                  {showActive ? (
                    <Button variant="outlined" color="error" >
                      Inactive
                    </Button>
                  ) : (
                    <Button variant="outlined" color="success">
                      Active
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
{/* Pagination */}
<Stack spacing={2} direction="row" justifyContent="end" mt={3}>
  <Pagination
    count={totalPages}
    page={currentPage + 1}
    onChange={handlePageClick}
    shape="rounded"
    color="primary"
    siblingCount={1}
    boundaryCount={1}
  />
</Stack>

    </Box>
  );
};

export default PromotersData;
