# Input Adapters

## Overview
Input adapters handle incoming requests from external sources. They are responsible for receiving requests and delegating to application services.

## Responsibilities
- **Handle HTTP requests**: Create REST API controllers/endpoints
- **Receive messages**: Handle incoming events or messages
- **Parse input**: Convert incoming data to DTOs
- **Call application services**: Delegate business logic to application layer
- **Format responses**: Return results to clients

## Guidelines
- Keep controllers thin - avoid complex logic
- Use standard HTTP patterns and status codes
- Validate input early and return clear error messages
- Document API endpoints with clear descriptions
