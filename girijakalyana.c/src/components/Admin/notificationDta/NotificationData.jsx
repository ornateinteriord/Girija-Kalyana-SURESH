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
import DataTable from "react-data-table-component";
import {
  customStyles,
  getNotificationDataColumns,
} from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const NotificationData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddNews, setShowAddNews] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Search
  const filterCurrentRowData = records.filter(
    (data) =>
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

  // Popup Handlers
  const handleClosePopup = () => setShowAddNews(false);
  const handleShowPopup = () => setShowAddNews(true);

  return (
    <Box
      sx={{
        fontFamily: "Outfit, sans-serif",
        p: 3,
        marginTop: "70px",
      }}
    >
      <Typography  variant="h4"
          color="#34495e"
          fontFamily={"Outfit sans-serif"}
          sx={{ textAlign: { xs: "center", sm: "left" },mb:"20px"}}>
        Notification Data
      </Typography>
      

      <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:{xs:"column",sm:"row"},  mb:"20px"}}>
        <TextField
          label="search"
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: "auto", md: "auto" }, mb: "20px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
        <Button
        variant="contained"
        onClick={handleShowPopup}
        style={{
          width: "100px",
          height: "50px",
          background: "#34495e",
          color: "#fff",
        }}
      >
        Add
      </Button>
      </Box>

      <DataTable
        columns={getNotificationDataColumns()}
        data={filterCurrentRowData}
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
        progressPending={false}
        progressComponent={<LoadingComponent />}
      />

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
            <TextField
              label="From Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="To Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box mb={2}>
            <Select fullWidth defaultValue="" displayEmpty>
              <MenuItem value="" disabled>
                Select News Type
              </MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="Free">Free</MenuItem>
              <MenuItem value="Promoter">Promoter</MenuItem>
            </Select>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClosePopup}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClosePopup}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NotificationData;
