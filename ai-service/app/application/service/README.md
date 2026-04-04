# Application Services

## Overview
Application services orchestrate domain entities and aggregates to implement use cases. They act as the primary interface to the domain layer.

## Responsibilities
- **Orchestrate use cases**: Implement business workflows by coordinating domain objects
- **Manage transactions**: Coordinate transactional boundaries
- **Call domain ports**: Use repository and service ports to access infrastructure
- **Handle application-level errors**: Catch and transform domain errors

## Guidelines
- Each service should focus on a specific use case or domain aggregate
- Keep services thin - don't duplicate domain logic
- Use ports to access infrastructure (repositories, external services)
- Make services testable by depending on ports/interfaces
