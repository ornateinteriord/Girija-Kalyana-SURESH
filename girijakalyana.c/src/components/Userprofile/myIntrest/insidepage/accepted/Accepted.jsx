import React, { useEffect, useState } from "react";
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
import { LoadingComponent } from "../../../../../App";

const Accepted = () => {
  const registrationNo = TokenService.getRegistrationNo();
  const { data: responseData ={ data: [], totalPages: 0 } , isLoading } = useGetAcceptedInterests(registrationNo);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter only accepted interests from the response data
  const acceptedInterests = Array.isArray(responseData) 
  ? responseData.filter(item => item?.status === "accepted")
  : [];
  const totalItems = acceptedInterests?.length;
  

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = acceptedInterests?.slice(indexOfFirstItem, indexOfLastItem);




  return (
    <Box sx={{ padding: 3, backgroundColor: "aliceblue" }}>
      {totalItems === 0 ? (
        <Typography variant="h6" textAlign="center" mt={4}>
          No accepted interests found
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentItems?.map((item, index) => {
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
                      image={user.profilePhoto || placeholderImg}
                      sx={{ objectFit: "cover" }}
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
                        Ref No: {user?.registrationNo || item.senderRegistrationNo}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 1,
                          background: "#4CAF50",
                          "&:hover": { background: "#388E3C" },
                        }}
                        // onClick={() => navigate(`/profile/${user.registrationNo || item.recipientRegistrationNo}`)}
                      >
                        View Profile
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
            {totalItems > itemsPerPage && (
              <Pagination
                count={Math.ceil(totalItems / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
              />
            )}
          </Box>
        </>
      )}
      {isLoading && <LoadingComponent/>}
    </Box>
  );
};

export default Accepted;