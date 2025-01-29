import React from "react";
import "./ContactUs.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const ContactUs = () => {
  return (
    <>
     <Navbar/>
  
    <div className="contact-container">
     
      {/* Header Section */}
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>
          We're here to assist you! Feel free to reach out to us with any
          questions, concerns, or feedback.
        </p>
      </div>

      {/* Main Content: Contact Us (Left) and Send Message (Right) */}
      <div className="contact-content">
        {/* Contact Details - Left Section */}
        <div className="contact-details">
          <div className="contact-card">
            <h3>Our Office</h3>
            <p>#148/E, 2nd Floor, 17th Main Vijaynagar,</p>
            <p>Bangalore - 560040</p>
          </div>

          <div className="contact-card">
            <h3>Email Us</h3>
            <p>contactusgirijakalyana@gmail.com</p>
            <p>enquirygirijakalyana@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3>Call Us</h3>
            <p>+91 9148824442</p>
            <p>+91 080-23409697</p>
          </div>
        </div>

        {/* Contact Form - Right Section */}
        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <div style={{display:'flex',gap:'15px'}}>
            <button type="submit" className="subbtn">Submit</button>
            <button type="submit" className="subbtn">Clear</button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
