# NKY EDITOR - Professional Video Editor Portfolio

A modern, responsive portfolio website for Nagendar Kumar Yadav (NKY), a professional video editor.

## Features

- **Sleek Modern Design**: Professional layout with smooth animations and transitions.
- **Responsive**: Fully responsive design that works on all devices.
- **Animated UI**: Powered by Framer Motion for smooth animations and transitions.
- **Sections**:
  - Hero section with fullscreen background
  - About section with skills showcase
  - Services section highlighting offered services
  - Portfolio section with video showcase
  - Contact section with form and social links
- **Tech Stack**:
  - React.js
  - Framer Motion for animations
  - React Icons for icon library
  - CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/videograph-portfolio.git
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Build for production
```
npm run build
```

## Customization

### Changing Colors and Fonts

Edit the CSS variables in `src/App.css` to customize the color scheme and fonts:

```css
:root {
  --primary-color: #ff6b08;
  --secondary-color: #252525;
  --text-color: #f5f5f5;
  --dark-bg: #151515;
  --light-bg: #252525;
  --font-primary: 'Montserrat', sans-serif;
  --font-secondary: 'Playfair Display', serif;
}
```

### Adding Portfolio Items

Edit the `portfolioProjects` array in `src/components/Portfolio/Portfolio.jsx` to add your own projects.

### Contact Form

The contact form is set up to simulate form submission. To connect it to a real backend or form service:

1. Sign up for a form submission service like Formspree or GetForm
2. Update the `handleSubmit` function in `src/components/Contact/Contact.jsx`

### Changing the Hero Video Background

To replace the hero background video with your own:

1. Add your video file to the `public/videos` directory 
   - Recommended format: MP4
   - Optimized file size: Keep under 10MB for better performance
   - Resolution: 1080p or 720p recommended

2. Update the video source in `src/components/Hero/Hero.jsx`:
```jsx
<source src="/videos/your-video-filename.mp4" type="video/mp4" />
```

3. The video is set to autoplay, loop, and be muted by default. You can adjust these settings in the video element properties if needed.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various video portfolio templates
- Icons from React Icons
- Fonts from Google Fonts
