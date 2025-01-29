import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Modal,
  Pagination,
  InputAdornment,
} from "@mui/material";

import axios from "axios";
import { FaAd, FaSearch } from "react-icons/fa";
import { FaBandage } from "react-icons/fa6";

const NotificationData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddNews, setShowAddNews] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = records.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(records.length / rowsPerPage);

  // Fetch data
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

  // Handle Search
  const filterCurrentRowData = currentRows.filter((data) =>
    search === null ||
    data.id.toString().includes(search.toString()) ||
    data.name.toLowerCase().includes(search.toLowerCase()) ||
    data.username.toLowerCase().includes(search.toLowerCase()) ||
    data.email.toLowerCase().includes(search.toLowerCase()) ||
    data.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // Popup Handlers
  const handleClosePopup = () => setShowAddNews(false);
  const handleShowPopup = () => setShowAddNews(true);

  return (
    <Box sx={{ fontFamily: "Outfit, sans-serif", p: 3,paddingLeft:'50px',marginTop:'70px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography display={'flex'} alignItems={'center'} gap={0.5}>
        <Typography variant="h4" color="#34495e" fontFamily={'Outfit sans-serif'}>Notification Data</Typography>
        <Box display="flex" alignItems="center">
       
       <Select
         value={rowsPerPage}
         onChange={handleRowsPerPageChange}
         sx={{ mx: 2, width: 80 }}
       >
         <MenuItem value={5}>5</MenuItem>
         <MenuItem value={10}>10</MenuItem>
         <MenuItem value={15}>15</MenuItem>
         <MenuItem value={20}>20</MenuItem>
       </Select>
    
     </Box>
     <Button
          variant="contained"
          
          onClick={handleShowPopup}
          style={{width:'100px',height:'50px',background:'#34495e',color:"#fff"}}
        >
          Add
        </Button>
        </Typography>
   

      <Box display="flex" justifySelf={'end'} alignItems="center" mb={2}>
    
        <TextField
        label='search'
          variant="outlined"
          placeholder="Search"
    
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300 , marginLeft:'8px'}}
          InputProps={{
            startAdornment:(
                <InputAdornment >
                <FaSearch />
                </InputAdornment>
            )
          }}
        />
      </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>News ID</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>News Details</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>From Date</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>To Date</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Type Of News</TableCell>
              <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'18px'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterCurrentRowData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>{row.id}</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}} >-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>12-01-2025</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>12-02-2025</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>-</TableCell>
                <TableCell sx={{fontFamily:"Outfit sans-serif",fontSize:'17px'}}>
                  <Typography
                    variant="body2"
                    color={index % 2 === 0 ? "green" : "orange"}
                  >
                    {index % 2 === 0 ? "Active" : "Pending"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifySelf={'end'} alignItems="center" mt={2}>
        
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* Add News Modal */}
      <Modal open={showAddNews} onClose={handleClosePopup}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add News
          </Typography>
          <Box mb={2}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box display="flex" gap={2} mb={2}>
            <TextField label="From Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="To Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Box>
          <Box mb={2}>
            <Select
              fullWidth
              defaultValue=""
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select News Type
              </MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Promoter">Promoter</MenuItem>
            </Select>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleClosePopup}>
              Submit
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClosePopup}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NotificationData;
