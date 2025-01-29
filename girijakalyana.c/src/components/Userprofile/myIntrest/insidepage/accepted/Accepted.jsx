import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Button,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import mathes from '../../../myIntrest/insidepage/accepted/mathes.jpeg'

const Accepted = () => {
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch Data
  const getData = async (page) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${itemsPerPage}`
      );
      const data = await response.json();
      setUserCard(data.slice(0, 2)); // Adjust slice as per requirement
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
      {/* User Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
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
              <Typography color="text.primary">Bangalore</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
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
                  <Typography variant="caption" color="text.primary" >
                    Reg No
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
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
        //   startIcon={<FaChevronLeft />}
          onClick={() => handlePageChange(null, currentPage - 1)}
          disabled={currentPage === 1}
         
        >
         
        </Button>
        <Pagination
          count={Math.ceil(8 / itemsPerPage)} // Adjust as needed
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />
        <Button
        //   endIcon={<FaChevronRight />}
          onClick={() => handlePageChange(null, currentPage + 1)}
          disabled={currentPage === Math.ceil(10 / itemsPerPage)}
          
        >
         
        </Button>
      </Box>
    </Box>
  );
};

export default Accepted;
