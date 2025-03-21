import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useAnimation as useCustomAnimation } from '../../AnimationContext';
import './Clients.css';
import clientsData from './clientsData';

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Access our custom animation context
  const { isMobile, mobileAwareVariants } = useCustomAnimation();
  
  useEffect(() => {
    // Trigger animations when section comes into view
    if (isInView) {
      controls.start('visible');
    }
    
    // Calculate the carousel width for positioning
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, [isInView, controls]);
  
  // When we're in view, auto cycle through the clients
  useEffect(() => {
    let intervalId;
    if (isInView) {
      intervalId = setInterval(() => {
        setSelectedClient((prev) => (prev + 1) % clientsData.length);
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView]);
  
  const nextClient = () => {
    setSelectedClient((prev) => (prev + 1) % clientsData.length);
  };
  
  const prevClient = () => {
    setSelectedClient((prev) => (prev - 1 + clientsData.length) % clientsData.length);
  };
  
  const goToClient = (index) => {
    setSelectedClient(index);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };
  
  const carouselVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  // Determine card positioning based on index relative to active card
  const getCardStyle = (index) => {
    const diff = index - selectedClient;
    
    // Handle circular wrapping
    let wrappedDiff = diff;
    if (diff > clientsData.length / 2) wrappedDiff = diff - clientsData.length;
    if (diff < -clientsData.length / 2) wrappedDiff = diff + clientsData.length;
    
    const cardWidth = isMobile ? 280 : 350;
    const gap = isMobile ? 15 : 30;
    const baseZIndex = 100;
    
    // Calculate position and visual properties based on distance from active
    let xPosition = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = baseZIndex - Math.abs(wrappedDiff);
    
    // Center active card
    if (wrappedDiff === 0) {
      xPosition = 0;
      scale = 1;
      opacity = 1;
      zIndex = baseZIndex + 10;
    } 
    // Cards to the right
    else if (wrappedDiff > 0) {
      const offset = Math.min(wrappedDiff, 2);
      xPosition = offset * (cardWidth + gap);
      scale = 1 - offset * 0.1;
      opacity = 1 - offset * 0.3;
    } 
    // Cards to the left
    else {
      const offset = Math.max(wrappedDiff, -2);
      xPosition = offset * (cardWidth + gap);
      scale = 1 + offset * 0.1;
      opacity = 1 + offset * 0.3;
    }
    
    return {
      zIndex,
      x: xPosition,
      scale,
      opacity
    };
  };
  
  return (
    <section id="clients" className="section clients" ref={sectionRef}>
      <div className="clients-bg"></div>
      
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="section-header text-center" variants={titleVariants}>
          <h2 className="section-title">Our Clients</h2>
          <p className="section-subtitle">Trusted by industry professionals and content creators</p>
        </motion.div>
        
        <motion.div 
          className="clients-carousel-container"
          variants={carouselVariants}
        >
          <div className="carousel-controls">
            <button 
              className="carousel-arrow prev-arrow" 
              onClick={prevClient}
              aria-label="Previous client"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="carousel-wrapper" ref={carouselRef}>
              <div className="clients-carousel">
                {clientsData.map((client, index) => (
                  <motion.div
                    key={client.id}
                    className={`client-card ${index === selectedClient ? 'active' : ''}`}
                    animate={getCardStyle(index)}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1
                    }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.2 } 
                    }}
                    onClick={() => goToClient(index)}
                  >
                    <div className="client-card-inner">
                      <img 
                        src={client.image} 
                        alt={`${client.name}'s Instagram profile`}
                        className="instagram-screenshot"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/500x300/7168f2/ffffff?text=Instagram+Screenshot';
                        }}
                      />
                      <div className="overlay-info">
                        <span className="client-handle">{client.handle}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <button 
              className="carousel-arrow next-arrow" 
              onClick={nextClient}
              aria-label="Next client"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="carousel-indicators">
            {clientsData.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === selectedClient ? 'active' : ''}`}
                onClick={() => goToClient(index)}
                aria-label={`Go to client ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="clients-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Join our roster of successful creators and elevate your content</p>
          <a href="#contact" className="btn">Work With Us</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Clients; 