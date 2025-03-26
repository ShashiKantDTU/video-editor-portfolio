import { createContext, useContext, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// Create context
export const AnimationContext = createContext({
  shouldReduceMotion: false,
  transitions: {
    default: { duration: 0.6 },
    fast: { duration: 0.3 },
    slow: { duration: 0.9 }
  }
});

// Custom hook to use animation context
export const useAnimation = () => useContext(AnimationContext);

// Provider component
export const AnimationProvider = ({ children }) => {
  // Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  // Check if device is mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Calculate if we should reduce motion based on device or user preference
  const [shouldReduceMotion, setShouldReduceMotion] = useState(
    prefersReducedMotion || isMobile
  );
  
  // Animation settings based on device/preferences
  const [transitions, setTransitions] = useState({
    default: { duration: 0.6, ease: 'easeOut' },
    fast: { duration: 0.3, ease: 'easeOut' },
    slow: { duration: 0.9, ease: 'easeInOut' }
  });
  
  // Effect to check device and update settings
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Update motion reduction setting
      setShouldReduceMotion(prefersReducedMotion || mobile);
      
      // Update transition durations based on device
      if (mobile) {
        setTransitions({
          default: { duration: 0.3, ease: 'easeOut' },
          fast: { duration: 0.2, ease: 'easeOut' },
          slow: { duration: 0.5, ease: 'easeOut' }
        });
        
        // Add a class to the document root to handle mobile animations via CSS
        document.documentElement.classList.add('mobile-device');
        
        // Apply space reservation technique for animation containers
        reserveSpaceForAnimations();
      } else {
        setTransitions({
          default: { duration: 0.6, ease: 'easeOut' },
          fast: { duration: 0.3, ease: 'easeOut' },
          slow: { duration: 0.9, ease: 'easeInOut' }
        });
        
        // Remove mobile class if screen is resized to desktop
        document.documentElement.classList.remove('mobile-device');
      }
    };
    
    // Function to reserve space for animated elements to prevent layout shift
    const reserveSpaceForAnimations = () => {
      // Apply CSS to ensure elements have appropriate space before animation
      const style = document.createElement('style');
      style.id = 'animation-space-reservation';
      style.innerHTML = `
        /* Mobile animation reservation technique */
        .about-content, .services-grid, .skill-item, .service-card {
          min-height: 100px !important;
          height: auto !important;
          visibility: visible !important;
          transform: none !important;
          position: relative !important;
          opacity: 1 !important;
          display: block !important;
        }
        
        /* For Framer Motion variants */
        [data-framer-motion="hidden"] {
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
        }
        
        /* Ensure portfolio items display properly */
        .portfolio-item {
          opacity: 1 !important;
          transform: none !important;
          transition: box-shadow 0.3s ease !important;
        }
        
        /* Simplify hover effects for mobile */
        .portfolio-overlay {
          opacity: 1 !important;
        }
        
        .play-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `;
      
      // Clean up any existing style to avoid duplicates
      const existingStyle = document.getElementById('animation-space-reservation');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      document.head.appendChild(style);
    };
    
    // Check on mount
    checkDevice();
    
    // Listen for resize events
    window.addEventListener('resize', checkDevice);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      document.documentElement.classList.remove('mobile-device');
      const reservationStyle = document.getElementById('animation-space-reservation');
      if (reservationStyle) {
        reservationStyle.remove();
      }
    };
  }, [prefersReducedMotion]);
  
  // Custom variants that don't affect layout on mobile
  const mobileAwareVariants = {
    // For container elements
    container: {
      hidden: { opacity: isMobile ? 1 : 0 },
      visible: { 
        opacity: 1, 
        transition: { 
          staggerChildren: isMobile ? 0.1 : 0.2,
          delayChildren: isMobile ? 0.1 : 0.3
        } 
      }
    },
    // For individual items
    item: {
      hidden: { 
        opacity: isMobile ? 1 : 0, 
        y: isMobile ? 0 : 20 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: isMobile ? 50 : 100,
          duration: isMobile ? 0.2 : 0.4
        }
      }
    }
  };
  
  // Context value
  const value = {
    shouldReduceMotion,
    transitions,
    isMobile,
    mobileAwareVariants
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider; 