# Luxura Salon Application

## Overview

This is a modern full-stack web application for a luxury beauty salon called "Luxura Salon". The application provides a sophisticated online presence with appointment booking, contact inquiries, service showcases, and customer testimonials. Built with React/TypeScript frontend and Express.js backend, it offers a seamless user experience for both customers and salon management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with Shadcn/ui component library for consistent, professional UI
- **State Management**: TanStack React Query for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reloading with Vite integration in development mode

## Key Components

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Tables**: 
  - `appointments` - Stores customer appointment bookings
  - `contact_inquiries` - Stores customer contact form submissions
- **Validation**: Zod schemas for runtime type safety

### Storage Implementation
- **Interface**: `IStorage` interface defines data access methods
- **Current Implementation**: In-memory storage (`MemStorage`) for development
- **Design**: Ready for database integration with minimal changes

### API Endpoints
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Retrieve all appointments
- `GET /api/appointments/:id` - Get specific appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `POST /api/contact` - Submit contact inquiry
- `GET /api/contact` - Retrieve contact inquiries

### UI Components Structure
- **Navigation**: Sticky navigation with smooth scrolling
- **Hero Section**: Eye-catching landing area with call-to-action buttons
- **Services Section**: Interactive service cards with booking integration
- **Gallery**: Responsive image gallery showcasing salon work
- **About Section**: Company information and statistics
- **Testimonials**: Customer reviews and ratings
- **Contact Section**: Contact form and location information
- **Booking Modal**: Multi-step appointment booking process

## Data Flow

1. **User Interaction**: Users interact with React components
2. **Form Submission**: Forms are validated using Zod schemas
3. **API Requests**: TanStack Query manages API calls to Express endpoints
4. **Data Processing**: Express routes handle business logic and validation
5. **Storage Operations**: Data is persisted through the storage interface
6. **Response Handling**: Success/error states are managed and displayed to users

## External Dependencies

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

### Database & Validation
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **@neondatabase/serverless**: PostgreSQL serverless driver

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **API Integration**: Express server with Vite middleware
- **Database**: Configured for PostgreSQL with Drizzle migrations

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static files served by Express in production
- **Environment**: NODE_ENV-based configuration switching

### Database Setup
- **Migrations**: Drizzle Kit manages database schema migrations
- **Configuration**: Environment-based database URL configuration
- **Connection**: Serverless-ready PostgreSQL connection

The application is designed to be easily deployable to platforms like Replit, Vercel, or traditional hosting providers with minimal configuration changes.