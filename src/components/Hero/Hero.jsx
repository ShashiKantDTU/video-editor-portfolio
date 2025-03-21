import { motion } from 'framer-motion';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { useEffect, useRef, useState } from 'react';
import { useAnimation } from '../../AnimationContext';
import './Hero.css';

// Particle component for background effect
const Particle = ({ index }) => {
  const { shouldReduceMotion, isMobile } = useAnimation();
  
  // Skip particles on mobile or if reduced motion is preferred
  if (shouldReduceMotion || isMobile) {
    return null;
  }
  
  const randomSize = Math.random() * 4 + 1;
  const randomDuration = Math.random() * 10 + 15;
  const randomDelay = Math.random() * 5;
  const randomX = Math.random() * 100;
  const randomOpacity = Math.random() * 0.5 + 0.1;
  
  return (
    <motion.div
      className="particle"
      initial={{ 
        x: `${randomX}vw`, 
        y: '110vh', 
        opacity: randomOpacity,
        scale: 0
      }}
      animate={{
        y: '-10vh',
        scale: 1,
        opacity: [randomOpacity, randomOpacity * 1.5, 0]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear"
      }}
      style={{
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        background: 'var(--primary-color)',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: '0 0 10px var(--primary-glow)'
      }}
    />
  );
};

const Hero = ({ onHeroVideoLoaded }) => {
  // Animation context for optimized animations
  const { transitions, shouldReduceMotion, isMobile } = useAnimation();

  // Video state management
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState([false, false, false]);
  const [allVideosReady, setAllVideosReady] = useState(false);
  const [secondaryVideosLoading, setSecondaryVideosLoading] = useState(false);
  const videoRefs = useRef([]);
  const particles = Array.from({ length: 15 }, (_, i) => i);
  
  // Define video sources
  const videoSources = [
    "/videos/showreel.mp4",
    "/videos/showreel2.mp4",
    "/videos/showreel3.mp4"
  ];
  
  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoSources.length);
  }, [videoSources.length]);

  // Handle primary video loading and playback
  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(error => {
        // Most browsers require user interaction to play videos with sound
        if (videoRefs.current[0]) {
          videoRefs.current[0].muted = true;
          videoRefs.current[0].play();
        }
      });
    }
  }, []);
  
  // Load secondary videos only after site is fully loaded
  useEffect(() => {
    if (videosLoaded[0] && !secondaryVideosLoading) {
      // Notify parent component that first video is loaded
      if (onHeroVideoLoaded) {
        onHeroVideoLoaded();
      }
      
      // Wait a bit after the first video is loaded before loading others
      const timer = setTimeout(() => {
        setSecondaryVideosLoading(true);
      }, 5000); // Delay secondary video loading by 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [videosLoaded, secondaryVideosLoading, onHeroVideoLoaded]);

  // Auto rotate through videos
  useEffect(() => {
    if (!allVideosReady) return;
    
    const interval = setInterval(() => {
      setActiveVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    }, 12000); // Change every 12 seconds
    
    return () => clearInterval(interval);
  }, [allVideosReady, videoSources.length]);
  
  // Play active video and pause others
  useEffect(() => {
    if (!allVideosReady) return;
    
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === activeVideoIndex) {
          // If this is the active video
          const playPromise = videoRef.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => console.log("Video play error:", e));
          }
        } else {
          // If this is not the active video
          videoRef.pause();
          // Reset to beginning to be ready for next rotation
          videoRef.currentTime = 0;
        }
      }
    });
  }, [activeVideoIndex, allVideosReady]);
  
  // Track when all videos are loaded
  useEffect(() => {
    if (videosLoaded.every(loaded => loaded)) {
      setAllVideosReady(true);
    }
  }, [videosLoaded]);

  // Handle when a video is loaded
  const handleVideoLoaded = (index) => {
    const newLoadedStatus = [...videosLoaded];
    newLoadedStatus[index] = true;
    setVideosLoaded(newLoadedStatus);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-video-container">
        {/* Render all videos, but only the active one is visible */}
        {videoSources.map((src, index) => {
          // Only load the primary video immediately
          // Load secondary videos after site is available
          const shouldLoad = index === 0 || secondaryVideosLoading;
          // Set preload attribute to optimize data loading
          const preloadValue = index === 0 ? "auto" : (secondaryVideosLoading ? "auto" : "none");
          
          return (
            <div 
              key={src}
              className={`video-wrapper ${activeVideoIndex === index ? 'active' : ''}`}
            >
              {/* Always create video elements but control their loading behavior */}
              <video
                ref={el => videoRefs.current[index] = el}
                className="background-video"
                autoPlay={index === 0} // Only autoplay the first one
                loop
                muted
                playsInline
                preload={preloadValue}
                onLoadedData={() => handleVideoLoaded(index)}
                loading={index === 0 ? "eager" : "lazy"}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        })}
        
        <div className={`overlay ${videosLoaded[activeVideoIndex] ? 'video-loaded' : ''}`}></div>
        
        {/* Video indicator dots - only show if not in reduced motion mode */}
        {!shouldReduceMotion && (
          <div className="video-indicators">
            {videoSources.map((_, index) => (
              <motion.div
                key={index}
                className={`indicator ${activeVideoIndex === index ? 'active' : ''}`}
                onClick={() => allVideosReady && setActiveVideoIndex(index)}
                whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={activeVideoIndex === index && !isMobile ? {
                  scale: [1, 1.2, 1],
                  transition: { repeat: Infinity, repeatDelay: 3 }
                } : {}}
              />
            ))}
          </div>
        )}
        
        {/* Particles container - only show on desktop */}
        {!isMobile && (
          <div className="particles-container">
            {particles.map(index => (
              <Particle key={index} index={index} />
            ))}
          </div>
        )}
      </div>
      
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.default, delay: 0.2 }}
          className="hero-title"
        >
          <span className="hero-title-highlight">NKY</span> EDITOR
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.default, delay: 0.4 }}
        >
          Crafting Cinematic Stories with Precision and Passion
        </motion.p>
        
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.default, delay: 0.6 }}
        >
          <motion.a 
            href="#portfolio" 
            className="btn"
            whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay className="play-icon" /> Watch My Work
          </motion.a>
          <motion.a 
            href="#contact" 
            className="btn btn-outline"
            whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
        
        {/* Only render scroll-down on desktop */}
        {!isMobile && (
          <motion.div
            className="scroll-down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div>
              <span className="scroll-text">Scroll Down</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero; 