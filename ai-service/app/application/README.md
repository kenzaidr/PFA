# Application Layer

## Overview
The application layer contains the business logic orchestration and use cases for the AI service. This layer acts as a bridge between the domain layer and external interfaces.

## Responsibilities
- **Implement use cases**: Create classes that orchestrate domain entities and aggregates
- **Handle DTOs**: Define and maintain data transfer objects for request/response mapping
- **Provide mapping logic**: Transform between domain models and external representations
- **Define application services**: Implement application-level orchestration

## Folder Structure
- `dto/`: Data Transfer Objects for API contracts
- `mapper/`: Mapping logic between domain and external models
- `service/`: Application service implementations orchestrating business logic

## Guidelines
- Keep application services focused on use case orchestration
- Use DTOs to decouple internal domain models from external APIs
- Follow dependency inversion principle - depend on domain ports, not implementations
