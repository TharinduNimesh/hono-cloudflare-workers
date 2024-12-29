# Instructions for Development

## Project Standards

### Code Organization
- Place all source code in `src/` directory
- Follow established folder structure:
  - api/ - Route handlers 
  - db/ - Database schemas
  - lib/ - External integrations
  - schema/ - Request validations
  - types/ - TypeScript types
  - utils/ - Business logic

### TypeScript Best Practices
- Enable strict TypeScript checks
- Create interfaces/types for all data structures
- Use Zod for runtime validation
- Document complex functions with JSDoc comments

### Database Patterns
- Define schemas in db/schema.ts
- Use Drizzle ORM for all database operations
- Implement database operations in utils/ classes
- Include timestamps on all tables
- Use transactions for multi-table operations

### API Development
- Group related routes in api/ subfolders
- Use Zod validators for request validation
- Follow RESTful principles
- Return consistent response structures:
  {
    success: boolean,
    message: string,
    data?: any
  }

### Authentication/Authorization
- Store credentials separately from user data
- Hash passwords with bcrypt (12 rounds)
- Implement JWT for session management
- Add role-based access control
- Use middleware for protected routes

### Error Handling
- Create custom error classes
- Use try/catch blocks consistently
- Log errors appropriately
- Return user-friendly error messages

### Testing
- Write unit tests for utils and services
- Test API endpoints with integration tests
- Mock external services in tests
- Aim for 80%+ coverage

### Security
- Validate all inputs with Zod
- Implement rate limiting
- Set secure headers
- Follow OWASP security guidelines

### Deployment
- Use wrangler for deployments
- Test in development environment first
- Run database migrations before deploy
- Monitor for errors post-deployment

This file serves as the primary reference for maintaining consistency across the project. Update as new patterns emerge.