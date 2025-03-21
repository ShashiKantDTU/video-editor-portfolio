import { motion } from 'framer-motion';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>NKY EDITOR</h2>
            <p>Nagendar Kumar Yadav - Crafting Cinematic Stories with Precision and Passion</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Info</h3>
              <p>Delhi, India</p>
              <p>Email: contact@nkyeditor.com</p>
              <p>Phone: +91 74287 32790</p>
            </div>
            
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#ff6b08' }}
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#ff6b08' }}
                >
                  <FaTwitter />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/nkyraosahab/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#ff6b08' }}
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#ff6b08' }}
                >
                  <FaYoutube />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#ff6b08' }}
                >
                  <FaLinkedin />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} NKY EDITOR. All Rights Reserved.</p>
          <p>Designed with <span>❤️</span> by Shashi Kant</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 