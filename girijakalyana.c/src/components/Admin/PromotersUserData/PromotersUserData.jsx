import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  customStyles,
  getPromotersUserDataColumns,
} from "../../../utils/DataTableColumnsProvider";
import { LoadingComponent } from "../../../App";

const PromotersUsersData = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

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

  // Search handler
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  

  // Filter records based on search input
  const filteredRecords = records.filter((data) =>
    [data.name, data.email, data.phone, data.username, data.address.city]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Paginate filtered records
 

  return (
    <Box p={3} marginTop={8} paddingLeft={7}>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="#34495e"
            fontWeight={600}
            marginRight={2}
            fontFamily={"Outfit sans-serif"}
          >
            Promoters Users
          </Typography>
        </Typography>

        <TextField
          label="Search"
          placeholder="Search user"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px" }}
        />
      </Box>

      <DataTable
        columns={getPromotersUserDataColumns()}
        data={filteredRecords}
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
    </Box>
  );
};

export default PromotersUsersData;
