import { useState, useEffect, useRef, lazy, Suspense } from 'react'
// Import only specific features from framer-motion instead of the entire library
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import './App.css'
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

  // Handle hero video loaded callback
  const handleHeroVideoLoaded = () => {
    heroVideoLoadedRef.current = true;
    // Only hide loading when critical resources are loaded
    setLoading(false);
  };

  useEffect(() => {
    // Load essential CSS/JS and show loading screen for minimum 800ms
    // This shorter time prevents seeing loading screen too long on fast connections
    const minLoadingTime = setTimeout(() => {
      // If video hasn't loaded in 3 seconds, show content anyway
      const maxLoadingTime = setTimeout(() => {
        setLoading(false);
      }, 2200); // 3 seconds total (800ms + 2200ms)
      
      // If hero video loads before timeout, this will be cleaned up
      return () => clearTimeout(maxLoadingTime);
    }, 800);
    
    return () => clearTimeout(minLoadingTime);
  }, []);

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
            transition={{ duration: 0.5 }}
          >
            <h1>NKY EDITOR</h1>
            <div className="loader-progress">
              <span>Loading resources...</span>
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
