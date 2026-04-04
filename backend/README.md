# PFA Backend (Spring Boot + PostgreSQL)

## Requirements

- JDK 25
- Maven 3.9+ (or Maven Wrapper if you add it)
- Docker Desktop

## Local Secrets Strategy

Use a local `.env` file in this folder (already ignored by git) to store sensitive values.

Create `backend/.env` with:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pfadatabase
DB_USER=postgres
DB_PASSWORD=Mouad123
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
```

## 1) Start PostgreSQL with Docker

From this folder:

```powershell
docker compose up -d
```

Database config:

- DB name: `pfadatabase`
- User: `postgres`
- Password: from `.env` (`DB_PASSWORD`)
- Port: `5432`

## 2) Run the backend

```powershell
mvn spring-boot:run
```

Or package then run:

```powershell
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## 3) Check health endpoint

```text
GET http://localhost:8080/api/health
```

Expected JSON response with `status: UP`.

## Environment variables

The backend reads these variables:

- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)
- `DB_NAME` (default: `pfadatabase`)
- `DB_USER` (default: `postgres`)
- `DB_PASSWORD` (required)
- `SERVER_PORT` (default: `8080`)
- `SPRING_PROFILES_ACTIVE` (recommended: `dev` locally)
