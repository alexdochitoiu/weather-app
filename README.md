# Weather App - Cities Management System

A full-stack web application for managing cities with enhanced search functionality that integrates external APIs to provide weather data, country information, and more.

## 🌟 Features

- **CRUD Operations**: Create, read, update, and delete cities
- **Enhanced Search**: Search cities with real-time weather data and country information
- **External API Integration**: 
  - REST Countries API for country codes, flags, and currency information
  - OpenWeatherMap API for current weather data
- **Modern UI**: Built with React and Material-UI for a responsive design
- **Real-time Data**: Live weather updates and country details
- **Docker Support**: Full containerization for easy deployment

## 🛠 Technologies Used

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

### DevOps & Tools
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Web Server**: [Nginx](https://nginx.org/) - Production web server
- **Testing**: [Bun Test](https://bun.sh/docs/cli/test) - Built-in testing framework

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [OpenWeatherMap API Key](https://openweathermap.org/api) (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/alexdochitoiu/weather-app.git
cd weather-app
```

### 2. Environment Setup

Copy the environment template and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Run with Docker Compose

#### Production Mode

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

Access the application:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000

#### Development Mode (with hot reloading)

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

Access the application:
- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:3000

## 📋 API Endpoints

### Cities Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cities` | Get all cities |
| `GET` | `/api/cities/search?name=<city_name>` | Enhanced search with external data |
| `POST` | `/api/cities` | Create a new city |
| `PUT` | `/api/cities/:id` | Update a city |
| `DELETE` | `/api/cities/:id` | Delete a city |

### Enhanced Search Response

The search endpoint returns enriched city data:

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

## 🔧 Development

### Local Development (without Docker)

#### Prerequisites
- [Bun](https://bun.sh/) installed locally

#### Backend Setup

```bash
cd server
bun install
cp .env.example .env
# Add your OpenWeatherMap API key to .env
bun run start
```

#### Frontend Setup

```bash
cd ui
bun install
bun run dev
```

### Running Tests

```bash
# Backend tests
cd server
bun test

# Frontend tests (if implemented)
cd ui
bun test
```

## 🐳 Docker Commands

### Production Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build server
docker-compose build ui
```

### Development Commands

```bash
# Development mode with hot reloading
docker-compose -f docker-compose.dev.yml up --build

# Stop development services
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Utility Commands

```bash
# Execute commands in running containers
docker-compose exec server bun run test
docker-compose exec ui bun run build

# Access container shell
docker-compose exec server sh
docker-compose exec ui sh

# Clean up (remove containers, networks, volumes)
docker-compose down -v --remove-orphans
docker system prune -a
```

## 📁 Project Structure

```
weather-app/
├── server/                     # Backend application
│   ├── src/
│   │   ├── db/                # Database connection and initialization
│   │   ├── routes/            # API route handlers
│   │   ├── services/          # Business logic and external API calls
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   └── index.ts           # Server entry point
│   ├── weather.db             # SQLite database file
│   ├── package.json
│   ├── Dockerfile             # Production Docker image
│   ├── Dockerfile.dev         # Development Docker image
│   └── .env                   # Environment variables
├── ui/                        # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # React context for state management
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   ├── types/             # TypeScript type definitions
│   │   └── main.tsx           # React entry point
│   ├── nginx.conf             # Nginx configuration for production
│   ├── package.json
│   ├── Dockerfile             # Production Docker image
│   ├── Dockerfile.dev         # Development Docker image
│   └── .env                   # Environment variables
├── docker-compose.yml         # Production Docker Compose
├── docker-compose.dev.yml     # Development Docker Compose
├── .env                       # Environment variables template
└── README.md                  # Project documentation
```

## 🌍 Environment Variables

### Root Environment (.env)
- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

### Server Environment (server/.env)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `OPENWEATHER_API_KEY`: OpenWeatherMap API key

### UI Environment (ui/.env)
- `VITE_API_BASE_URL`: Backend API base URL

## 🔒 Security Considerations

- API keys are loaded from environment variables
- CORS is configured for allowed origins
- Input validation on all API endpoints
- Error handling prevents information leakage

## 🚀 Deployment

### Production Deployment

1. **Set up environment variables** in your production environment
2. **Build and deploy** using Docker Compose:

```bash
# Production deployment
docker-compose up -d --build

# Check service health
docker-compose ps
docker-compose logs
```

3. **Configure reverse proxy** (optional) for custom domains
4. **Set up SSL certificates** for HTTPS (recommended)

### Health Checks

Both services include health checks:
- **Server**: `GET /api/cities` endpoint check
- **UI**: HTTP request to port 80

