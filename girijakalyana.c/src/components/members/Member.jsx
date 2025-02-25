import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './Members.scss'; 
import card1 from '../../assets/card1.jpg'
import card2 from '../../assets/card2.jpg'
import card3 from '../../assets/card3.jpg'
import card4 from '../../assets/card4.jpg'
import card5 from '../../assets/card5.jpg'
import card6 from '../../assets/card6.jpg'
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const Members=() =>{
  const members = [
    { id: 1, name: 'Shobhit & Renu', date: 'Marriage Date', image: card1 },
    { id: 2, name: 'Soni & Pooja', date: 'Marriage Date', image: card2 },
    { id: 3, name: 'Rishabh & Saumya', date: 'Marriage Date 19, April 2024', image:card3  },
    { id: 4, name: 'Amit & Neha', date: 'Marriage Date', image: card4 },
    { id: 5, name: 'Rahul & Priya', date: 'Marriage Date', image: card5 },
    { id: 6, name: 'Arjun & Meera', date: 'Marriage Date', image: card6 },
  ];

  return (
    <>
    {/* <Navbar/> */}
    <Container sx={{ textAlign: 'center', marginTop: 5,marginBottom:10, }}>
      <Typography variant="h4" sx={{ color: '#606c88', fontWeight: 'bold',  fontFamily: "Outfit sans-serif" }}>
        LAKHS OF HAPPY COUPLES
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Matched by <span style={{ color: '#e53935',marginRight:'90px',  fontFamily: "Outfit sans-serif" }}>GIRIJAKALYANA</span>
      </Typography>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1000}
        navigation
        loop
      >
        {members.map((member) => (
          <SwiperSlide key={member.id}>
            <Box className="member-card" sx={{fontFamily: "Outfit sans-serif"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                   
                  }}
                />
                <Box className="member-details">
                  <Typography variant="h6" sx={{ fontWeight: 'bold',fontFamily: "Outfit sans-serif" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{fontFamily: "Outfit sans-serif",color:'black'}}>
                    {member.date}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
    <Footer />
    </>
  );
}

export default Members;
