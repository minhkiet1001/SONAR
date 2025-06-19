# HIV Treatment System

This project is a web application for HIV treatment management, built with React.js, Vite, and Tailwind CSS.

## Features

- User management with different roles (Guest, Customer, Staff, Doctor, Manager, Admin)
- Appointment scheduling
- Test results viewing
- Medication management
- Educational resource management
- User profile management
- Staff and doctor management
- System configuration

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces
- **Vite**: Next Generation Frontend Tooling
- **Tailwind CSS**: A utility-first CSS framework
- **React Router**: For routing and navigation
- **Headless UI**: Completely unstyled, fully accessible UI components
- **Hero Icons**: Beautiful hand-crafted SVG icons

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hiv-treatment-system.git
cd hiv-treatment-system
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview the production build
```bash
npm run preview
```

## Project Structure

```
hiv-treatment-system/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Common UI components
│   │   ├── customer/     # Customer-specific components
│   │   ├── doctor/       # Doctor-specific components
│   │   ├── guest/        # Guest-facing components
│   │   ├── layout/       # Layout components
│   │   ├── manager/      # Manager-specific components
│   │   └── admin/        # Admin-specific components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # Type definitions
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── jsconfig.json         # JavaScript configuration
├── package.json          # npm dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
