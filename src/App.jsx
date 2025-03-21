import { useState, useEffect, useRef, lazy, Suspense } from 'react'
// Import only specific features from framer-motion instead of the entire library
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion'
import './App.css'
import './MobileOptimizations.css'
import Hero from './components/Hero/Hero'
// Lazy load components that aren't needed immediately
const About = lazy(() => import('./components/About/About'))
const Services = lazy(() => import('./components/Services/Services'))
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'))
const Contact = lazy(() => import('./components/Contact/Contact'))
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroVideoLoadedRef = useRef(false);
  // Check if the device is mobile (based on screen width)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  // Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Handle hero video loaded callback
  const handleHeroVideoLoaded = () => {
    heroVideoLoadedRef.current = true;
    // Only hide loading when critical resources are loaded
    setLoading(false);
  };

  // Apply mobile animation optimizations
  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      // Add a class to the document for CSS optimizations
      document.documentElement.classList.add('reduced-motion');
      
      // Set CSS variables for animation durations
      document.documentElement.style.setProperty('--transition-speed', '0.2s');
      
      // Disable some animations entirely on mobile
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 768px) {
          .particle { display: none !important; }
          .scroll-down { display: none !important; }
          [data-framer-motion] { transition: transform 0.2s ease !important; }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.documentElement.classList.remove('reduced-motion');
        document.documentElement.style.removeProperty('--transition-speed');
        document.head.removeChild(style);
      };
    }
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    // Load essential CSS/JS and show loading screen for minimum 800ms
    // This shorter time prevents seeing loading screen too long on fast connections
    const minLoadingTime = setTimeout(() => {
      // If video hasn't loaded in 3 seconds, show content anyway
      const maxLoadingTime = setTimeout(() => {
        setLoading(false);
      }, isMobile ? 1200 : 2200); // Shorter timeout for mobile
      
      // If hero video loads before timeout, this will be cleaned up
      return () => clearTimeout(maxLoadingTime);
    }, isMobile ? 600 : 800); // Shorter minimum time on mobile
    
    return () => clearTimeout(minLoadingTime);
  }, [isMobile]);

  // Optimized cursor effect with reduced lag
  useEffect(() => {
    if (window.innerWidth <= 768) return; // Skip for mobile devices
    
    let mouseX = -100; // Start offscreen
    let mouseY = -100;
    let frameId = null;
    let isLinkHovered = false;
    
    // Use direct DOM manipulation only - no state updates during movement
    const animate = () => {
      if (!cursorRef.current || !cursorDotRef.current) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      
      // For cursor dot (faster follow)
      const dotX = mouseX - 4; // Half of the dot width (8px)
      const dotY = mouseY - 4;
      cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      
      // For cursor outline (slower, smoother follow with no damping for better performance)
      const outlineX = mouseX - 16; // Half of the outline width (32px)
      const outlineY = mouseY - 16;
      cursorRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      
      frameId = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    frameId = requestAnimationFrame(animate);
    
    // Highly optimized mouse move handler - only updates coordinates
    const updateMousePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Process hover states with minimal DOM operations
    const handleLinkHover = () => {
      if (!cursorRef.current) return;
      isLinkHovered = true;
      cursorRef.current.classList.add("cursor-hover");
    };
    
    const handleLinkLeave = () => {
      if (!cursorRef.current) return;
      isLinkHovered = false;
      cursorRef.current.classList.remove("cursor-hover");
    };
    
    // Reduce element selection load by using document delegation where possible
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('btn') ||
        target.classList.contains('skill-item') ||
        target.classList.contains('experience-badge') ||
        target.classList.contains('service-card')
      ) {
        handleLinkHover();
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('btn') ||
        target.classList.contains('skill-item') ||
        target.classList.contains('experience-badge') ||
        target.classList.contains('service-card')
      ) {
        handleLinkLeave();
      }
    });
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('mouseout', handleLinkLeave);
    };
  }, [loading]);
  
  return (
    <div className="app-container">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            className="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
          >
            {/* Film countdown */}
            <div className="countdown">
              <div className="countdown-number">5</div>
              <div className="countdown-number">4</div>
              <div className="countdown-number">3</div>
              <div className="countdown-number">2</div>
            </div>
            
            {/* Cinematic frame lines */}
            <div className="loader-frame">
              <div className="frame-line frame-line-top"></div>
              <div className="frame-line frame-line-right"></div>
              <div className="frame-line frame-line-bottom"></div>
              <div className="frame-line frame-line-left"></div>
              
              {/* Corner markers */}
              <div className="corner-marker top-left"></div>
              <div className="corner-marker top-right"></div>
              <div className="corner-marker bottom-left"></div>
              <div className="corner-marker bottom-right"></div>
            </div>
            
            {/* Aperture animation */}
            <div className="aperture">
              <div className="aperture-ring"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-blade"></div>
              <div className="aperture-inner"></div>
            </div>
            
            {/* Logo with letter animation */}
            <div className="loader-logo">
              <motion.h1>
                <span>N</span>
                <span>K</span>
                <span>Y</span>
              </motion.h1>
            </div>
            
            <div className="loader-progress">
              <span>
                {isMobile 
                  ? "Preparing cinematic experience..." 
                  : "Initializing professional toolkit..."}
              </span>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Scroll progress indicator */}
            <motion.div 
              className="progress-bar"
              style={{ scaleX: scrollYProgress }}
            />
            
            {/* Custom cursors */}
            <div 
              ref={cursorRef}
              className={`cursor-outer ${cursorVariant === "link" ? "cursor-hover" : ""}`}
            />
            <div 
              ref={cursorDotRef}
              className="cursor-dot"
            />
            
            <Navbar />
            <main>
              <Hero onHeroVideoLoaded={handleHeroVideoLoaded} />
              <Suspense fallback={<div className="section-loading">Loading...</div>}>
                <About />
                <Services />
                <Portfolio />
                <Contact />
              </Suspense>
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
