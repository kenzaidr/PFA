# Frontend

Guide d'integration frontend <-> backend pour le projet PFA.

Ce document liste:
- Les endpoints backend deja disponibles.
- Les endpoints a implementer pour connecter les ecrans frontend actuels.
- Les payloads recommandes a partir du code frontend et des DTO backend existants.

## 1) Base URL Backend

- Backend local: `http://localhost:8080`
- Prefix principal API: `/api/v1`

## 2) Endpoints backend existants (actuels)

Ces endpoints existent deja dans les controllers backend:

- `GET /api/health`
- `GET /api/v1/auth/ping`
- `GET /api/v1/students/ping`
- `GET /api/v1/recruiters/ping`
- `GET /api/v1/admin/ping`

## 3) Endpoints necessaires pour connecter le frontend

### P0 - Authentification (priorite immediate, US-001)

Utilise par: `src/pages/AuthPage.jsx`

1. `POST /api/v1/auth/register`
- But: creation compte etudiant/recruteur.
- Body recommande:

```json
{
	"firstName": "Kenza",
	"lastName": "Idrissi",
	"email": "kenza@example.com",
	"password": "StrongPass123!",
	"role": "CLIENT"
}
```

2. `POST /api/v1/auth/login`
- But: connexion utilisateur.
- Body recommande:

```json
{
	"email": "kenza@example.com",
	"password": "StrongPass123!"
}
```

- Reponse recommandee (basee sur `LoginResponse` + `UserSummaryResponse`):

```json
{
	"token": "jwt_token_here",
	"user": {
		"id": 1,
		"email": "kenza@example.com",
		"firstName": "Kenza",
		"lastName": "Idrissi",
		"role": "CLIENT"
	}
}
```

3. `GET /api/v1/auth/me`
- But: recuperer utilisateur connecte (apres refresh page).

4. `POST /api/v1/auth/logout` (optionnel)
- But: invalider token cote backend (si blacklist) ou gerer logout cote client.

### P1 - Onboarding et profil client (etudiant)

Utilise par: `src/pages/OnboardingPage.jsx`, `src/components/dashboard/SettingsTab.jsx`

1. `POST /api/v1/clients/onboarding`
- But: sauvegarder reponses onboarding (specialty, goal, availability, weakness, city).

2. `POST /api/v1/clients/cv`
- But: upload CV (multipart/form-data).

3. `POST /api/v1/clients/cv/analyze`
- But: lancer analyse IA du CV et retourner resume profil.

4. `GET /api/v1/clients/profile`
- But: charger profil settings/dashboard.

5. `PUT /api/v1/clients/profile`
- But: modifier profil (firstName, lastName, phone, bio, liens, etc.).

6. `PUT /api/v1/clients/privacy`
- But: maj preferences confidentialite.

7. `DELETE /api/v1/clients/account`
- But: suppression compte (zone danger).

### P1 - Dashboard et analytics

Utilise par: `src/pages/StudentDashboard.jsx`, `src/components/dashboard/OverviewTab.jsx`, `src/components/dashboard/SkillsTab.jsx`

1. `GET /api/v1/dashboard/overview`
- But: stats globales (score, matched jobs, streak, rank).

2. `GET /api/v1/clients/skills/radar`
- But: donnees radar chart.

3. `GET /api/v1/clients/skills`
- But: liste des skills detaillees.

4. `GET /api/v1/clients/badges`
- But: badges/certifications.

5. `GET /api/v1/clients/activities`
- But: activite recente.

### P1 - Jobs et market

Utilise par: `src/components/dashboard/JobsTab.jsx`, `src/components/dashboard/MarketTab.jsx`

1. `GET /api/v1/jobs?filter=&search=&page=&size=`
- But: recuperer offres jobs (filtrage, pagination).

2. `GET /api/v1/jobs/recommended`
- But: offres match par profil.

3. `POST /api/v1/jobs/{jobId}/apply`
- But: postuler.

4. `GET /api/v1/market/salary-trends`
- But: tendances salaires par skill.

5. `GET /api/v1/market/top-companies`
- But: top recruteurs actifs.

### P1 - Roadmap

Utilise par: `src/components/dashboard/RoadmapTab.jsx`

1. `GET /api/v1/clients/roadmap`
- But: recuperer roadmap active + progression.

2. `GET /api/v1/clients/roadmap/modules`
- But: liste modules + statut (done/current/locked).

3. `POST /api/v1/clients/roadmap/modules/{moduleId}/start`
- But: demarrer module.

4. `POST /api/v1/clients/roadmap/modules/{moduleId}/complete`
- But: terminer module et mettre a jour progression.

### P1 - AI Coach

Utilise par: `src/components/dashboard/CoachTab.jsx`

1. `POST /api/v1/coach/chat`
- But: envoyer message au coach.

2. `GET /api/v1/coach/conversations`
- But: historique conversations.

3. `GET /api/v1/coach/stats`
- But: stats coaching (sessions, score, temps, skills ameliorees).

### P2 - Notifications et securite compte

Utilise par: `src/components/dashboard/SettingsTab.jsx`

1. `GET /api/v1/notifications`
2. `PUT /api/v1/notifications/preferences`
3. `GET /api/v1/auth/sessions`
4. `DELETE /api/v1/auth/sessions/{sessionId}`
5. `PUT /api/v1/auth/password`
6. `POST /api/v1/auth/2fa/enable`
7. `POST /api/v1/auth/2fa/verify`

## 4) Mapping ecran -> endpoint (resume rapide)

- Auth (`/auth`):
	- `POST /api/v1/auth/register`
	- `POST /api/v1/auth/login`
	- `GET /api/v1/auth/me`

- Onboarding (`/onboarding`):
	- `POST /api/v1/clients/cv`
	- `POST /api/v1/clients/cv/analyze`
	- `POST /api/v1/clients/onboarding`

- Dashboard (`/dashboard`):
	- `GET /api/v1/dashboard/overview`
	- `GET /api/v1/clients/skills/radar`
	- `GET /api/v1/jobs/recommended`
	- `GET /api/v1/clients/activities`

- Jobs tab:
	- `GET /api/v1/jobs`
	- `POST /api/v1/jobs/{jobId}/apply`

- Market tab:
	- `GET /api/v1/market/salary-trends`
	- `GET /api/v1/market/top-companies`

- Roadmap tab:
	- `GET /api/v1/clients/roadmap`
	- `GET /api/v1/clients/roadmap/modules`

- Coach tab:
	- `POST /api/v1/coach/chat`
	- `GET /api/v1/coach/stats`

- Settings tab:
	- `GET /api/v1/clients/profile`
	- `PUT /api/v1/clients/profile`
	- `PUT /api/v1/notifications/preferences`
	- `PUT /api/v1/auth/password`

## 5) Important: mismatch a corriger cote backend

En lisant le code backend actuel:
- `Role` enum est: `ADMIN`, `RECRUITER`, `CLIENT`.

Dans le frontend Auth, le role UX est `student`/`recruiter`.

Donc, mapping recommande cote frontend:
- `student` -> `CLIENT`
- `recruiter` -> `RECRUITER`

Et cote backend, verifier si vous voulez garder `CLIENT` ou revenir a `STUDENT` partout.

## 6) Prochaine etape concrete (ce que tu dois faire maintenant)

Pour l'image US-001 "Implementer inscription etudiant", commence par:

1. Implementer `POST /api/v1/auth/register` dans `AuthController` + service.
2. Ajouter validation DTO (`firstName`, `lastName`, `email`, `password`, `role`).
3. Hash password (BCrypt deja configure dans `SecurityConfig`).
4. Sauvegarder `User` (role `CLIENT` pour etudiant) + entite `Client` associee.
5. Retourner payload `UserSummaryResponse` (ou `LoginResponse` si auto-login).

## 7) Optionnel: structure API frontend conseillee

Dans `src/services/api.js`, centraliser tous les appels (fetch/axios), avec:
- `baseURL = http://localhost:8080`
- ajout automatique header `Authorization: Bearer <token>`
- gestion d'erreurs uniforme (401/403/500)

