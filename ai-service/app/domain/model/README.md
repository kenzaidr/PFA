# Domain Models

## Overview
Domain models represent core business concepts as entities and value objects. Models encapsulate business logic and ensure data consistency.

## Responsibilities
- **Define entities**: Create domain entities with identity and lifecycle
- **Define value objects**: Create immutable objects representing business values
- **Implement business logic**: Encapsulate business rules within models
- **Ensure invariants**: Validate and maintain business rule constraints

## Guidelines
- Models should be focused on business logic, not infrastructure concerns
- Use value objects to represent concepts without identity
- Keep models framework-independent
- Make models testable without external dependencies
