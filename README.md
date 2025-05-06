# Admin Panel - SaaS Subscription Dashboard

Modern admin dashboard for managing SaaS subscriptions, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Customer management with filtering and search
- Customer profiles with profile, subscription, and onboarding tabs
- Subscription plan management 
- Responsive design with drawer pattern UI

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- JSON Server for mock API
- Headless UI components

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

```bash
# Clone repository
git clone <repository-url>
cd admin_panel

# Install dependencies
npm install

# Start JSON Server (mock API)
npm run server

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
admin_panel/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app routes
│   ├── components/     # UI components
│   │   ├── customers/  # Customer-specific components
│   │   └── ui/         # Shared UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and API functions
│   └── types/          # TypeScript type definitions
├── db.json             # Mock database
```

## Key Components

- **Customer List:** Searchable, filterable customer table
- **Customer Drawer:** Slide-in panel with tabbed interface
  - Profile tab: Customer information
  - Subscription tab: Plan management with upgrade options
  - Onboarding tab: Track customer progress

## Future Improvements

- Authentication and authorization
- Form validation
- Enhanced error handling
- Accessibility improvements
- Testing suite
- Dark mode
- Performance optimizations
