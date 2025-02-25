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
<<<<<<< HEAD
import { MdWorkspacePremium} from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import AboutPop from "./popupContent/abouPop/AboutPop"; 
import EducationPop from "./popupContent/educationPop/EducationPop"; 
import FamilyPop from "./popupContent/familyPop/FamilyPop"; 
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop"; 
import PreferencePop from "./popupContent/preferencePop/PreferencePop"; 
import premium8 from "../../../assets/wallpaper/premium8.avif"
=======
import { MdWorkspacePremium } from "react-icons/md";
import { FaAccessibleIcon, FaHeart } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import profileimg from "../../../assets/profile.jpg"
import AboutPop from "./popupContent/abouPop/AboutPop";
import EducationPop from "./popupContent/educationPop/EducationPop";
import FamilyPop from "./popupContent/familyPop/FamilyPop";
import LifeStylePop from "./popupContent/lifeStylePop/LifeStylePop";
import PreferencePop from "./popupContent/preferencePop/PreferencePop";
import premium from ".././../../assets/premium9.png"
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api";
>>>>>>> 90302d1 (my intrest updated)

const ViewAll = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userCard, setUserCard] = useState([]);
  const [selectedCardDetails, setSelectedCardDetails] = useState({ details: 0 });
<<<<<<< HEAD
 const [currentPage, setCurrentPage] = useState(1);
   const [totalItems, setTotalItems] = useState(0);
   const itemsPerPage = 9;

  const [userDetails , setUserDetails] = useState()
=======
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;
  const [status, setStatus] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [likedUsers, setLikedUsers] = useState([]);
  const [isInterested, setIsInterested] = useState(false);
>>>>>>> 90302d1 (my intrest updated)

  const handleChange = async (event, newValue) => {
    setSelectedCardDetails((prevState) => ({
      ...prevState,
      details: newValue,
    }));

    await getCardUserDeatils(selectedCardDetails._id, newValue);
  };
<<<<<<< HEAD
  
=======

>>>>>>> 90302d1 (my intrest updated)
  const handleCardClick = (index) => {
    const selectedCard = userCard[index];
    setSelectedCardDetails({
      ...selectedCard,
<<<<<<< HEAD
      familyDetails: selectedCard.familyDetails || {}, 
      details: 0,
    });
    setOpenDialog(true);
  };

  // Closes the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
=======
      familyDetails: selectedCard.familyDetails || {},
      details: 0,
    });
    setOpenDialog(true);
    checkInterestStatus(selectedCard._id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

>>>>>>> 90302d1 (my intrest updated)
  const getData = async (page) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("No user data found in session storage");
        return;
      }
<<<<<<< HEAD
  
      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;
      
      const response = await axios.get(
        `http://localhost:5000/api/users?page=${page}&limit=${itemsPerPage}`
      );
      const { users, totalUsers } = response.data;
  
      const filteredUsers = users.filter(user => user._id !== loggedInUserId);
  
      setUserCard(filteredUsers); 
=======

      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;

      const response = await axios.get(
        `${API_BASE_URL}/users?page=${page}&limit=${itemsPerPage}`
      );
      const { users, totalUsers } = response.data;

      const likedResponse = await axios.get(`${API_BASE_URL}/getLikedUsers/${loggedInUserId}`);
      const likedUserIds = likedResponse.data.likedUsers.map(user => user._id);

      const updatedUsers = users
        .filter(user => user._id !== loggedInUserId)
        .map(user => ({
          ...user,
          like: likedUserIds.includes(user._id)
        }));

      setUserCard(updatedUsers);
>>>>>>> 90302d1 (my intrest updated)
      setTotalItems(totalUsers);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
<<<<<<< HEAD
  
=======

>>>>>>> 90302d1 (my intrest updated)
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

<<<<<<< HEAD
 
  const renderContent = () => {
    if (!userDetails) return null; 

    switch (selectedCardDetails.details) {
      case 0:
        return <AboutPop   userDetails={userDetails} />;
=======
  const expressInterest = async (loggedInUserId, interestedUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/express-interest`, {
        loggedInUserId,
        interestedUserId: interestedUser._id,
      });

      let interestedProfiles = JSON.parse(sessionStorage.getItem("interestedProfiles")) || [];
      if (!interestedProfiles.some(profile => profile._id === interestedUser._id)) {
        interestedProfiles.push(interestedUser);
        sessionStorage.setItem("interestedProfiles", JSON.stringify(interestedProfiles));
      }

      // setStatus();
      toast.success("Express intrested successfully!",response.data.message)
      setIsInterested(true);
    } catch (error) {
      setStatus(error.response?.data?.error || "Failed to express interest.");
    }
  };

  const removeInterest = async (loggedInUserId, interestedUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/remove-interest`, {
        loggedInUserId,
        interestedUserId: interestedUser._id,
      });

      let interestedProfiles = JSON.parse(sessionStorage.getItem("interestedProfiles")) || [];
      interestedProfiles = interestedProfiles.filter(profile => profile._id !== interestedUser._id);
      sessionStorage.setItem("interestedProfiles", JSON.stringify(interestedProfiles));

      toast.error("Remove intrest successfully!",response.data.message);
      setIsInterested(false);
    } catch (error) {
      setStatus(error.response?.data?.error || "Failed to remove interest.");
    }
  };

  const checkInterestStatus = async (interestedUserId) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("User not logged in.");
        return;
      }

      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;

      const response = await axios.get(`${API_BASE_URL}/check-interest-status`, {
        params: { loggedInUserId, interestedUserId }
      });

      setIsInterested(response.data.isInterested);
      console.log("status",response.data.isInterested)
    } catch (error) {
      console.error("Error checking interest status:", error);
    }
  };

  const handleInterestToggle = () => {
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      setStatus("User not logged in.");
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const loggedInUserId = parsedUserData._id;

    if (isInterested) {
      removeInterest(loggedInUserId, selectedCardDetails);
    } else {
      expressInterest(loggedInUserId, selectedCardDetails);
    }
  };

  const renderContent = () => {
    if (!userDetails) return null;

    switch (selectedCardDetails.details) {
      case 0:
        return <AboutPop userDetails={userDetails} />;
>>>>>>> 90302d1 (my intrest updated)
      case 1:
        return <FamilyPop userDetails={userDetails} />;
      case 2:
        return <EducationPop userDetails={userDetails} />;
      case 3:
<<<<<<< HEAD
        return <LifeStylePop  userDetails={userDetails} />;
=======
        return <LifeStylePop userDetails={userDetails} />;
>>>>>>> 90302d1 (my intrest updated)
      case 4:
        return <PreferencePop userDetails={userDetails} />;
      default:
        return null;
    }
  };
<<<<<<< HEAD
  
  const getCardUserDeatils = async (userId, tabIndex) => {
    try {
      let response;
  
=======

  const getCardUserDeatils = async (userId, tabIndex) => {
    try {
      let response;

>>>>>>> 90302d1 (my intrest updated)
      if (tabIndex === 1) {
        response = await axios.get(`http://localhost:5000/api/familyReligious/${userId}`);
      } else if (tabIndex === 0) {
        response = await axios.get(`http://localhost:5000/api/about/${userId}`);
      } else if (tabIndex === 2) {
        response = await axios.get(`http://localhost:5000/api/user/${userId}`);
<<<<<<< HEAD
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
=======
      } else if (tabIndex === 3) {
        response = await axios.get(`http://localhost:5000/api/lifeStyle/${userId}`);
      } else if (tabIndex === 4) {
        response = await axios.get(`http://localhost:5000/api/parentsPrefer/${userId}`);
      }
      if (response?.data && response.status === 200) {
        setUserDetails(response?.data);
        setSelectedCardDetails(prev => ({
          ...prev,
          familyDetails: response.data.familyDetails || {},
>>>>>>> 90302d1 (my intrest updated)
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

<<<<<<< HEAD
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
  };
  
=======
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const userData = sessionStorage.getItem("userData");
        if (!userData) {
          console.error("User not logged in.");
          return;
        }

        const parsedUserData = JSON.parse(userData);
        const loggedInUserId = parsedUserData._id;

        const response = await axios.get(`http://localhost:5000/api/getLikedUsers/${loggedInUserId}`);
        setLikedUsers(response.data.likedUsers);
      } catch (error) {
        console.error("Error fetching liked users:", error);
      }
    };

    fetchLikedUsers();
  }, []);

  const handleLikeToggle = async (likedUserId, index) => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        console.error("User not logged in.");
        return;
      }

      const parsedUserData = JSON.parse(userData);
      const loggedInUserId = parsedUserData._id;

      const updatedUsers = [...userCard];
      const currentLikeStatus = updatedUsers[index].like;

      updatedUsers[index].like = !currentLikeStatus;
      setUserCard(updatedUsers);

      await axios.post(`${API_BASE_URL}/updateLike`, {
        loggedInUserId,
        likedUserId,
        liked: !currentLikeStatus,
      });
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

>>>>>>> 90302d1 (my intrest updated)
  return (
    <Box sx={{ padding: 0.5, backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#34495e">
          View All
        </Typography>
      </Box>

<<<<<<< HEAD
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-evenly", marginTop: 2 }}>
=======
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-start", alignItems: 'start', marginTop: 2 }}>
>>>>>>> 90302d1 (my intrest updated)
        {userCard.map((card, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: "270px",
<<<<<<< HEAD
                height: "400px",
                borderRadius: 1,
                boxShadow: 3,
                textAlign: "center",
                // padding: 1,
=======
                height: "420px",
                borderRadius: 1,
                boxShadow: 3,
                textAlign: "center",
>>>>>>> 90302d1 (my intrest updated)
                cursor: "pointer",
                position: "relative",
                background: 'black',
                color: '#fff',
              }}
            >
             
<<<<<<< HEAD
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
  
=======
              <CardMedia
                component="img"
                height="230px"
                image={card.profileImg }
                alt={profileimg}
                sx={{ borderRadius: "1%" }}
              />

>>>>>>> 90302d1 (my intrest updated)
              <CardContent>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                    {card.firstName} {card.lastName}
<<<<<<< HEAD
                  </Typography>  
                <FaHeart
             
                      size={36}
                    style={{ cursor: "pointer",color: card.like?"red":"#fff"}}
                    /> 
=======
                  </Typography>
                  <FaHeart
                    size={36}
                    style={{ cursor: "pointer", color: card.like ? "red" : "#fff" }}
                    onClick={() => handleLikeToggle(card._id, index)}
                  />
>>>>>>> 90302d1 (my intrest updated)
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
<<<<<<< HEAD
                <Box>
                  <Typography onClick={ () => handleClick(card?._id, index)} sx={{color:'aqua'}} justifySelf={'end'}>View All</Typography>
=======
                <Box display={'flex'} mt={0} mb={2} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                <img src={premium} alt="Premium Icon" width={100} height={50}/>
                </Box>
                  <Typography onClick={() => handleClick(card?._id, index)} sx={{ color: 'aqua',fontWeight:'700' }} justifySelf={'end'}>View More</Typography>
>>>>>>> 90302d1 (my intrest updated)
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Box>

<<<<<<< HEAD

      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ padding: 0, backgroundColor: "#34495e", display: "flex", flexDirection: "column", overflowY: "auto", "::-webkit-scrollbar": { display: "none" } }}>
          <Box sx={{ width: "900px", display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center", padding: 3 }}>
       
            <Box sx={{ flex: 1, maxWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 3, padding: 1 }}>
              <img
                src={selectedCardDetails.profileImg || "/default-placeholder.png"}
                alt="user-dp"
=======
      <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ padding: 0, backgroundColor: "#34495e", display: "flex", flexDirection: "column", overflowY: "auto", "::-webkit-scrollbar": { display: "none" } }}>
          <Box sx={{ width: "900px", display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center", padding: 3 }}>
            <Box sx={{ flex: 1, maxWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 3, padding: 1 }}>
              <img
                src={selectedCardDetails.profileImg}
                alt={profileimg}
>>>>>>> 90302d1 (my intrest updated)
                style={{ width: "100%", height: "280px", borderRadius: "8px" }}
              />
            </Box>

<<<<<<< HEAD
           
            <Box sx={{ flex: 2, minWidth: "300px" }}>
              <Tabs
                 value={selectedCardDetails.details}
=======
            <Box sx={{ flex: 2, minWidth: "300px" }}>
              <Tabs
                value={selectedCardDetails.details}
>>>>>>> 90302d1 (my intrest updated)
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
<<<<<<< HEAD
              <Box sx={{ padding: 0, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
=======

              <Box sx={{ padding: 0, backgroundColor: "#f9f9f9", borderRadius: 2, }}>
>>>>>>> 90302d1 (my intrest updated)
                {renderContent()}
              </Box>
            </Box>
          </Box>

<<<<<<< HEAD
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
=======
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2, backgroundColor: "#f9f9f9", borderTop: "1px solid #ddd", borderRadius: "0 0 8px 8px" }}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: "#34495e", display: "flex", alignItems: "center", fontSize: '26px',gap:'7px' }}>
              <RiVerifiedBadgeFill style={{fontSize:'35px'}}/> Verified Profile
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleInterestToggle} sx={{ fontWeight:'600',textTransform: "none", background: isInterested ? '#ff4444' : '#34495e', color: '#fff', fontSize: '18px' }}>
                {isInterested ? "Remove Interest" : "Express Interest"}
              </Button>
              <Button variant="contained" sx={{background:'#34495e',textTransform:'none',fontSize:'18px' ,fontWeight:'600'}} onClick={handleCloseDialog}>
>>>>>>> 90302d1 (my intrest updated)
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

<<<<<<< HEAD
  <Box
=======
      <Box
>>>>>>> 90302d1 (my intrest updated)
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: 2,
        }}
      >
        <Pagination
<<<<<<< HEAD
          count={Math.ceil(totalItems / itemsPerPage)} 
=======
          count={Math.max(1, Math.ceil(totalItems / itemsPerPage))}
>>>>>>> 90302d1 (my intrest updated)
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
<<<<<<< HEAD

=======
>>>>>>> 90302d1 (my intrest updated)
    </Box>
  );
};

<<<<<<< HEAD
export default ViewAll;

=======
export default ViewAll;
>>>>>>> 90302d1 (my intrest updated)
