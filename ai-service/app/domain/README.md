# Domain Layer

## Overview
The domain layer contains the core business logic, entities, and value objects. This is the heart of the application where business rules are implemented independently of any framework or external concerns.

## Responsibilities
- **Define domain entities**: Create entities that represent core business concepts
- **Implement domain value objects**: Immutable objects representing business values
- **Define domain rules**: Implement business logic and validation rules
- **Create domain events**: Define events that occur within the domain

## Folder Structure
- `model/`: Domain entities and value objects
- `port/`: Ports (interfaces) defining contracts for repositories and external services
  - `in/`: Input ports (use case interfaces)
  - `out/`: Output ports (repository and service interfaces)

## Guidelines
- Domain code should have no dependencies on frameworks or external libraries
- Entities should encapsulate business logic, not just be data containers
- Use ports to define contracts for infrastructure layer implementations
- Keep domain focused on business rules, not technical concerns
