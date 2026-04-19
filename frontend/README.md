# Frontend

This frontend is currently UI-first (mock data in components). The backend connection layer is not implemented yet.

This file documents:
- what endpoint already exists in your backend
- all endpoints the frontend needs to fully work
- request and response shapes to implement

## 1) Current Backend Endpoint (Already Exists)

From backend scan, only this endpoint exists now:

- `GET /api/health`

Expected response:

```json
{
	"status": "UP",
	"service": "pfa-backend",
	"timestamp": "2026-04-19T12:00:00Z"
}
```

## 2) Frontend Endpoint Contract To Implement

These endpoints are inferred from current frontend pages/components:
- `src/pages/AuthPage.jsx`
- `src/pages/OnboardingPage.jsx`
- `src/pages/StudentDashboard.jsx`
- `src/components/dashboard/*.jsx`
- `src/components/layout/ProfilePanel.jsx`

### A. Auth

- `POST /api/auth/register/student`
- `POST /api/auth/register/recruiter`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`

Minimum payloads:

```json
{
	"email": "string",
	"password": "string"
}
```

For register student:

```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string",
	"role": "student"
}
```

For register recruiter:

```json
{
	"firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string",
	"companyName": "string",
	"role": "recruiter"
}
```

### B. Onboarding (CV + Questions)

- `POST /api/onboarding/cv/analyze` (multipart/form-data)
- `POST /api/onboarding/profile/build`
- `GET /api/onboarding/status`

`/api/onboarding/cv/analyze` request:
- form-data field: `file`

`/api/onboarding/cv/analyze` response:

```json
{
	"name": "string",
	"level": "string",
	"skills": ["string"],
	"education": "string",
	"experience": "string",
	"missing": ["string"],
	"score": 0
}
```

`/api/onboarding/profile/build` request:

```json
{
	"answers": {
		"specialty": "frontend|backend|fullstack|data",
		"goal": "job_6m|job_1y|senior|freelance",
		"availability": "5h|10h|20h|40h",
		"weakness": "algo|sysdesign|english|soft",
		"city": "casablanca|rabat|fes|remote"
	}
}
```

### C. Dashboard Overview

- `GET /api/dashboard/overview`
- `GET /api/dashboard/stats`
- `GET /api/dashboard/activities`
- `GET /api/dashboard/notifications`

`/api/dashboard/stats` response shape:

```json
{
	"globalScore": 87,
	"matchedJobs": 23,
	"activeStreakDays": 14,
	"nationalRank": 342,
	"deltas": {
		"globalScore": "+5",
		"matchedJobs": "+8",
		"activeStreakDays": "record",
		"nationalRank": "+58"
	}
}
```

### D. Skills

- `GET /api/skills/radar`
- `GET /api/skills`
- `GET /api/badges`

`/api/skills/radar` response:

```json
[
	{ "label": "React", "value": 92 },
	{ "label": "Python", "value": 78 }
]
```

### E. Market

- `GET /api/market/salaries`
- `GET /api/market/companies/top`
- `GET /api/market/insights`

### F. Jobs

- `GET /api/jobs`
- `GET /api/jobs/recommended`
- `POST /api/jobs/{jobId}/apply`
- `GET /api/jobs/{jobId}`

Recommended query params for `GET /api/jobs`:
- `q`
- `filter=all|top|remote|senior`
- `location`
- `page`
- `size`

Job response item:

```json
{
	"id": "string",
	"title": "string",
	"company": "string",
	"match": 0,
	"location": "string",
	"salary": "string",
	"tags": ["string"]
}
```

### G. Roadmap

- `GET /api/roadmap`
- `GET /api/roadmap/tracks`
- `PATCH /api/roadmap/tracks/{trackId}/activate`
- `PATCH /api/roadmap/modules/{moduleId}/start`
- `PATCH /api/roadmap/modules/{moduleId}/complete`

### H. AI Coach

- `GET /api/coach/prompts`
- `GET /api/coach/messages?sessionId={id}`
- `POST /api/coach/messages`

`/api/coach/messages` request:

```json
{
	"sessionId": "string",
	"message": "string",
	"lang": "fr|en"
}
```

`/api/coach/messages` response:

```json
{
	"reply": "string",
	"sessionId": "string"
}
```

### I. Settings and Profile

- `GET /api/users/me/profile`
- `PUT /api/users/me/profile`
- `PUT /api/users/me/links`
- `PUT /api/users/me/preferences`
- `PUT /api/users/me/privacy`
- `PUT /api/users/me/notifications`
- `PUT /api/users/me/password`
- `POST /api/users/me/2fa/enable`
- `POST /api/users/me/2fa/verify`
- `GET /api/users/me/sessions`
- `DELETE /api/users/me/sessions/{sessionId}`
- `GET /api/users/me/export`
- `DELETE /api/users/me`

### J. Notifications

- `GET /api/notifications`
- `PATCH /api/notifications/{id}/read`
- `PATCH /api/notifications/read-all`

## 3) Frontend Integration Rules

### Add env variable

Create `.env` in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### API base in frontend

Use `src/services/api.js` as the central client.

Suggested baseline:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```

Then call endpoints with:

```js
fetch(`${API_BASE_URL}/api/...`)
```

## 4) Important Status

- Current frontend state: mostly static/mock values.
- Current backend state: only `GET /api/health` is implemented.
- To fully link frontend + backend, implement the contract above and then wire calls in `src/services/api.js` and page/tab components.
