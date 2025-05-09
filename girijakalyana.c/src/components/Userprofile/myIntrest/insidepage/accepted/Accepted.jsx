import React, { useCallback, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Pagination
} from "@mui/material";
import placeholderImg from "../../../myIntrest/insidepage/accepted/mathes.jpeg";
import TokenService from "../../../../token/tokenService";
import { useGetAcceptedInterests } from "../../../../api/User/useGetProfileDetails";
import { LoadingComponent } from "../../../../../App";
import ProfileDialog from "../../../ProfileDialog/ProfileDialog";
import AboutPop from "../../../viewAll/popupContent/abouPop/AboutPop";
import FamilyPop from "../../../viewAll/popupContent/familyPop/FamilyPop";
import EducationPop from "../../../viewAll/popupContent/educationPop/EducationPop";
import LifeStylePop from "../../../viewAll/popupContent/lifeStylePop/LifeStylePop";
import PreferencePop from "../../../viewAll/popupContent/preferencePop/PreferencePop";

const Accepted = () => {
  const registrationNo = TokenService.getRegistrationNo();
  const { data: responseData = { data: [], totalPages: 0 }, isLoading } = useGetAcceptedInterests(registrationNo);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

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

  const handleOpenDialog = useCallback((user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  }, []);

  const renderDialogContent = () => {
    if (!selectedUser) return null;
 
    const contentMap = {
      0: <AboutPop userDetails={selectedUser} />,
      1: <FamilyPop userDetails={selectedUser} />,
      2: <EducationPop userDetails={selectedUser} />,
      3: <LifeStylePop userDetails={selectedUser} />,
      4: <PreferencePop userDetails={selectedUser} />
    };
    return contentMap[currentTab] || null;
  };
  

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
                        onClick={() => handleOpenDialog(user)}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {totalItems > itemsPerPage && (
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
          )}
        </>
      )}
      {isLoading && <LoadingComponent />}
      {selectedUser && (
        <ProfileDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          selectedUser={selectedUser}
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          loggedInUserId={registrationNo} 
          isLoading={false} 
          renderDialogContent={renderDialogContent}
        />
      )}
    </Box>
  );
};

export default Accepted;
