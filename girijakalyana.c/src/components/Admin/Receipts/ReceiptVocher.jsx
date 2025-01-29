import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { FaSearch, FaUsers } from "react-icons/fa";
import axios from "axios";

const ReceiptVoucher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = records.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(records.length / rowsPerPage);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setRecords(res.data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  // Handle search filter
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter rows based on search
  const filteredRows = currentRows.filter((data) => {
    return (
      search === "" ||
      data.id.toString().includes(search.toString()) ||
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.phone.toLowerCase().includes(search.toLowerCase()) ||
      data.address.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 4,paddingLeft:'50px',marginTop:'50px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" >
              <Box display="flex" justifyContent="space-between" marginBottom={2}>
             <Typography variant="h4" fontWeight={600} color="#34495e" marginRight={1} fontFamily={"Outfit sans-serif"}>
               Receipt Vocher
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

      {/* Cards Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {[
          { count: 6, label: "Free Users", link: "View All" },
          { count: 2, label: "Premium Users", link: "View All" },
          { count: "$1", label: "Online Receipts", link: "View All" },
          { count: 6, label: "Renewals", link: "View All" },
        ].map((card, index) => (
          <Grid item xs={10} sm={6} md={3} key={index}>
            <Card variant="outlined" sx={{width:'200px',height:'200px'}}>
              <CardContent sx={{ textAlign: "center",fontWeight:600,fontFamily:"Outfit sans-serif" }}>
                <Typography variant="h4" color="#182848">{card.count}</Typography>
                <Typography variant="body1" sx={{ marginTop: 1,color:"#182848",fontWeight:600,fontFamily:"Outfit sans-serif" }}>
                  {card.label}
                </Typography>
                <FaUsers size={30} style={{ marginTop: 10,color:"#182848",fontWeight:600 }} />
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button sx={{width:'120px',fontFamily:"Outfit sans-serif"}} size="small" variant="outlined">
                  {card.link}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>ID</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Name</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Username</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Email</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Phone</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.id}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.name}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.username}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.email}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.address.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifySelf:'end',
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ReceiptVoucher;
