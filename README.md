# Employee Management App

Simple full-stack Employee Management application.

## Tech Stack

- Frontend: React
- Backend: Spring Boot (Java)
- Database: MySQL + MongoDB
- Containerization: Docker Compose

## Features

- Employee CRUD
- Department CRUD
- Dashboard with basic charts
- Authentication pages (login/register/profile)
- Swagger API docs

## Project Structure

```text
backend/    Spring Boot API
frontend/   React UI
docker-compose.yml
```

## Run with Docker (Recommended)

```bash
docker compose up --build
```

App URLs:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

## Run Locally (Without Docker)

Backend:

```bash
cd backend
mvn spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm start
```

Make sure MySQL and MongoDB are running and env values are configured for the backend.
