# DTOs (Data Transfer Objects)

## Overview
Data Transfer Objects are used to transfer data between different layers of the application. They decouple internal domain models from external API contracts.

## Responsibilities
- **Define API contracts**: Create DTO classes for incoming requests
- **Define response objects**: Create DTO classes for API responses
- **Handle serialization**: Ensure DTOs are properly serializable for JSON/XML
- **Maintain versioning**: Manage API contract versions if needed

## Guidelines
- Keep DTOs simple - they should primarily be data containers
- Use meaningful names that reflect their purpose
- Document required and optional fields
- Use validation annotations where appropriate
