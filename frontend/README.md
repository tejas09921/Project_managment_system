# Project Management System Frontend

A modern React frontend for the Spring Boot Project Management System.

## Features

- **Project Dashboard**: View all projects with comprehensive details
- **Advanced Filtering**: Filter by project leader, database, or team size
- **Real-time Search**: Search across project names, leaders, databases, and OS
- **Statistics Overview**: Key metrics and insights at a glance
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## API Endpoints Used

The frontend connects to the following Spring Boot endpoints:

- `GET /projects` - Get all projects
- `GET /projects/leader/{leader}` - Get projects by project leader
- `GET /projects/teamcount` - Get projects with team count > 25
- `GET /projects/database/{db}` - Get projects by database

## Getting Started

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration

The frontend is configured to connect to the Spring Boot backend at `http://localhost:8080`. 

If your backend runs on a different port, update the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProjectCard.jsx  # Individual project display
│   ├── FilterBar.jsx    # Search and filter controls
│   ├── StatsCard.jsx    # Statistics display
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── services/
│   └── api.js          # API service layer
├── App.jsx             # Main application component
└── index.css           # Global styles with Tailwind
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

## Features in Detail

### Dashboard Overview
- Real-time statistics showing total projects, unique leaders, databases used, and large teams
- Clean grid layout for easy project browsing

### Advanced Filtering
- Filter by project leader name
- Filter by database technology
- Show only large teams (>25 members)
- Combine filters with search functionality

### Search Functionality
- Search across project names, leaders, databases, and operating systems
- Real-time filtering as you type
- Case-insensitive search

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Backend Requirements

Make sure your Spring Boot backend is running on `http://localhost:8080` with the following endpoints available:

- Project entity with fields: `projectid`, `projectnm`, `projectPL`, `projectDatabase`, `projectOS`, `projectTeamcnt`
- CORS enabled for frontend requests
- All API endpoints returning JSON responses