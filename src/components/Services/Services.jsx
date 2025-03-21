import { motion, useInView } from 'framer-motion';
import { FaVideo } from '@react-icons/all-files/fa/FaVideo';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaMicrophone } from '@react-icons/all-files/fa/FaMicrophone';
import { FaFilm } from '@react-icons/all-files/fa/FaFilm';
import { FaCamera } from '@react-icons/all-files/fa/FaCamera';
import { FaLaptopCode } from '@react-icons/all-files/fa/FaLaptopCode';
import { useRef } from 'react';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Enhanced animation variants
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6 
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8 
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
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div 
            key={index}
            className="floating-element"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: [0, 0.5, 0.3],
              x: `calc(${Math.sin(index) * 30}px + ${index * 15}%)`,
              y: `calc(${Math.cos(index) * 30}px + ${index * 10}%)`,
            } : {}}
            transition={{
              duration: 10 + index * 2,
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
                y: -15,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 }
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
                  transition: { duration: 0.2 } 
                }}
              >
                Get a Quote
                <motion.span 
                  className="arrow-right"
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="cta-container text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Looking for a custom service?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Contact me to discuss your project requirements and get a personalized quote.
          </motion.p>
          <motion.a 
            href="#contact" 
            className="btn"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 