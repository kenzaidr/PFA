# Domain Ports

## Overview
Ports are interfaces that define contracts between the domain and external layers. They enable loose coupling and testability by allowing the domain to depend on abstractions.

## Folder Structure
- `in/`: Input ports defining use case interfaces (usecases called from application layer)
- `out/`: Output ports defining contracts for repositories and external services

## Responsibilities
- **Define input ports**: Create use case interfaces for application services to call
- **Define output ports**: Create repository and service interfaces for adapters to implement
- **Document contracts**: Clearly specify what each port expects and returns

## Guidelines
- Ports should be driven by domain needs, not by implementation details
- Output ports should represent domain concepts, not database tables
- Keep ports focused and single-responsibility
- Use meaningful names that reflect the domain language
