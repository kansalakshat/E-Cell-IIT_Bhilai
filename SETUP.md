# 🚀 E-Cell IIT Bhilai - Premium Website Setup Guide

## Quick Start

### Option 1: Automatic Setup (Recommended)
```bash
npm install-all
npm start
```

### Option 2: Manual Setup
```bash
# Install root dependencies (includes concurrently)
npm install

# Install backend
cd backend
npm install
cd ..

# Install frontend
cd frontend
npm install --legacy-peer-deps
cd ..

# Start development servers
npm run dev
```

## What Gets Started

- **Frontend**: http://localhost:3000 (React + Vite)
- **Backend**: http://localhost:5000 (Express)

The frontend is configured to proxy API requests to the backend automatically.

## Project Structure

```
E-Cell Website/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── Hero3D.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── EventCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useInView.js
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                 # Express backend
│   ├── server.js           # Main server file
│   ├── .env               # Environment variables
│   └── package.json
│
├── package.json            # Root package.json for convenience
├── README.md              # Project documentation
├── SETUP.md              # This file
└── .gitignore            # Git ignore rules
```

## Available Commands

### Frontend Commands
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Commands
```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
```

### Root Commands
```bash
npm install-all      # Install all dependencies
npm run dev         # Start both frontend and backend
npm run dev:frontend # Start only frontend
npm run dev:backend  # Start only backend
npm run build       # Build frontend for production
npm start           # Alias for npm run dev
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **Vite 4.4** - Build tool and dev server
- **Tailwind CSS 3** - Styling
- **GSAP 3.12** - Advanced animations
- **Lenis 1.0.42** - Smooth scrolling
- **Three.js 0.154** - 3D graphics
- **React Three Fiber 6** - React renderer for Three.js
- **React Router 6** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 4** - Web framework
- **CORS** - Enable cross-origin requests
- **Dotenv** - Environment variable management

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

Change these as needed for your environment.

## Development Tips

1. **Smooth Scrolling**: Lenis is configured for buttery smooth scrolling
2. **3D Hero**: Uses Three.js with custom 3D objects (cube, sphere, torus)
3. **Animations**: GSAP handles all scroll and hover animations
4. **Responsive**: Mobile-first design with Tailwind CSS
5. **Hot Reload**: Vite provides instant hot module replacement

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

Output goes to `frontend/dist` folder. Deploy this to Vercel, Netlify, or any static host.

### Backend Deployment
Option 1: Heroku
```bash
git push heroku main
```

Option 2: Railway, AWS, or Docker
```bash
node backend/server.js
```

Set environment variables on your hosting platform.

## Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#0066ff',    // Primary blue
  accent: '#00d9ff',     // Cyan accent
  dark: '#0a0a0a',      // Dark background
}
```

### Update Event Data
Edit `backend/server.js` (line ~8) to change event data.

### Modify 3D Models
Edit `frontend/src/components/Hero3D.jsx` to customize 3D objects.

## Performance Optimization

- Images are lazy-loaded
- CSS is minified in production
- JavaScript is bundled and minified
- Vite uses native ES modules in development
- GSAP is tree-shaken for smaller bundle size

## Troubleshooting

### Port Already in Use
```bash
# Find what's using port 3000 or 5000
lsof -i :3000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Hot Module Reload Not Working
```bash
# Restart Vite dev server
npm run dev:frontend
```

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Security

- CORS is enabled for development
- Use environment variables for secrets
- Enable HTTPS in production
- Validate all form inputs on backend

## Future Enhancements

- [ ] Event registration system
- [ ] Admin dashboard
- [ ] Blog section
- [ ] Team member profiles
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] User authentication
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)

## Support

For issues or questions:
- Create an issue in the repository
- Email: contact@ecell.iitbhilai.ac.in

## License

MIT License - Feel free to use this project for E-Cell IIT Bhilai.

---

**Built with ❤️ for E-Cell IIT Bhilai**
**Last Updated: July 2026**
