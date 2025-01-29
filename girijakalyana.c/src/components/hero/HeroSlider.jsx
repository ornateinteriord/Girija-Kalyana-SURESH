import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wall1 from '../../assets/wallpaper/wall1.jpg'
import card4 from '../../assets/card4.jpg'
import wall2 from '../../assets/wallpaper/wall2.jpg'
import Navbar from "../navbar/Navbar";

const HeroSlider = () => {
  const images = [
    {
      src: wall1,
      alt: "Happy Couple 1",
    },
    {
      src:card4,
      alt: "Happy Couple 2",
    },
    {
      src: wall2,
      alt: "Happy Couple 3",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const HeroWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    textAlign: "center",
    color: "#fff",
  }));

  const Overlay = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  }));

  const Content = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    textAlign: "center",
  }));

  return (
    <HeroWrapper>
      <Navbar />
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} component="img" src={image.src} alt={image.alt} sx={{ width: "100%", height: "auto" }} />
        ))}
      </Slider>
      <Overlay />
      <Content>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom fontFamily={'Outfit sans-serif'}>
          Find Your Perfect Match
        </Typography>
        <Typography variant="h6" fontWeight={700} paragraph fontFamily={'Outfit sans-serif'} sx={{color:'#fff'}}>
          Join the most trusted  platform and start your journey towards a lifetime of happiness.
        </Typography>
        <Button variant="contained" className="btn-getstart" size="large" sx={{textTransform:'capitalize'}}  fontFamily={'Outfit sans-serif'}>
          Get Started
        </Button>
      </Content>
    </HeroWrapper>
  );
};

export default HeroSlider;
