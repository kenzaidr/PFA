# Output Ports

## Overview
Output ports define the contracts for repositories and external services that the domain layer depends on. These are implemented by infrastructure adapters.

## Responsibilities
- **Define repository interfaces**: Create interfaces for data persistence operations
- **Define service ports**: Create interfaces for external service calls
- **Specify domain-driven contracts**: Express requirements in domain terms, not implementation terms
- **Enable dependency inversion**: Allow domain to depend on abstractions

## Guidelines
- Name repositories after aggregates (e.g., `UserRepository`, `JobOfferRepository`)
- Use domain-driven method names (avoid generic names like `get`, `set`)
- Specify exceptions that can be thrown
- Document complex queries or operations
