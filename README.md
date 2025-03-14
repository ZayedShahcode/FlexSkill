# FlexSkill Frontend

A modern web application for connecting skilled developers and forming teams for projects.

## Tech Stack

- **React** - Frontend library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing
- **Vite** - Build tool and development server

## Features

- 🔐 User Authentication (Login/Signup)
- 👤 User Profiles with GitHub Integration
- 🤝 Team Management
  - Create Teams
  - Join Teams
  - View Team Details
  - Team Member Management
- 🔍 Team Discovery
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add:
```env
VITE_URL_BACKEND=http://localhost:4000
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   └── dashboard/    # Dashboard-specific components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── assets/           # Static assets
│   ├── App.tsx           # Root component
│   └── main.tsx         # Entry point
├── public/              # Public assets
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

- `VITE_URL_BACKEND` - Backend API URL

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
