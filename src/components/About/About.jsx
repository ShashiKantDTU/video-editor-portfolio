import { motion } from 'framer-motion';
import { FaDownload } from '@react-icons/all-files/fa/FaDownload';
import { FaCamera } from '@react-icons/all-files/fa/FaCamera';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaVideo } from '@react-icons/all-files/fa/FaVideo';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { FaFilm } from '@react-icons/all-files/fa/FaFilm';
import { useAnimation } from '../../AnimationContext';
import './About.css';

const About = () => {
  // Use the animation context for mobile awareness
  const { isMobile, mobileAwareVariants } = useAnimation();
  
  // Use mobile-aware animation variants
  const fadeInUp = {
    initial: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.3 : 0.6 }
  };
  
  // Use context variants or fallback to local ones
  const containerVariants = mobileAwareVariants?.container || {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3
      }
    }
  };
  
  const itemVariants = mobileAwareVariants?.item || {
    hidden: { y: isMobile ? 0 : 20, opacity: isMobile ? 1 : 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 50 : 100,
        duration: isMobile ? 0.2 : 0.4
      }
    }
  };

  const skillHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: isMobile ? 1 : 1.05, 
      boxShadow: isMobile ? "none" : "0px 10px 30px rgba(0, 0, 0, 0.2)",
      backgroundColor: "var(--secondary-color)",
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 400,
        damping: 10
      }
    }
  };
  
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          <motion.div 
            className="about-image-container"
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, type: "spring" }}
          >
            <div className="about-image">
              {/* Placeholder for profile image with enhanced effects */}
              <motion.div 
                className="profile-placeholder"
                initial={{ filter: isMobile ? "grayscale(0%)" : "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: isMobile ? 0.5 : 1.5 }}
              >
                <motion.div
                  className="profile-glow"
                  animate={isMobile ? {} : {
                    boxShadow: ["0 0 10px var(--primary-glow)", "0 0 30px var(--primary-glow)", "0 0 10px var(--primary-glow)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="experience-badge"
                initial={{ scale: isMobile ? 1 : 0, rotate: isMobile ? 0 : -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  delay: isMobile ? 0.1 : 0.5, 
                  duration: isMobile ? 0.3 : 0.6, 
                  type: "spring",
                  stiffness: isMobile ? 100 : 200,
                  damping: 10
                }}
              >
                <span className="number">5</span>
                <span className="text">Years<br/>Experience</span>
              </motion.div>
              
              <motion.div
                className="awards-container"
                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: isMobile ? 0.2 : 0.8, duration: isMobile ? 0.3 : 0.6 }}
              >
                <div className="award-item">
                  <FaStar /> 50+ Projects
                </div>
              </motion.div>
              
              <motion.div
                className="about-stats-mobile"
                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.1 : 0.4, staggerChildren: isMobile ? 0.1 : 0.2 }}
              >
                <motion.div 
                  className="stat-card"
                  whileHover={{ y: isMobile ? 0 : -5, boxShadow: isMobile ? "none" : "0 12px 25px rgba(0, 0, 0, 0.3)" }}
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: isMobile ? 0.1 : 0.5 }}
                >
                  <div className="stat-number">5</div>
                  <div className="stat-label">Years<br/>Experience</div>
                </motion.div>
                
                <motion.div 
                  className="stat-card"
                  whileHover={{ y: isMobile ? 0 : -5, boxShadow: isMobile ? "none" : "0 12px 25px rgba(0, 0, 0, 0.3)" }}
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: isMobile ? 0.2 : 0.7 }}
                >
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects<br/>Completed</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, type: "spring" }}
          >
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.1 }}
              className="about-text-content"
            >
              <motion.h2 className="section-title" variants={itemVariants}>About Me</motion.h2>
              <motion.h3 className="about-subtitle" variants={itemVariants}>Professional Video Editor</motion.h3>
              <motion.p variants={itemVariants}>
                Welcome to my world of visual storytelling. I'm Nagendar Kumar Yadav (NKY), a professional video editor with over 5 years of experience in the video editing industry. 
                I've had the privilege of creating impactful stories for various clients, from corporate brands to personal projects.
              </motion.p>
              <motion.p variants={itemVariants}>
                My passion for video editing started at a young age and has evolved into a professional career marked by 
                creativity, technical precision, and a deep understanding of visual narratives.
              </motion.p>
              
              <motion.div 
                className="skills-container"
                variants={containerVariants}
              >
                <motion.div 
                  className="skill-item"
                  variants={skillHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="hover"
                >
                  <div className="skill-icon">
                    <FaEdit />
                  </div>
                  <h4>Video Editing</h4>
                  <p>Skilled in professional editing techniques using industry-standard software to create compelling visual stories.</p>
                  <motion.div 
                    className="skill-progress-bar"
                    initial={{ width: isMobile ? "95%" : 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.1 : 0.5 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="skill-item"
                  variants={skillHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="hover"
                >
                  <div className="skill-icon">
                    <FaCamera />
                  </div>
                  <h4>Color Grading</h4>
                  <p>Expert in color correction and grading to achieve cinematic looks and enhance visual storytelling.</p>
                  <motion.div 
                    className="skill-progress-bar"
                    initial={{ width: isMobile ? "90%" : 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.2 : 0.7 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="skill-item"
                  variants={skillHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="hover"
                >
                  <div className="skill-icon">
                    <FaVideo />
                  </div>
                  <h4>Motion Graphics</h4>
                  <p>Creating engaging motion graphics and visual effects that enhance video projects and captivate audiences.</p>
                  <motion.div 
                    className="skill-progress-bar"
                    initial={{ width: isMobile ? "85%" : 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.3 : 0.9 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="resume-btn-container"
                variants={itemVariants}
              >
                <motion.a 
                  href="#" 
                  className="btn"
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: isMobile ? 0.98 : 0.95 }}
                >
                  <FaDownload className="download-icon" /> Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 