# Docker Setup for Slack Backend

This guide explains how to run the Slack backend application with MongoDB using Docker.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

## Quick Start

### Production Mode

1. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

3. **Stop services:**
   ```bash
   docker-compose down
   ```

### Development Mode (with hot-reload)

1. **Build and start in development mode:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **View logs:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f backend
   ```

3. **Stop services:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Services

### Backend (Node.js/Express)
- **Port:** 3000
- **Container name:** `slack-backend` (production) or `slack-backend-dev` (development)
- **Health check:** Available at `http://localhost:3000`

### MongoDB
- **Port:** 27017
- **Container name:** `slack-mongodb` (production) or `slack-mongodb-dev` (development)
- **Database name:** `slackDB`
- **Data persistence:** Stored in Docker volume `mongodb_data`

## Useful Commands

### View running containers
```bash
docker-compose ps
```

### Rebuild containers after code changes (production)
```bash
docker-compose up -d --build
```

### Access backend container shell
```bash
docker exec -it slack-backend sh
```

### Access MongoDB shell
```bash
docker exec -it slack-mongodb mongosh slackDB
```

### View MongoDB logs
```bash
docker-compose logs -f mongodb
```

### Remove all containers and volumes (clean slate)
```bash
docker-compose down -v
```

### Check container resource usage
```bash
docker stats
```

## Environment Variables

The backend uses these environment variables (defined in `docker-compose.yml`):

- `NODE_ENV`: Set to `production` or `development`
- `PORT`: Application port (default: 3000)
- `MONGO_URI`: MongoDB connection string

For local development without Docker, copy `.env.example` to `.env` and adjust as needed.

## Troubleshooting

### Backend can't connect to MongoDB
- Ensure MongoDB container is healthy: `docker-compose ps`
- Check MongoDB logs: `docker-compose logs mongodb`
- Verify network connectivity: `docker network inspect slack_slack-network`

### Port already in use
- Stop local MongoDB: `sudo systemctl stop mongodb` (Linux) or stop via system preferences (macOS)
- Change port mapping in `docker-compose.yml` (e.g., `"3001:3000"` for backend)

### Changes not reflecting (development mode)
- Ensure you're using `docker-compose.dev.yml`
- Check if volume mounts are correct: `docker inspect slack-backend-dev`
- Restart the container: `docker-compose -f docker-compose.dev.yml restart backend`

### Clear all Docker resources
```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all volumes
docker volume prune -f

# Remove all images
docker image prune -a -f
```

## Network Architecture

```
┌─────────────────────────────────────┐
│  Host Machine                       │
│  ┌───────────────────────────────┐  │
│  │  Docker Network (slack-net)   │  │
│  │                               │  │
│  │  ┌──────────┐  ┌───────────┐ │  │
│  │  │ Backend  │──│  MongoDB  │ │  │
│  │  │  :3000   │  │   :27017  │ │  │
│  │  └────┬─────┘  └───────────┘ │  │
│  └───────┼────────────────────────┘  │
│          │                           │
│     localhost:3000                   │
└─────────────────────────────────────┘
```

## Production Deployment

For production deployment:

1. Set strong MongoDB credentials
2. Use environment-specific `.env` files
3. Enable MongoDB authentication
4. Configure proper networking and firewall rules
5. Set up volume backups for MongoDB data
6. Use orchestration tools like Kubernetes for scaling

## Next Steps

- Add MongoDB authentication for production
- Set up MongoDB replica set for high availability
- Configure nginx as reverse proxy
- Add health check endpoints to the backend
- Set up automated backups for MongoDB
