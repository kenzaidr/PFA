# Infrastructure Adapters

## Overview
Adapters implement the ports defined by the domain layer. They handle the technical details of connecting to external services, databases, and frameworks.

## Folder Structure
- `in/`: Input adapters (API controllers, message consumers, CLI handlers)
- `out/`: Output adapters (database repositories, external service clients)

## Responsibilities
- **Implement domain ports**: Provide concrete implementations of domain contracts
- **Handle framework integration**: Deal with framework-specific concerns
- **Transform between formats**: Convert between domain models and external representations
- **Handle errors**: Translate technical errors to domain exceptions

## Guidelines
- Adapters should follow the Adapter pattern - adapt external interfaces to domain ports
- Keep adapters thin - avoid complex logic, delegate to application/domain layers
- Make adapters easily replaceable - the domain shouldn't depend on specific adapters
