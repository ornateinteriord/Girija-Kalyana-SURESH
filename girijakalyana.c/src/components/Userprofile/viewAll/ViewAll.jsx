import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Pagination,
  Link
} from "@mui/material";
import { MdWorkspacePremium} from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import AboutPop from "./popupContent/abouPop/AboutPop"; 
import EducationPop from "./popupContent/educationPop/EducationPop"; 
import FamilyPop from "./popupContent/familyPop/FamilyPop"; 
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop"; 
import PreferencePop from "./popupContent/preferencePop/PreferencePop"; 
import premium8 from "../../../assets/wallpaper/premium8.avif"

const ViewAll = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userCard, setUserCard] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState({ details: 0 });
 const [currentPage, setCurrentPage] = useState(1);
   const [totalItems, setTotalItems] = useState(0);
   const itemsPerPage = 9;

  const [userDetails , setUserDetails] = useState()

  const handleChange = async (event, newValue) => {
    setSelectedCardDetails((prevState) => ({
      ...prevState,
      details: newValue,
    }));

    await getCardUserDeatils(selectedCardDetails._id, newValue);
  };
  
  const handleCardClick = (index) => {
    const selectedCard = userCard[index];
    setSelectedCardDetails({
      ...selectedCard,
      familyDetails: selectedCard.familyDetails || {}, 
      details: 0,
    });
    setOpenDialog(true);
  };

  // Closes the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getData = async (page) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("No user data found in session storage");
        return;
      }
  
      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;
      
      const response = await axios.get(
        `http://localhost:5000/api/users?page=${page}&limit=${itemsPerPage}`
      );
      const { users, totalUsers } = response.data;
  
      const filteredUsers = users.filter(user => user._id !== loggedInUserId);
  
      setUserCard(filteredUsers); 
      setTotalItems(totalUsers);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

 
  const renderContent = () => {
    if (!userDetails) return null; 

    switch (selectedCardDetails.details) {
      case 0:
        return <AboutPop   userDetails={userDetails} />;
      case 1:
        return <FamilyPop userDetails={userDetails} />;
      case 2:
        return <EducationPop userDetails={userDetails} />;
      case 3:
        return <LifeStylePop  userDetails={userDetails} />;
      case 4:
        return <PreferencePop userDetails={userDetails} />;
      default:
        return null;
    }
  };
  
  const getCardUserDeatils = async (userId, tabIndex) => {
    try {
      let response;
  
      if (tabIndex === 1) {
        response = await axios.get(`http://localhost:5000/api/familyReligious/${userId}`);
      } else if (tabIndex === 0) {
        response = await axios.get(`http://localhost:5000/api/about/${userId}`);
      } else if (tabIndex === 2) {
        response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      }
      else if (tabIndex === 3) {
        response = await axios.get( `http://localhost:5000/api/lifeStyle/${userId}`);
      }
      else if (tabIndex === 4) {
        response = await axios.get(`http://localhost:5000/api/parentsPrefer/${userId}`);
      }
      if (response?.data && response.status === 200) {
        setUserDetails(response?.data); 
        setSelectedCardDetails(prev => ({
          ...prev,
          familyDetails: response.data.familyDetails || {}, 
        }));
      }
    } catch (error) {
      console.log("Error while fetching user data", error);
    }
  };

  const handleClick = async (userId, index) => {
    await getCardUserDeatils(userId, selectedCardDetails.details);
    handleCardClick(index);
  };

  
  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
  };
  
  return (
    <Box sx={{ padding: 0.5, backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#34495e">
          View All
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-evenly", marginTop: 2 }}>
        {userCard.map((card, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: "270px",
                height: "400px",
                borderRadius: 1,
                boxShadow: 3,
                textAlign: "center",
                // padding: 1,
                cursor: "pointer",
                position: "relative",
                background: 'black',
                color: '#fff',
              }}
            >
             
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", top: 15, left: 9, right: 13, zIndex: 2 }}>
                <MdWorkspacePremium color="red" size={38} style={{ cursor: "pointer", color: 'gold' }} />
              </Box>
              <CardMedia
                component="img"
                height="230px"
                image={card.profileImg || "/default-placeholder.png"}
                alt="user-dp"
                sx={{ borderRadius: "1%" }}
              />
  
              <CardContent>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                    {card.firstName} {card.lastName}
                  </Typography>  
                <FaHeart
             
                      size={36}
                    style={{ cursor: "pointer",color: card.like?"red":"#fff"}}
                    /> 
                </Box>
                <Typography fontWeight={550} sx={{ color: '#fff' }}>{card.address || "N/A"}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {card.parentPrefer?.toAge || "N/A"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Age
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {card.parentPrefer?.toHeight || "N/A"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Height
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: "#fff" }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Reg No
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography onClick={ () => handleClick(card?._id, index)} sx={{color:'aqua'}} justifySelf={'end'}>View All</Typography>
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Box>


      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ padding: 0, backgroundColor: "#34495e", display: "flex", flexDirection: "column", overflowY: "auto", "::-webkit-scrollbar": { display: "none" } }}>
          <Box sx={{ width: "900px", display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center", padding: 3 }}>
       
            <Box sx={{ flex: 1, maxWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 3, padding: 1 }}>
              <img
                src={selectedCardDetails.profileImg || "/default-placeholder.png"}
                alt="user-dp"
                style={{ width: "100%", height: "280px", borderRadius: "8px" }}
              />
            </Box>

           
            <Box sx={{ flex: 2, minWidth: "300px" }}>
              <Tabs
                 value={selectedCardDetails.details}
                onChange={handleChange}
                centered
                textColor="primary"
                indicatorColor="primary"
                sx={{ mb: 1 }}
              >
                <Tab label="About" />
                <Tab label="Family" />
                <Tab label="Education" />
                <Tab label="LifeStyle" />
                <Tab label="Preference" />
              </Tabs>
              <Box sx={{ padding: 0, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
                {renderContent()}
              </Box>
            </Box>
          </Box>

          {/* Footer Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2, backgroundColor: "#f9f9f9", borderTop: "1px solid #ddd", borderRadius: "0 0 8px 8px" }}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: "#34495e", display: "flex", alignItems: "center", fontSize: '26px' }}>
              ✅ Verified Profile
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" sx={{ textTransform: "capitalize", background: '#34495e', color: '#fff', fontSize: '18px' }}>
                Express Interest
              </Button>
              <Button variant="contained" color="error" onClick={handleCloseDialog}>
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

  <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: 2,
        }}
      >
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)} 
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>

    </Box>
  );
};

export default ViewAll;

