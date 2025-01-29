import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Pagination } from "@mui/material";
import mathes from '../requests/mathes.jpeg';

const Requests = () => {
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;  // Set to 2 items per page
  const totalItems = 8;   // Assume we have 10 items in total

  // Fetch data for the current page using async/await
  const getData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setUserCard(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getData(page);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Cards Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
        {userCard.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: 250,
              boxShadow: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <CardMedia
              component="img"
              alt="User Profile"
              height="200"
              image={mathes}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {card.name}
              </Typography>
              <Typography color="text.primary">{card.address.city}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    {card.id}
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    Age 
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    5.4
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    Height
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="bold" sx={{  color:'black'}}>
                    SGM333
                  </Typography>
                  <Typography variant="caption" color="text.primary">
                    Reg No 
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination Section */}
      <Box sx={{ display: "flex",    justifySelf:'end', marginTop: 4 }}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Requests;
