# Study Planner

A modern, feature-rich study planning application built with Next.js, React, and Tailwind CSS. This application helps students and professionals manage their tasks, track study sessions with a Pomodoro timer, and maintain productivity with background music.

## Features

### Task Management
- Create, edit, and delete tasks
- Set due dates for tasks
- Mark tasks as complete
- Filter tasks by completion status
- Sort tasks by due date
- View upcoming tasks on the dashboard

### Pomodoro Timer
- Customizable focus session durations (5, 15, 25 minutes)
- Automatic break scheduling (short breaks after focus sessions, long breaks after 4 sessions)
- Visual circular progress indicator
- Session statistics tracking
- Audio notifications when sessions end

### Background Music Player
- Play/pause functionality
- Switch between multiple lofi tracks
- Loop current track or play through playlist
- Compact interface in the navigation bar
- Visual indicator when music is playing

### User Interface
- Responsive design for desktop and mobile
- Dark/light theme toggle
- Mobile-friendly navigation with animated menu
- Smooth transitions and animations
- Back to top button for easy navigation

## Getting Started

### Prerequisites
- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/study-planner.git
cd study-planner
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
study-planner/
├── public/
│   ├── music/           # Background music tracks
│   └── notification.mp3 # Timer completion sound
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and helpers
│   └── styles/          # Global styles and Tailwind config
└── ...
```

## Key Components

- **TaskForm**: Form for creating and editing tasks
- **TaskList**: Displays and manages the list of tasks
- **Timer**: Pomodoro timer with customizable durations
- **MusicPlayer**: Background music player with playlist support
- **Navbar**: Navigation with mobile responsiveness
- **BackToTop**: Button to quickly return to the top of the page

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript for better developer experience
- **Lucide React**: Beautiful, consistent icons
- **next-themes**: Theme management for dark/light mode

## Acknowledgments

- Lofi music tracks for the background music player
- Icons from [Lucide](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
