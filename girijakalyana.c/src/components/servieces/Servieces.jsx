import React from "react";
import { LuNewspaper, LuCoffee } from "react-icons/lu";
import { IoSearchOutline, IoCallOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { GrBook } from "react-icons/gr";
import rightArrow from "../../assets/rightArrow.png"
import "./Servieces.scss";
import Navbar from "../navbar/Navbar";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "../footer/Footer";


const Servieces= () => {
  const services = [
    {
      icon: <LuNewspaper style={{ fontSize: "40px", color: "#fff" }} />,
      title: "SHARE YOUR RESPONSIBILITY",
      description:
        "A highly involved Relationship Manager understands your expectations and provides personalised assistance.",
    },
    {
      icon: <IoSearchOutline style={{ fontSize: "40px", color: "#fff" }} />,
      title: "EXPERT SEARCH WITHIN REACH",
      description:
        "Your Relationship Manager employs advanced tools and expert knowledge to find matching members from thousands of profiles.",
    },
    {
      icon: <GrBook style={{ fontSize: "40px", color: "#fff" }} />,
      title: "SHORTLISTED MATCHES",
      description:
        "Your Relationship Manager contacts prospects on your behalf and ensures effective communication between you and your matches.",
    },
    {
      icon: <IoCallOutline style={{ fontSize: "40px", color: "#fff" }} />,
      title: "INITIATE COMMUNICATION",
      description:
        "Your Relationship Manager carefully handpicks profiles that are most suitable for you and sends them for your review.",
    },
    {
      icon: <LuCoffee style={{ fontSize: "40px", color: "#fff" }} />,
      title: "MEET THE PROSPECTS",
      description:
        "Your Relationship Manager contacts prospects and facilitates a meeting based on mutual interest.",
    },
    {
      icon: <TbUsers style={{ fontSize: "40px", color: "#fff" }} />,
      title: "HAPPY MATCHES",
      description: "Assistance Service will be Started Shortly!",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="servicebody">
      <h2>ASSISTED SERVICE ADVANTAGES</h2>
      <div className="service-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon-wrapper">{service.icon}</div>
            <h3>{service.title}</h3>
            <p style={{color:'#fff'}}>{service.description}</p>
            {index < services.length - 1 && (
              <FaArrowAltCircleRight className="arrow-icon"/>
              // <img src={} alt="Arrow Down" className="arrow-icon" />
            )}
          </div>
        ))}
      </div>
      <div className="happydiv">
        <p id="happy">Happy Assisted Marriages</p>
        <p>Assistance Service will be Started Shortly!</p>
      </div>
    </div>
    <Footer/>
   </>
  );
};


export default Servieces;
