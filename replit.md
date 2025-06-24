# MeuSuper.app - AI-Powered Business Automation Platform

## Overview

MeuSuper.app is a full-stack web application focused on AI-powered business automation services. The platform serves as a landing page and lead generation system for a Brazilian automation consultancy, featuring a contact form that integrates with external webhooks for lead processing.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Tailwind CSS** with shadcn/ui component library for styling
- **Wouter** for client-side routing
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with webhook endpoints
- **In-memory storage** with interface for future database integration
- **Drizzle ORM** configured for PostgreSQL (ready for database expansion)
- **Session management** using express-session with PostgreSQL store support

### Database Design
The application uses Drizzle ORM with a PostgreSQL-ready schema:
- **Users table**: Basic authentication with username/password
- **Contacts table**: Lead capture with business information (nome, telefone, empresa, dor)
- Schema includes proper TypeScript types and Zod validation schemas

## Key Components

### Contact Form System
- Captures lead information (name, phone, company, pain points)  
- Validates data using Zod schemas
- Stores contacts locally and forwards to external webhook
- Automatic WhatsApp redirect after successful submission
- Error handling with toast notifications

### UI Components
- Complete shadcn/ui component library implementation
- Custom purple and gold color scheme matching brand identity
- Responsive design with mobile-first approach
- Portuguese language interface

### API Integration
- `/api/webhook` endpoint for contact form submissions
- External webhook forwarding to automation platform
- Graceful error handling for external service failures

## Data Flow

1. **User submits contact form** → Form validation with React Hook Form + Zod
2. **Client sends data to API** → POST request to `/api/webhook`
3. **Server processes contact** → Stores in local storage + forwards to external webhook
4. **Response handling** → Success message + WhatsApp redirect
5. **Error scenarios** → Toast notifications with fallback options

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connection (Neon PostgreSQL)
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development Tools
- **tsx**: TypeScript execution
- **esbuild**: Fast JavaScript bundler
- **vite**: Development server and build tool

## Deployment Strategy

### Build Process
- **Development**: `npm run dev` - Runs Vite dev server with Express backend
- **Production Build**: `npm run build` - Builds client with Vite + bundles server with esbuild
- **Production Start**: `npm run start` - Serves bundled application

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Webhook**: Uses `WEBHOOK_URL` for external integration (defaults to MeuSuper.app webhook)
- **Ports**: Server runs on port 5000, proxied to port 80 in production

### Replit Configuration
- **Modules**: Node.js 20, web deployment, PostgreSQL 16
- **Deployment**: Autoscale target with build/run commands
- **Development**: Parallel workflow with port watching

## Recent Changes

- June 24, 2025: Complete redesign with modern dark theme
  - Created new modern landing page with glassmorphism design
  - Implemented dark gradient background with purple/yellow accents
  - Added interactive components using shadcn/ui
  - Enhanced mobile responsiveness and animations
  - Improved contact form with better UX
  - Added WhatsApp popup modal for "Falar com especialista" button
  - Implemented new sections: Para Quem É, Benefícios, Garantia, Plano de Crescimento
  - Updated FAQ with new questions from briefing
  - Improved responsive design for all screen sizes
  - Added Three.js particle background with mouse interaction
  - Updated logo with orange "Meu" and white "Super.app"
  - Replaced Samuel's image with provided URL (rounded profile style)
  - Enhanced hover effects with dynamic colors and particle interactions
  - Added Samuel's Instagram (@eusamuelvicente) to About section
  - Improved color contrast throughout the site (gray-300 → gray-200)
  - Updated copy with more persuasive and commercial language
  - Changed primary accent color from purple to orange for better visibility
- June 24, 2025: Initial setup and basic landing page

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Modern dark theme with purple and gold accents, similar to high-end SaaS platforms.