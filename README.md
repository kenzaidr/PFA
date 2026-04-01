# PFA

Projet de fin d'année.

## Repository Structure

This repository is organized into a few main areas. Use this guide to understand where to add code, documentation, and deployment files.

| Folder | What belongs here |
| --- | --- |
| `frontend/` | Web application UI, pages, reusable components, styles, assets, routing, and client state. |
| `backend/` | Main API server, controllers, routes, services, models, middleware, and backend utilities. |
| `ai-service/` | AI and model-related service code, inference logic, cached models, and AI tests. |
| `docs/` | Architecture notes, design references, reports, and user stories. |
| `infra/` | Docker, Nginx, and deployment-related configuration. |

## Frontend Guide

| Folder | What to do in it |
| --- | --- |
| `frontend/public/` | Store static files that are served directly without imports. |
| `frontend/src/app/` | Put app bootstrap and top-level setup here. |
| `frontend/src/assets/` | Store shared fonts, icons, images, and other visual resources. |
| `frontend/src/components/` | Build reusable UI components grouped by feature. |
| `frontend/src/components/admin/` | Add admin-only components. |
| `frontend/src/components/recruiter/` | Add recruiter-facing components. |
| `frontend/src/components/shared/` | Add reusable components used across multiple pages. |
| `frontend/src/components/student/` | Add student-facing components. |
| `frontend/src/hooks/` | Add reusable custom React hooks. |
| `frontend/src/pages/` | Add full page views and route-level screens. |
| `frontend/src/router/` | Define routes and navigation structure. |
| `frontend/src/services/` | Put API calls and client service helpers here. |
| `frontend/src/store/` | Keep global state logic here. |
| `frontend/src/store/slices/` | Put state slices and reducers here. |
| `frontend/src/styles/` | Store global styles and theme files. |
| `frontend/src/types/` | Define shared TypeScript types and interfaces. |
| `frontend/src/utils/` | Add generic helper functions here. |

## Backend Guide

| Folder | What to do in it |
| --- | --- |
| `backend/src/config/` | Add environment and application configuration. |
| `backend/src/controllers/` | Handle HTTP requests and responses here. |
| `backend/src/middleware/` | Add authentication, validation, logging, and error handling middleware. |
| `backend/src/models/` | Define data models and schemas. |
| `backend/src/routes/` | Map API endpoints to controllers. |
| `backend/src/services/` | Put business logic and reusable server workflows here. |
| `backend/src/utils/` | Add backend helper functions here. |
| `backend/tests/` | Write automated backend tests here. |

## AI Service Guide

| Folder | What to do in it |
| --- | --- |
| `ai-service/app/core/` | Store service configuration and core setup. |
| `ai-service/app/models/` | Define AI service data models and schemas. |
| `ai-service/app/routers/` | Add API routes for the AI service. |
| `ai-service/app/services/` | Put inference logic and service workflows here. |
| `ai-service/app/utils/` | Add shared helper functions here. |
| `ai-service/models_cache/` | Keep cached models and generated runtime artifacts here. |
| `ai-service/tests/` | Write AI service tests here. |

## Documentation Guide

| Folder | What to do in it |
| --- | --- |
| `docs/architecture/` | Document architecture diagrams and technical decisions. |
| `docs/design/` | Store UI and product design references. |
| `docs/reports/` | Keep reports and project deliverables here. |
| `docs/user-stories/` | Write user stories and acceptance notes here. |

## Infrastructure Guide

| Folder | What to do in it |
| --- | --- |
| `infra/docker/` | Store Docker and containerization files. |
| `infra/nginx/` | Store Nginx and reverse proxy configuration. |

## Team Workflow

Use [CONTRIBUTING.md](CONTRIBUTING.md) for task workflow, branch conventions, labels, and pull request rules.
