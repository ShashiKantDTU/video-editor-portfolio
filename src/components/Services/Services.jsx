import { motion, useInView } from 'framer-motion';
import { FaVideo } from '@react-icons/all-files/fa/FaVideo';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaMicrophone } from '@react-icons/all-files/fa/FaMicrophone';
import { FaFilm } from '@react-icons/all-files/fa/FaFilm';
import { FaCamera } from '@react-icons/all-files/fa/FaCamera';
import { FaLaptopCode } from '@react-icons/all-files/fa/FaLaptopCode';
import { useRef } from 'react';
import { useAnimation } from '../../AnimationContext';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Use the animation context for mobile awareness
  const { isMobile, mobileAwareVariants } = useAnimation();
  
  // Use mobile-aware animation variants - either from context or local fallbacks
  const containerVariants = mobileAwareVariants?.container || {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.2,
        delayChildren: isMobile ? 0.05 : 0.3
      }
    }
  };
  
  const itemVariants = mobileAwareVariants?.item || {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 50, scale: isMobile ? 1 : 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: isMobile ? 50 : 100,
        damping: isMobile ? 5 : 10,
        duration: isMobile ? 0.3 : 0.6 
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: isMobile ? 50 : 100,
        damping: isMobile ? 5 : 10,
        duration: isMobile ? 0.4 : 0.8 
      }
    }
  };
  
  // Services data with enhanced descriptions
  const servicesData = [
    {
      id: 1,
      icon: <FaEdit />,
      title: 'Professional Video Editing',
      description: 'Complete post-production services including content organization, pacing, and narrative structure to create compelling stories that captivate your audience.',
    },
    {
      id: 2,
      icon: <FaFilm />,
      title: 'Color Grading',
      description: 'Expert color correction and grading to achieve cinematic looks, enhance mood, and create consistent visual styles that give your project a professional polish.',
    },
    {
      id: 3,
      icon: <FaMicrophone />,
      title: 'Audio Enhancement',
      description: 'Professional audio cleaning, mixing, and enhancement services including background music integration, sound effects, and dialogue balancing for crystal-clear sound.',
    },
    {
      id: 4,
      icon: <FaVideo />,
      title: 'Social Media Content',
      description: 'Specialized editing for social media platforms with proper aspect ratios, engaging pacing, and platform-specific optimizations to maximize engagement and reach.',
    },
    {
      id: 5,
      icon: <FaLaptopCode />,
      title: 'Motion Graphics & VFX',
      description: 'Custom animated graphics, titles, transitions, and visual effects to enhance your videos and create professional presentations that stand out from the competition.',
    },
    {
      id: 6,
      icon: <FaCamera />,
      title: 'Montage Creation',
      description: 'Crafting engaging montages and highlight reels from your footage, perfect for events, travel videos, promotional content, and memorable personal moments.',
    }
  ];
  
  return (
    <section id="services" className="section services" ref={sectionRef}>
      <div className="services-bg-elements">
        {Array.from({ length: isMobile ? 2 : 5 }).map((_, index) => (
          <motion.div 
            key={index}
            className="floating-element"
            initial={{ opacity: isMobile ? 0.3 : 0 }}
            animate={isInView ? { 
              opacity: isMobile ? [0.2, 0.3, 0.2] : [0, 0.5, 0.3],
              x: isMobile ? `calc(${Math.sin(index) * 15}px + ${index * 10}%)` : `calc(${Math.sin(index) * 30}px + ${index * 15}%)`,
              y: isMobile ? `calc(${Math.cos(index) * 15}px + ${index * 5}%)` : `calc(${Math.cos(index) * 30}px + ${index * 10}%)`,
            } : {}}
            transition={{
              duration: isMobile ? (5 + index * 1) : (10 + index * 2),
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <motion.div 
          className="section-header text-center"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">Professional video editing services tailored to your needs</p>
        </motion.div>
        
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              className="service-card"
              variants={itemVariants}
              whileHover={{ 
                y: isMobile ? 0 : -15,
                boxShadow: isMobile ? "none" : "0 15px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: isMobile ? 0.2 : 0.3 }
              }}
            >
              <div className="service-icon-container">
                <div className="service-icon">
                  {service.icon}
                </div>
                <div className="service-icon-glow" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.a 
                href="#contact" 
                className="service-link"
                whileHover={{ 
                  color: "#fff", 
                  transition: { duration: isMobile ? 0.1 : 0.2 } 
                }}
              >
                Get a Quote
                <motion.span 
                  className="arrow-right"
                  initial={{ x: 0 }}
                  whileHover={{ x: isMobile ? 4 : 8 }}
                  transition={{ type: "spring", stiffness: isMobile ? 200 : 300 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="cta-container text-center"
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.3 : 0.8 }}
        >
          <motion.h3
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.4 : 1 }}
          >
            Looking for a custom service?
          </motion.h3>
          <motion.p
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.5 : 1.2 }}
          >
            Contact me to discuss your project requirements and get a personalized quote.
          </motion.p>
          <motion.a 
            href="#contact" 
            className="btn"
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.6 : 1.4 }}
            whileHover={{ 
              scale: isMobile ? 1 : 1.05,
              transition: { duration: isMobile ? 0.1 : 0.2 }
            }}
            whileTap={{ scale: isMobile ? 0.98 : 0.95 }}
          >
            Contact Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 