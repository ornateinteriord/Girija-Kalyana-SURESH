import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Pagination,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import mathes from '../../../assets/mathes.jpeg';

const UserDashboard = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState({});
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [userCard, setUserCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const cardsPerPage = 3;

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedMobail = localStorage.getItem('mobail');
   
    if (storedFirstName) setFirstName(storedFirstName);
    // if (storedLastName) setLastName(storedLastName);
  }, []);



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUserCard(data))
        .catch((error) => console.log(error));
    };

    getData();
  }, []);

  const currentCards = userCard.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const renderCards = () =>
    currentCards.map((card, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          width:'350px',
          height:'200px',
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          marginBottom: "16px",
          transition: "transform 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
        // onClick={() => handleCardClick(index)}
      >
        <Box display="flex" alignItems="center">
          <img 
            src={mathes} 
            alt="Matches" 
            style={{
              width: "100px",
              height: "90px",
              borderRadius: "10px",
              objectFit: "cover",
            }} 
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold" color="#34495e">
              {card.name}
            </Typography>
            <Typography variant="body2" color="textprimary">
              {card.address.street}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          sx={{ fontSize: "14px", color: "gray" }}
        >
          <Box textAlign="center">
            <Typography fontWeight="bold">{card.id}</Typography>
            <Typography>Age</Typography>
          </Box>
          <Box textAlign="center">
            <Typography fontWeight="bold">5.4</Typography>
            <Typography>Height</Typography>
          </Box>
          <Box textAlign="center">
            <Typography fontWeight="bold">SGM333</Typography>
            <Typography>Reg No</Typography>
          </Box>
        </Box>
      </Box>
    ));

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "24px",
        // paddingLeft:'260px'
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" color="#34495e" textTransform={'capitalize'}>
        Welcome {firstName}
         {/* {lastName} */}
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <Stack spacing={3}>
        {/* Section 1: Dashboard Overview */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ marginBottom: "24px" }}
        >
          {[{ count: 1, label: "Interested Profiles", icon: FaHeart },
            { count: 2, label: "Messages", icon: FaRegEnvelope },
            { count: 3, label: "Chats", icon: MdOutlineChatBubble }].map(
              (item, index) => (
                
               
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "14px 50px",
                    textAlign: "center",
                    flex: 1,
                    "&:hover": {
                      backgroundColor: "#f0f4ff",
                    },
                  }}
                >
                  <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                   <Typography>
                   <item.icon size={40} color="black" />
                </Typography>
                 <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {item.count}
                  </Typography>
                  <Typography variant="subtitle1" 
                  fontWeight={700}
                  fontSize={20}
                  sx={{color:'#34495e'}}
                  >{item.label}</Typography>
                  <MuiLink
                    component={Link}
                    to="#"
                    sx={{ textDecoration: "none", color: "#3f51b5", mt: 1 }}
                  >
                    View All
                  </MuiLink>
                  </Box>
                </Box>
                </Box>
              )
            )}
        </Stack>

        {/* Section 2: Card Rendering with Pagination */}
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "#34495e"}}
          >
            Interested Profiles
          </Typography>
          <Typography display={'flex'} justifyContent={'space-between'}>
          {renderCards()}
          </Typography>
        
          <Pagination
            count={Math.ceil(userCard.length / cardsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="text"
            shape="rounded"
            color="primary"
            sx={{
              display: "flex",
              justifySelf:'end',
              mt: 3,
            
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default UserDashboard;
