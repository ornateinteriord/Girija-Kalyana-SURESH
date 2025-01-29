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
  Pagination
} from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";

// Importing Popups for different sections
import AboutPop from "./popupContent/abouPop/AboutPop"; 
import EducationPop from "./popupContent/educationPop/EducationPop"; 
import FamilyPop from "./popupContent/familyPop/FamilyPop"; 
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop"; 
import PreferencePop from "./popupContent/preferencePop/PreferencePop"; 

const ViewAll = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userCard, setUserCard] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState({ details: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [likedCards, setLikedCards] = useState(false); // To store the like status of each card

  // Handles tab changes
  const handleChange = (event, newValue) => {
    setSelectedCardDetails((prevState) => ({ ...prevState, details: newValue }));
  };

  // Opens the dialog for a specific card
  const handleCardClick = (index) => {
    const selectedCard = userCard[index];
    console.log("Selected Card Details:", selectedCard);
    setSelectedCardDetails({
      ...selectedCard,
      familyDetails: selectedCard.familyDetails || {}, // Ensure it's always an object
    });
    setOpenDialog(true);
  };

  // Closes the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    // Fetches data from the backend using useEffect when the component mounts
    const getData = async (page) => {
      try {
        // Get userId from localStorage
        const userId = localStorage.getItem("userId");
    
        // Check if the userId exists in localStorage
        if (!userId) {
          console.error("User ID is not available in localStorage.");
          return;
        }
    
        // Make the request to fetch data with userId
        const response = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=${itemsPerPage}&userId=${userId}`);
        
        const { users, totalItems } = response.data; // Assuming API returns users and totalItems
        setUserCard(users);
        setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Dynamically calculate total pages
    
        // Initialize likedCards with the liked status from the backend
        setLikedCards(users.map((user) => ({ userId: user.userId, liked: user.liked })));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
  
    // Handles like button click
    const handleLikeClick = async (userId, isLiked) => {
      try {
        // Update the like status on the backend
        await axios.post('http://localhost:5000/api/updateLike', { userId, liked: isLiked });
  
        // Update the local state with the new like status
        setUserCard((prevUserCards) =>
          prevUserCards.map((card) =>
            card.userId === userId ? { ...card, liked: isLiked } : card
          )
        );
  
        // Update the likedCards state as well
        setLikedCards((prevLikedCards) =>
          prevLikedCards.map((card) =>
            card.userId === userId ? { ...card, liked: isLiked } : card
          )
        );
      } catch (error) {
        console.error("Error updating like status: ", error);
      }
    };
  

  // Handles pagination changes
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getData(page);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  // Renders content based on the selected tab
  const renderContent = () => {
    switch (selectedCardDetails.details) {
      case 0:
        return <AboutPop details={selectedCardDetails} />;
      case 1:
        return <FamilyPop details={selectedCardDetails.familyDetails} />;
      case 2:
        return <EducationPop details={selectedCardDetails} />;
      case 3:
        return <LifeStylePop details={selectedCardDetails} />;
      case 4:
        return <PreferencePop details={selectedCardDetails} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#34495e">
          View All
        </Typography>
      </Box>

      {/* Cards Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-evenly", marginTop: 2 }}>
        {userCard.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: "270px",
              height: "390px",
              borderRadius: 1,
              boxShadow: 3,
              textAlign: "center",
              padding: 1,
              cursor: "pointer",
              position: "relative",
              background: 'black',
              color: '#fff',
            }}
           
          >
            {/* Premium and Heart Icon */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", top: 15, left: 9, right: 13, zIndex: 2 }}>
              <MdWorkspacePremium color="red" size={38} style={{ cursor: "pointer", color: 'gold' }} />
            </Box>

            <CardMedia
              component="img"
              height="230px"
              image={card.profileImg || "/default-placeholder.png"}
              onClick={() => handleCardClick(index)}
              alt="user-dp"
              sx={{ borderRadius: "1%" }}
            />

            <CardContent>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                  {card.firstName} {card.lastName}
                </Typography>
                <FaHeart
                 onClick={() => handleLikeClick(card.userId, card.like)}
                  size={36}
                  style={{ cursor: "pointer",color: card.like?"red":"#fff"}}
                />
              </Box>
              <Typography fontWeight={550} sx={{ color: '#fff' }}>{card.address}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
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
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Dialog Popup */}
      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ padding: 0, backgroundColor: "#34495e", display: "flex", flexDirection: "column", overflowY: "auto", "::-webkit-scrollbar": { display: "none" } }}>
          <Box sx={{ width: "900px", display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center", padding: 3 }}>
            {/* Profile Image */}
            <Box sx={{ flex: 1, maxWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 3, padding: 1 }}>
              <img
                src={selectedCardDetails.profileImg || "/default-placeholder.png"}
                alt="user-dp"
                style={{ width: "100%", height: "280px", borderRadius: "8px" }}
              />
            </Box>

            {/* Tabs and Content */}
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

      {/* Pagination Section */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: 2 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" color="primary" siblingCount={1} boundaryCount={1} />
      </Box>
    </Box>
  );
};

export default ViewAll;
