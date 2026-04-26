# Mappers

## Overview
Mappers are responsible for converting between domain models and DTOs, or between different model representations.

## Responsibilities
- **Map entities to DTOs**: Convert domain entities to data transfer objects for API responses
- **Map DTOs to entities**: Convert incoming DTOs to domain entities
- **Handle transformations**: Perform any necessary data transformations during mapping
- **Maintain mapping logic**: Keep mapping rules centralized and testable

## Guidelines
- Consider using mapping libraries (MapStruct, ModelMapper, etc.)
- Keep mapping logic testable - test edge cases
- Document complex mappings
- Avoid side effects during mapping
