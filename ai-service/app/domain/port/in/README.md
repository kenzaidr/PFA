# Input Ports

## Overview
Input ports define the use case interfaces. These are the contracts that application services implement and expose to adapters.

## Responsibilities
- **Define use case interfaces**: Create interfaces representing business use cases
- **Document input/output parameters**: Specify what each use case requires and returns
- **Drive the architecture**: Use cases drive what operations are needed

## Guidelines
- Name ports after use cases (e.g., `CreateUserUseCase`, `AuthenticateUserUseCase`)
- Keep input/output parameters simple and domain-focused
- Consider future variations - make interfaces flexible enough for evolution
