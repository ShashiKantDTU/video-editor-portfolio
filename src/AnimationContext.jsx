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
      } else {
        setTransitions({
          default: { duration: 0.6, ease: 'easeOut' },
          fast: { duration: 0.3, ease: 'easeOut' },
          slow: { duration: 0.9, ease: 'easeInOut' }
        });
      }
    };
    
    // Check on mount
    checkDevice();
    
    // Listen for resize events
    window.addEventListener('resize', checkDevice);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, [prefersReducedMotion]);
  
  // Context value
  const value = {
    shouldReduceMotion,
    transitions,
    isMobile
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider; 