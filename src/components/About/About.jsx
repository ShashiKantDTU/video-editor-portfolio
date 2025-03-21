import { motion } from 'framer-motion';
import { FaDownload } from '@react-icons/all-files/fa/FaDownload';
import { FaCamera } from '@react-icons/all-files/fa/FaCamera';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaVideo } from '@react-icons/all-files/fa/FaVideo';
import { FaAward } from '@react-icons/all-files/fa/FaAward';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import './About.css';

const About = () => {
  // Enhanced animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const skillHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      backgroundColor: "var(--secondary-color)",
      transition: {
        type: "spring",
        stiffness: 400,
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="about-image">
              {/* Placeholder for profile image with enhanced effects */}
              <motion.div 
                className="profile-placeholder"
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  className="profile-glow"
                  animate={{
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
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.6, 
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <span className="number">5</span>
                <span className="text">Years<br/>Experience</span>
              </motion.div>
              
              <motion.div
                className="awards-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="award-item">
                  <FaAward /> Best Editor 2022
                </div>
                <div className="award-item">
                  <FaStar /> 50+ Projects
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
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
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
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
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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