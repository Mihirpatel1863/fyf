# Legal Workspace Management System

## Overview

This is a full-stack legal workspace management system built for law firms and legal professionals. The application provides a comprehensive platform for managing legal cases, workspaces, and client information with a modern, responsive user interface.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Architecture Pattern**: RESTful API with route-based organization
- **Middleware**: Custom logging and error handling middleware
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for production)
- **Connection**: Neon Database serverless PostgreSQL
- **Development Storage**: In-memory storage implementation for development/testing
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Database Schema
- **Users**: Authentication and user profile management
- **Workspaces**: Legal case workspaces with comprehensive case details
- **Case Files**: Document management for each workspace
- **Relationships**: Proper foreign key relationships between entities

### API Endpoints
- `GET /api/user` - Current user information
- `GET /api/dashboard/metrics` - Dashboard analytics
- `GET /api/workspaces` - List all workspaces
- `GET /api/workspaces/:id` - Single workspace details
- `POST /api/workspaces` - Create new workspace
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace
- `GET /api/workspaces/:id/case-files` - Workspace files
- `POST /api/workspaces/:id/case-files` - Upload case files
- `DELETE /api/case-files/:id` - Delete case file

### UI Components
- **Dashboard**: Overview with metrics and workspace management
- **Sidebar Navigation**: Main application navigation
- **Workspace Management**: Create, edit, and manage legal workspaces
- **Form Handling**: React Hook Form with Zod validation
- **File Upload**: Document management capabilities
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

1. **Client Request**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle requests and validate data
3. **Database Operations**: Drizzle ORM performs type-safe database operations
4. **Response**: JSON responses sent back to client
5. **State Management**: TanStack Query manages caching and synchronization
6. **UI Updates**: React components re-render with updated data

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection Pooling**: Built-in connection management

### UI Libraries
- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **TypeScript**: Type checking and compilation
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot reload
- **Database**: In-memory storage for rapid prototyping
- **Environment**: NODE_ENV=development

### Production
- **Build Process**: Vite builds client assets, ESBuild bundles server
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Static Assets**: Served from dist/public directory
- **Process**: Single Node.js process serving both API and static files

### Configuration
- **Environment Variables**: DATABASE_URL for database connection
- **Build Outputs**: 
  - Client: `dist/public/` (static assets)
  - Server: `dist/index.js` (bundled server)

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```