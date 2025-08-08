# Weather App - UI

A React-based UI for managing cities in the weather application, built with Material-UI components and Vite.

## Features

- 🔍 Search cities by name
- ➕ Add new cities with detailed information
- ✏️ Edit existing city details
- 🗑️ Delete cities with confirmation
- ⭐ Tourist rating system (1-5 stars)
- 📊 Population and establishment date tracking

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your API server URL:
```env
VITE_API_BASE_URL=http://localhost:3000
```

## Installation

To install dependencies:

```bash
bun install
```

## Development

To start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:4000`.

## Building for Production

To build the application:

```bash
bun run build
```

To preview the production build:

```bash
bun run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── CityForm.tsx    # Add/Edit city form
│   ├── CityList.tsx    # Cities display grid
│   └── SearchBar.tsx   # Search functionality
├── services/           # API service layer
├── types/             # TypeScript type definitions
├── config/            # Environment configuration
└── App.tsx            # Main application component
```

## API Integration

The UI communicates with the Express.js server running on the configured `VITE_API_BASE_URL`. Make sure the server is running before starting the UI development server.

This project was created using `bun init` in bun v1.1.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
