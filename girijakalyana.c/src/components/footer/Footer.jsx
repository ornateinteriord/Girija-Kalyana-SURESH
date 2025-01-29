import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="section">
            <h2 className="heading">Girija Kalyana</h2>
            <p className="text">
              A Superior Matrimony Service. Register and find your special
              someone matches within your community.
            </p>
          </div>

          <div className="section">
            <h3 className="subheading about">About Company</h3>
            <ul className="list about">
              <li>About Us</li>
              <li>Promoter</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cancellation Policy</li>
            </ul>
          </div>

          <div className="section ">
            <h3 className="subheading contact">Contact Us</h3>
            <p className="text contact">Email: contactusgirijakalyana@gmail.com</p>
            <p className="text contact">Email: enquirygirijakalyana@gmail.com</p>
            <p className="text contact">Call Us: 9148824442</p>
          </div>

          <div className="section">
            <h3 className="subheading">Subscribe to Newsletter</h3>
            <input
              type="email"
              placeholder="Enter your email address"
              className="input"
            />
            <button className="button">Subscribe</button>
          </div>
        </div>

        <div className="social-media">
          <div className="icons">
            <a href="#" target="_blank" className="icon facebook">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" className="icon twitter">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" className="icon linkedin">
              <FaLinkedinIn />
            </a>
            <a href="#" target="_blank" className="icon youtube">
              <FaYoutube />
            </a>
          </div>
        </div>
        
        <div className="copyright">
          Copyright © 2021 Ornate Pvt Ltd.
        </div>
      </footer>
    </>
  );
}

export default Footer;
