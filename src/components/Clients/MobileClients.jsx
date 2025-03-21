import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './MobileClients.css';
import PropTypes from 'prop-types';

const MobileClients = ({ clientsData }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={sectionRef} className="mobile-clients">
      <div className="mobile-clients-bg"></div>
      
      <motion.div 
        className="mobile-clients-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="mobile-clients-title"
          variants={itemVariants}
        >
          Featured Client Work
        </motion.h2>
        
        <motion.div className="mobile-clients-grid">
          {clientsData.map((client) => (
            <motion.div 
              key={client.id} 
              className="mobile-client-card"
              variants={itemVariants}
            >
              <div className="mobile-client-card-inner">
                <img 
                  className="instagram-screenshot" 
                  src={client.image} 
                  alt={`Instagram post by ${client.name}`}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/500x300/7168f2/ffffff?text=Instagram+Screenshot';
                  }}
                />
                <div className="mobile-client-overlay">
                  <span className="mobile-client-handle">{client.handle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

MobileClients.propTypes = {
  clientsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      handle: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MobileClients; 