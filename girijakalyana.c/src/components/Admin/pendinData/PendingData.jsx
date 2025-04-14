import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Stack,
  Pagination,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { getAllUserProfiles } from "../../api/Admin";
import { LoadingComponent } from "../../../App";
import { toast } from "react-toastify";

const PendingData = () => {
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

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filteredRecords = users.filter((record) => {
    const isAdmin = record?.user_role?.toLowerCase() === "admin";
    const isPending = record?.status?.toLowerCase() === "pending"; // Check if status is "pending"

    return (
      !isAdmin &&
      isPending && // Only include pending users
      [
        record.registration_no?.toString().toLowerCase(),
        record.first_name?.toLowerCase(),
        record.username?.toLowerCase(),
        record.mobile_no?.toString().toLowerCase(),
        record.caste?.toString().toLowerCase(),
        record.type_of_user?.toString().toLowerCase(),
      ].some((field) => field?.includes(search.toLowerCase()))
    );
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box p={5} marginTop={6}>
      
           <Box display="flex" justifyContent="space-between" marginBottom={2}>
           <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
           <Typography variant="h4" gutterBottom color="#34495e" fontWeight={600} marginRight={2} fontFamily={'Outfit sans-serif'}>
             Pending data
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
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Phone</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Caste</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>User Type</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.registration_no}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.first_name}{record.last_name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.username}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.mobile_no}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.caste}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{record.type_of_user}</TableCell>
                {/* <TableCell>
                  <Button variant="contained" color="success">
                    Active
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" alignItems="center" justifySelf={"end"} mt={3}>
        <Pagination
          count={Math.ceil(filteredRecords.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default PendingData;
