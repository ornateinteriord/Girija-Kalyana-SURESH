import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Pagination
} from "@mui/material";
import placeholderImg from "../../../myIntrest/insidepage/accepted/mathes.jpeg";
import TokenService from "../../../../token/tokenService";
import { useNavigate } from "react-router-dom";
import { useGetAcceptedInterests } from "../../../../api/User/useGetProfileDetails";

const Accepted = () => {
  const registrationNo = TokenService.getRegistrationNo();
  const { data = [], isLoading } = useGetAcceptedInterests(registrationNo);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = data.length;

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "aliceblue" }}>
      <Grid container spacing={4}>
        {currentItems.map((item, index) => {
          const user = item.sender || {};
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  width: 260,
                  height: 370,
                  borderRadius: 2,
                  boxShadow: 6,
                  textAlign: "center",
                  backgroundColor: "#f4f4f9",
                  color: "black",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 12,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="User"
                  height="190"
                  image={user.profileImg || placeholderImg}
                />
                <CardContent>
                  <Typography fontSize={18} fontWeight="bold" sx={{ color: "#333", textAlign: "start" }}>
                    {user?.first_name} {user?.last_name}
                  </Typography>
                  <Typography sx={{ color: "#666", fontSize: "16px", textAlign: "start" }} mb={0}>
                    {user.address || "N/A"}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Age: {user?.age || "N/A"}</Typography>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Height: {user?.height || "N/A"}</Typography>
                  </Box>
                  <Typography sx={{ color: "#666", fontSize: 13 }} mt={0.5}>
                    Ref No: {user?.registration_no || item.senderRegistrationNo}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      background: "#2196F3",
                      "&:hover": { background: "#1976D2" },
                    }}
                  >
                    Accepted
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box
  sx={{
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    marginTop: 4,
    gap: 2,
  }}
>
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

export default Accepted;
