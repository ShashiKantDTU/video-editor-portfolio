import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from '@react-icons/all-files/fa/FaPlay';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import './Portfolio.css';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Portfolio projects data
  const portfolioProjects = [
    {
      id: 1,
      title: 'Corporate Brand Video',
      category: 'commercial',
      thumbnail: 'commercial-placeholder',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'Tech Solutions Inc.',
      description: 'Professional editing for a corporate brand story showcasing company values.'
    },
    {
      id: 2,
      title: 'Wedding Highlight Reel',
      category: 'personal',
      thumbnail: 'wedding-placeholder',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'Sarah & Mike',
      description: 'Cinematic edit of wedding footage with color grading and audio enhancement.'
    },
    {
      id: 3,
      title: 'Music Video Edit',
      category: 'creative',
      thumbnail: 'event-placeholder',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'Indie Artist',
      description: 'Creative editing with visual effects and rhythm-based cuts for a music video.'
    },
    {
      id: 4,
      title: 'Product Launch Video',
      category: 'commercial',
      thumbnail: 'commercial-placeholder-2',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'NextGen Devices',
      description: 'Fast-paced promotional video edit with motion graphics for a product launch.'
    },
    {
      id: 5,
      title: 'Travel Montage',
      category: 'personal',
      thumbnail: 'documentary-placeholder',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'Travel Influencer',
      description: 'Engaging travel montage with seamless transitions and color grading.'
    },
    {
      id: 6,
      title: 'Tutorial Series',
      category: 'educational',
      thumbnail: 'event-placeholder-2',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      client: 'Online Learning Platform',
      description: 'Educational content editing with clear structure and engaging graphics.'
    }
  ];
  
  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'personal', name: 'Personal' },
    { id: 'creative', name: 'Creative' },
    { id: 'educational', name: 'Educational' }
  ];
  
  // Filter projects when category changes
  useEffect(() => {
    setFilteredProjects(
      selectedCategory === 'all'
        ? portfolioProjects
        : portfolioProjects.filter(project => project.category === selectedCategory)
    );
  }, [selectedCategory]);
  
  // Open video modal
  const openVideoModal = (project) => {
    setSelectedVideo(project);
    document.body.style.overflow = 'hidden';
  };
  
  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Portfolio</h2>
          <p className="section-subtitle">Showcasing my best video editing projects</p>
        </motion.div>
        
        <motion.div 
          className="portfolio-filter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="portfolio-grid"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="portfolio-item"
                onClick={() => openVideoModal(project)}
              >
                <div className={`portfolio-thumbnail ${project.thumbnail}`}>
                  <div className="portfolio-overlay">
                    <span className="play-icon">
                      <FaPlay />
                    </span>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>{project.title}</h3>
                  <p className="category-tag">{categories.find(cat => cat.id === project.category).name}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-overlay" onClick={closeVideoModal}></div>
            <motion.div
              className="modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button className="close-modal" onClick={closeVideoModal}>
                <FaTimes />
              </button>
              <div className="video-container">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h3>{selectedVideo.title}</h3>
                <p className="client"><strong>Client:</strong> {selectedVideo.client}</p>
                <p>{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio; 