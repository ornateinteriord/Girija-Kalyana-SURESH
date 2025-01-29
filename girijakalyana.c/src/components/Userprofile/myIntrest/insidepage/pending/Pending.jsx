import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, Pagination } from "@mui/material";
import mathes from '../pending/mathes.jpeg';

const Pending = () => {
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalItems = 8; // Assume 50 items for pagination purposes

  // Fetch data for current page using async/await
  const getData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setUserCard(data.slice(0, 3)); // Slice just for display purposes
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
    <>
      {/* Cards Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        {userCard.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: 250,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={mathes}
              alt="user-dp"
              sx={{ objectFit: "cover", borderRadius: "4px" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
              {card.name}
              </Typography>
              <Typography color="text.primary">Bangalore</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 1,
                }}
              >
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

      {/* Pagination Box */}
      <Box
        sx={{
          display: "flex",
          justifySelf:'end',
          alignItems: "center",
          marginTop: 4,
          gap: 2,
        }}
      >
        <Button
          onClick={(e) => handlePageChange(e, currentPage - 1)}
          disabled={currentPage === 1}
        >
      
        </Button>

        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)} // Adjust based on total items and items per page
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />

        <Button
          onClick={(e) => handlePageChange(e, currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
        
        </Button>
      </Box>
    </>
  );
};

export default Pending;
