import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Stack,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";

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
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
           <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={"Outfit sans-serif"}>
             Success data
           </Typography>
           <Select
               value={rowsPerPage}
               onChange={handleRowsPerPageChange}
               size="medium"
               style={{width:'90px'}}
               displayEmpty
             >
               {[5, 7, 10].map((size) => (
                 <MenuItem key={size} value={size}>
                   {size}
                 </MenuItem>
               ))}
             </Select>
           </Typography>
           
     
             <TextField
             placeholder="Search user"
               label="Search"
               variant="outlined"
               value={search}
               onChange={handleSearch}
               size="medium"
               style={{width:'300px'}}
               InputProps={{
                 startAdornment: (
                   <InputAdornment position="start" style={{ marginRight: "8px" }}>
                     <FaSearch />
                   </InputAdornment>
                 ),
               }}
             />
            
           </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Registration No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mobile No</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Caste</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.registration_no}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.first_name}{row.last_name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.username}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.mobile_no}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.caste}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.type_of_user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" alignItems="center" justifySelf={"end"} mt={3}>
        <Pagination
          count={Math.ceil(filterCurrentRowData.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </div>
  );
};

export default SuccessData;
