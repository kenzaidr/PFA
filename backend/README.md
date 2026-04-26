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
APP_MAIL_FROM=
APP_FRONTEND_BASE_URL=http://localhost:5173
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
- `APP_MAIL_FROM` (optional: enables email delivery when SMTP is configured)
- `APP_FRONTEND_BASE_URL` (optional: used in email links)

## 4) How to test endpoints

Before testing, make sure:

1. PostgreSQL is running (`docker compose up -d`)
2. Backend is running on port `8080`
3. You can open `http://localhost:8080/api/health`

### A) Test with Postman

Create a Postman collection named `PFA Backend` and add these requests.

#### 1. Health check (GET)

- Method: `GET`
- URL: `http://localhost:8080/api/health`
- Expected: `200 OK` with JSON containing `status: "UP"`

#### 2. Auth ping (GET)

- Method: `GET`
- URL: `http://localhost:8080/api/v1/auth/ping`
- Expected: `200 OK`

#### 3. Register user (POST)

- Method: `POST`
- URL: `http://localhost:8080/api/v1/auth/register`
- Headers:
	- `Content-Type: application/json`
- Body (raw JSON):

```json
{
	"firstName": "Kenza",
	"lastName": "Idrissi",
	"email": "kenza@example.com",
	"password": "StrongPass123",
	"role": "CLIENT"
}
```

Expected behavior:

- Success: `201 Created`
- Returns a user summary JSON (`id`, `email`, `firstName`, `lastName`, `role`)
- Password is stored hashed (not plain text)

Validation notes:

- This endpoint supports student/client and recruiter registration.
- Send `role: "CLIENT"` (or `"STUDENT"`) for a student account, and `role: "RECRUITER"` for a recruiter account.
- Recruiter registration also requires `companyName`.
- Password must have at least 8 chars, with uppercase, lowercase, and digit
- Email must be valid and unique

If validation fails, expected:

- `400 Bad Request`
- Response includes `fieldErrors`

#### 4. Request password reset (POST)

- Method: `POST`
- URL: `http://localhost:8080/api/v1/auth/password-reset/request`
- Headers:
	- `Content-Type: application/json`
- Body (raw JSON):

```json
{
	"email": "kenza@example.com"
}
```

Expected behavior:

- `200 OK`
- Response contains a generic success message
- In development without SMTP, the response also returns a temporary `resetToken` and `expiresAt`
- When SMTP is configured, the reset link is sent by email and `resetToken` is omitted

#### 5. Request email verification (POST)

- Method: `POST`
- URL: `http://localhost:8080/api/v1/auth/email-verification/request`
- Headers:
	- `Content-Type: application/json`
- Body (raw JSON):

```json
{
	"email": "kenza@example.com"
}
```

Expected behavior:

- `200 OK`
- Response contains a generic success message
- In development without SMTP, the response also returns a temporary `verificationToken` and `expiresAt`
- When SMTP is configured, the verification link is sent by email and `verificationToken` is omitted

#### 6. Confirm email verification (POST)

- Method: `POST`
- URL: `http://localhost:8080/api/v1/auth/email-verification/confirm`
- Headers:
	- `Content-Type: application/json`
- Body (raw JSON):

```json
{
	"token": "verification-token-from-request"
}
```

Expected behavior:

- `200 OK`
- The user account is marked verified and activated
- The token becomes invalid after one use

#### 7. Confirm password reset (POST)

- Method: `POST`
- URL: `http://localhost:8080/api/v1/auth/password-reset/confirm`
- Headers:
	- `Content-Type: application/json`
- Body (raw JSON):

```json
{
	"token": "reset-token-from-request",
	"newPassword": "NewStrongPass123"
}
```

Expected behavior:

- `200 OK`
- Password is updated and stored hashed
- The reset token becomes invalid after one use

### B) Test with REST API tools (curl / VS Code REST Client)

#### Option 1: curl (terminal)

```powershell
curl -X GET http://localhost:8080/api/health
```

```powershell
curl -X POST http://localhost:8080/api/v1/auth/register ^
	-H "Content-Type: application/json" ^
	-d "{\"firstName\":\"Kenza\",\"lastName\":\"Idrissi\",\"email\":\"kenza@example.com\",\"password\":\"StrongPass123\",\"role\":\"CLIENT\"}"
```

```powershell
curl -X POST http://localhost:8080/api/v1/auth/password-reset/request ^
	-H "Content-Type: application/json" ^
	-d "{\"email\":\"kenza@example.com\"}"
```

```powershell
curl -X POST http://localhost:8080/api/v1/auth/email-verification/request ^
	-H "Content-Type: application/json" ^
	-d "{\"email\":\"kenza@example.com\"}"
```

```powershell
curl -X POST http://localhost:8080/api/v1/auth/password-reset/confirm ^
	-H "Content-Type: application/json" ^
	-d "{\"token\":\"reset-token-from-request\",\"newPassword\":\"NewStrongPass123\"}"
```

```powershell
curl -X POST http://localhost:8080/api/v1/auth/email-verification/confirm ^
	-H "Content-Type: application/json" ^
	-d "{\"token\":\"verification-token-from-request\"}"
```

#### Option 2: VS Code REST Client extension

Create a file `backend/apitest.http` with:

```http
### Health
GET http://localhost:8080/api/health

### Auth ping
GET http://localhost:8080/api/v1/auth/ping

### Register
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json

{
	"firstName": "Kenza",
	"lastName": "Idrissi",
	"email": "kenza@example.com",
	"password": "StrongPass123",
	"role": "CLIENT"
}
```

Then click `Send Request` above each request.

### C) Test in browser

You can test `GET` endpoints directly in browser address bar:

- `http://localhost:8080/api/health`
- `http://localhost:8080/api/v1/auth/ping`

For `POST` endpoints like `/api/v1/auth/register`, a normal browser tab is not enough.
Use Postman, curl, REST Client extension, or frontend code.

### D) Quick troubleshooting

If backend does not start (exit code 1):

1. Run backend from terminal (not only VS Code run button) to see full logs:

```powershell
mvn spring-boot:run
```

2. Verify DB is up:

```powershell
docker compose ps
```

3. Verify `.env` has correct DB credentials.
4. Verify port `8080` is free.
