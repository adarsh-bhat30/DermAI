import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>About DermAI</h4>
          <a href="#about">Our Mission</a>
          <a href="#team">Team</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press</a>
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <a href="#diagnosis">Skin Diagnosis</a>
          <a href="#consultation">Consultation</a>
          <a href="#reports">Reports</a>
          <a href="#faq">FAQs</a>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <a href="#contact">Contact Us</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help Center</a>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <a href="#linkedin">LinkedIn</a>
          <a href="#twitter">Twitter</a>
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 DermAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
