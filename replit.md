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

- June 24, 2025: Major layout and copy improvements focused on brutal pain points
  - **Realistic guarantee**: Removed money-back promise, focused on partnership and commitment to results
  - **Professional bio added**: Samuel's photo and enhanced bio with Dubotics partnership, Dubai experience
  - **Responsive header**: Fixed mobile navigation, better breakpoints, smaller text sizes for mobile
  - **Typography fixes**: Reduced hero font sizes, fixed "Agentes de IA" background issue, better contrast
  - **Brand colors updated**: Corrected to orange/purple/white identity (text-pain-highlight, text-solution-purple)
  - **Enhanced contrast**: New CSS classes for better text readability (text-white-strong, brand-consistent colors)
  - **Pain-focused copy**: Updated hero section emphasizing "stop losing sales while you sleep"
  - **Brutal pain cards**: 6 specific problems based on user feedback - "preso na operação", "leads quentes perdidos"
  - **Transformation promises**: 15 key benefits from user briefing - tripling sales, 90% support reduction
  - **Stronger CTAs**: "Parar de perder vendas agora" and "Quero essa transformação agora"
  - **Visual hierarchy**: Pain points in orange, solutions in purple, consistent with brand identity
- June 24, 2025: Implemented all briefing improvements
  - **Enhanced bio**: Samuel's professional credentials with Dubotics partnership
  - **Real metrics**: +R$100k sales, +10k hours, 4.9⭐ rating, 3 countries served
  - **Empathetic copy**: Pain points focused on real money loss
  - **Use case specifics**: Practical applications for each business niche
  - **Lead qualification**: Revenue-based form filtering for priority handling
- June 24, 2025: Fixed Docker Stack Traefik configuration
  - **Naming consistency**: Aligned service names across all files
  - **Production environment**: NODE_ENV=production with build process
  - **CORS configuration**: Proper HTTPS origins setup
  - **SSL/TLS setup**: LetsEncrypt certificate resolver configured
- June 24, 2025: Major overhaul - Multicanal AI agents focus
  - **Strategic pivot**: Changed from WhatsApp-only to multicanal AI agents (WhatsApp, Instagram, Facebook, Email, SMS)
  - **Realistic timeline**: Updated from 7 days to 15 days implementation + monthly service model
  - **Complete page restructure**: Removed main form, implemented calculadora dinâmica de perdas
  - **Enhanced problems section**: Expanded from 4 to 6 specific multicanal problems
  - **New pages added**: Complete Privacy Policy and Terms of Service with LGPD compliance
  - **Improved testimonials**: 6 detailed case studies by business niche with specific metrics
  - **Guarantee section**: Added 30-day satisfaction guarantee with 3 pillars
  - **Functional calculator**: Real-time loss calculation with JavaScript integration
  - **Professional bio**: Enhanced Samuel's credentials with Dubotics partnership
  - **Realistic metrics**: Updated stats (5+ years experience, removed inflated numbers)
  - **Multiple CTAs**: Strategic popup triggers instead of main page form
  - **Color corrections**: Fixed contrast issues in colored blocks
  - **Dynamic rocket**: Mid-page appearance with flying effect
  - **Footer links**: Added navigation to policy pages
- June 24, 2025: Complete redesign with modern dark theme
- June 24, 2025: Initial setup and basic landing page

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Modern dark theme with purple and gold accents, similar to high-end SaaS platforms.