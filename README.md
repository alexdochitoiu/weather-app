# Weather App - Cities Management System

A full-stack web application for managing cities with enhanced search functionality that integrates external APIs to provide weather data, country information, and more.

## Demo

https://github.com/user-attachments/assets/7529b748-d97e-4187-9a89-98ca181c28ed

## 🌟 Features

- **CRUD Operations**: Create, read, update, and delete cities
- **Enhanced Search**: Search cities with real-time weather data and country information
- **External API Integration**: 
  - REST Countries API for country codes, flags, and currency information
  - OpenWeatherMap API for current weather data
- **Modern UI**: Built with React and Material-UI for a responsive design

## 🛠 Tech Stack

### Backend
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- **Framework**: [Express.js](https://expressjs.com/) - Web application framework
- **Database**: [SQLite](https://www.sqlite.org/) - Lightweight database
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **External APIs**:
  - [OpenWeatherMap API](https://openweathermap.org/api) - Weather data
  - [REST Countries API](https://restcountries.com/) - Country information

### Frontend
- **Framework**: [React](https://react.dev/) - UI library
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool
- **UI Library**: [Material-UI (MUI)](https://mui.com/) - Component library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **State Management**: React Context + useReducer pattern

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed locally
- [OpenWeatherMap API Key](https://openweathermap.org/api) (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/alexdochitoiu/weather-app.git
cd weather-app
```

### 2. Backend Setup

```bash
cd server
bun install
cp .env.example .env
# Add your OpenWeatherMap API key to server/.env
bun run start
```

The server will start on http://localhost:3000

### 3. Frontend Setup

```bash
cd ui
bun install
bun run dev
```

The UI will start on http://localhost:4000

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cities` | Get all cities |
| `GET` | `/api/cities/search?name=<city_name>` | Enhanced search with external data |
| `POST` | `/api/cities` | Create a new city |
| `PUT` | `/api/cities/:id` | Update a city |
| `DELETE` | `/api/cities/:id` | Delete a city |

### Enhanced Search Response Example

```json
{
  "id": 1,
  "name": "London",
  "state": "England",
  "country": "United Kingdom",
  "country_code_2": "GB",
  "country_code_3": "GBR",
  "currency_code": "GBP",
  "flag": "https://flagcdn.com/w320/gb.png",
  "tourist_rating": 5,
  "estimated_population": 9000000,
  "date_established": "43 AD",
  "weather": {
    "temperature": 15.2,
    "description": "partly cloudy",
    "humidity": 78,
    "wind_speed": 3.5
  }
}
```

## 🧪 Testing

Run server tests:

```bash
cd server
bun test
```

## 📁 Project Structure

```
weather-app/
├── server/                 # Backend application
│   ├── src/
│   │   ├── db/            # Database connection and initialization
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic and external API calls
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── weather.db         # SQLite database file
│   └── package.json
├── ui/                    # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context for state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   └── types/         # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 Useful Commands

### Backend Commands
```bash
cd server
bun install          # Install dependencies
bun run start        # Start development server
bun test            # Run tests
```

### Frontend Commands
```bash
cd ui
bun install          # Install dependencies
bun run dev          # Start development server
bun run build        # Build for production
```

