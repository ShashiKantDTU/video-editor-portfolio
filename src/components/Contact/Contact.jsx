import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from '@react-icons/all-files/fa/FaMapMarkerAlt';
import { FaPhone } from '@react-icons/all-files/fa/FaPhone';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaWhatsapp } from '@react-icons/all-files/fa/FaWhatsapp';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss your video editing project with Nagendar Kumar Yadav (NKY)</p>
        </motion.div>
        
        <div className="contact-container">
          <motion.div 
            className="contact-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-header">
              <h3>Ready to Transform Your Videos?</h3>
              <p>I'm available for freelance projects, collaborations, and consulting.</p>
            </div>
            
            <div className="contact-grid">
              <motion.div 
                className="contact-info-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="info-card-header">
                  <div className="icon-circle">
                    <FaMapMarkerAlt />
                  </div>
                  <h4>Location</h4>
                </div>
                <p>Delhi, India</p>
                <div className="card-decoration"></div>
              </motion.div>
              
              <motion.div 
                className="contact-info-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="info-card-header">
                  <div className="icon-circle">
                    <FaPhone />
                  </div>
                  <h4>Phone</h4>
                </div>
                <p>+91 74287 32790</p>
                <a href="tel:+917428732790" className="contact-link">
                  Call Now <FaArrowRight />
                </a>
                <div className="card-decoration"></div>
              </motion.div>
              
              <motion.div 
                className="contact-info-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="info-card-header">
                  <div className="icon-circle">
                    <FaEnvelope />
                  </div>
                  <h4>Email</h4>
                </div>
                <p>contact@nkyeditor.com</p>
                <a href="mailto:contact@nkyeditor.com" className="contact-link">
                  Send Email <FaArrowRight />
                </a>
                <div className="card-decoration"></div>
              </motion.div>
              
              <motion.div 
                className="contact-info-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="info-card-header">
                  <div className="icon-circle">
                    <FaWhatsapp />
                  </div>
                  <h4>WhatsApp</h4>
                </div>
                <p>Quick Response via WhatsApp</p>
                <a href="https://wa.me/917428732790" target="_blank" rel="noopener noreferrer" className="contact-link">
                  Message Now <FaArrowRight />
                </a>
                <div className="card-decoration"></div>
              </motion.div>
            </div>
            
            <div className="contact-social">
              <h4>Connect With Me</h4>
              <div className="social-icons-container">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/nkyraosahab/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                  title="Personal Profile"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/nkydesign_production/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                  title="Production Profile"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                >
                  <FaYoutube />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, color: '#ff6b08' }}
                  className="social-icon-circle"
                >
                  <FaLinkedin />
                </motion.a>
              </div>
            </div>
            
            <motion.div 
              className="cta-container"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3>Let's Create Something Amazing Together</h3>
              <p>Ready to take your video content to the next level? Contact me now and let's discuss your project.</p>
              <div className="cta-buttons">
                <a href="tel:+917428732790" className="btn">
                  <FaPhone /> Call Directly
                </a>
                <a href="https://wa.me/917428732790" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 