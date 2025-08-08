# Weather App - Docker Management Makefile

.PHONY: help build up up-dev down logs clean test install

# Default target
help: ## Show this help message
	@echo "Weather App - Docker Management Commands"
	@echo "========================================"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Production commands
build: ## Build all services
	docker-compose build

up: ## Start all services in production mode
	docker-compose up -d --build

prod: up ## Alias for up (production mode)

# Development commands
up-dev: ## Start all services in development mode with hot reloading
	docker-compose -f docker-compose.dev.yml up -d --build

dev: up-dev ## Alias for up-dev (development mode)

# Service management
down: ## Stop all services
	docker-compose down
	docker-compose -f docker-compose.dev.yml down

restart: ## Restart all services
	$(MAKE) down
	$(MAKE) up

restart-dev: ## Restart all services in development mode
	$(MAKE) down
	$(MAKE) up-dev

# Logs and monitoring
logs: ## Show logs for all services
	docker-compose logs -f

logs-dev: ## Show logs for development services
	docker-compose -f docker-compose.dev.yml logs -f

logs-server: ## Show server logs only
	docker-compose logs -f server

logs-ui: ## Show UI logs only
	docker-compose logs -f ui

status: ## Show status of all services
	docker-compose ps
	docker-compose -f docker-compose.dev.yml ps

# Development utilities
shell-server: ## Access server container shell
	docker-compose exec server sh

shell-ui: ## Access UI container shell
	docker-compose exec ui sh

shell-server-dev: ## Access development server container shell
	docker-compose -f docker-compose.dev.yml exec server sh

shell-ui-dev: ## Access development UI container shell
	docker-compose -f docker-compose.dev.yml exec ui sh

# Testing
test: ## Run tests in server container
	docker-compose exec server bun test

test-dev: ## Run tests in development server container
	docker-compose -f docker-compose.dev.yml exec server bun test

# Build specific services
build-server: ## Build server service only
	docker-compose build server

build-ui: ## Build UI service only
	docker-compose build ui

# Database operations
db-backup: ## Backup the database
	docker-compose exec server cp weather.db weather.db.backup.$(shell date +%Y%m%d_%H%M%S)
	@echo "Database backed up"

# Cleanup commands
clean: ## Stop services and remove containers, networks, volumes
	docker-compose down -v --remove-orphans
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans

clean-all: clean ## Clean everything including unused images
	docker system prune -a

clean-volumes: ## Remove all volumes (WARNING: This will delete database data)
	docker-compose down -v
	docker volume prune -f

# Setup commands
setup: ## Initial setup - copy env files and build
	@if [ ! -f .env ]; then cp .env.example .env; echo "Created .env file. Please add your OpenWeatherMap API key!"; fi
	@if [ ! -f server/.env ]; then cp server/.env.example server/.env; fi
	$(MAKE) build

setup-dev: setup ## Setup for development
	$(MAKE) up-dev

# Health checks
health: ## Check health of all services
	@echo "Checking service health..."
	@curl -f http://localhost:3000/api/cities > /dev/null 2>&1 && echo "✅ Server is healthy" || echo "❌ Server is not responding"
	@curl -f http://localhost > /dev/null 2>&1 && echo "✅ UI is healthy" || echo "❌ UI is not responding"

health-dev: ## Check health of development services
	@echo "Checking development service health..."
	@curl -f http://localhost:3000/api/cities > /dev/null 2>&1 && echo "✅ Server is healthy" || echo "❌ Server is not responding"
	@curl -f http://localhost:4000 > /dev/null 2>&1 && echo "✅ UI is healthy" || echo "❌ UI is not responding"

# Local development (without Docker)
install-local: ## Install dependencies locally
	cd server && bun install
	cd ui && bun install

dev-local: ## Run development servers locally
	@echo "Starting local development servers..."
	@echo "Make sure you have the .env files configured!"
	cd server && bun run start &
	cd ui && bun run dev

# Information
info: ## Show useful information about the application
	@echo "Weather App Information"
	@echo "======================"
	@echo "Production URL: http://localhost"
	@echo "Development URL: http://localhost:4000"
	@echo "API URL: http://localhost:3000"
	@echo "API Documentation: http://localhost:3000/api/cities"
	@echo ""
	@echo "Docker Compose Files:"
	@echo "- docker-compose.yml (Production)"
	@echo "- docker-compose.dev.yml (Development)"
	@echo ""
	@echo "Environment Files:"
	@echo "- .env (Root environment)"
	@echo "- server/.env (Server environment)"
	@echo "- ui/.env (UI environment)"
