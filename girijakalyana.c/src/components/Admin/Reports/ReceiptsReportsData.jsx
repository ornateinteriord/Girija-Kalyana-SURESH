import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const ReceiptsReportsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(records.length / rowsPerPage);

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

  const currentRows = filteredRecords.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
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
      <Typography variant="h4" gutterBottom sx={{color:'#34495e',fontWeight:600,fontFamily:"Outfit sans-serif"}} marginBottom={3}>
        Receipts Reports
      </Typography>

      <Grid container spacing={2} alignItems="center" flexDirection={'row'} justifyContent={'space-between'} marginTop={1} marginLeft={2}>
        <Box sx={{display:'flex',alignItems:'center',gap:'10px',marginRight:'10px'}}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
           sx={{marginRight:'10px'}}
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
      

        
          <Button variant="contained" color="primary" sx={{padding:'14px 22px',backgroundColor:'#34495e',textTransform:'capitalize'}}>
            Submit
          </Button>
          </Box>
       
        
        <Box marginRight={7} sx={{display:'flex',alignItems:'center',gap:'7px',paddingRight:'90px'}}>
        <InputLabel id="rows-per-page-label">Rows</InputLabel>
          <Select   
                 value={rowsPerPage}
                 onChange={handleRowsPerPageChange}
                 size="medium"
                 sx={{ width:'100px' }}
               >
                 {[5, 10, 15, 20].map((size) => (
                   <MenuItem key={size} value={size}>
                     {size}
                   </MenuItem>
                 ))}
               </Select>
               
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearchChange}
            sx={{width:'320px',display:'flex'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ marginRight: "8px" }}>
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        </Box>
      
      </Grid>
     
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Date</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Registration No</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>UserName</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Bank Reference Number</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Mode of Payment</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Amount</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>03-01-2025</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.id}</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.username}</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.phone}</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                  <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Rs.</TableCell>
                  <TableCell>
                    {row.id % 2 === 0 ? (
                      <Typography color="success.main" sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Success</Typography>
                    ) : (
                      <Typography color="error.main" sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>Pending</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          justifySelf={'end'}
          alignItems="center"
          padding={2}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReceiptsReportsData;
