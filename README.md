# Employee Leave Management System (Frontend)

A full-stack leave management application with separate dashboards for managers and employees, built with Next.js, RTK Query, and Tailwind CSS.

## Project Overview

The system allows employees to apply for, edit, and delete leave requests, and view their leave history. Managers can view all requests, filter by employee/type/status, approve or reject pending requests, and see a dashboard with summary stats.

### Features

- **Authentication** — JWT-based login with role-based routing (Employee / Manager)
- **Employee Dashboard** — Stats overview, apply for leave, view/edit/delete pending requests, leave history with filter/sort/pagination, calendar view
- **Manager Dashboard** — Stats overview (clickable to filter), view all leave requests, approve/reject pending requests, employee list with search and detail view
- **Dark Mode** — Toggle between light and dark themes
- **Responsive Design** — Mobile-friendly sidebar, responsive tables and grids
- **Optimistic UI** — Approve/reject/delete updates reflect instantly before server confirmation
- **Skeleton Loaders** — Loading states for tables, stats, and calendar
- **Form Validation** — Zod + react-hook-form with date range and 30-day max duration checks

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **State Management:** Redux Toolkit + RTK Query
- **Styling:** Tailwind CSS v4
- **Forms:** react-hook-form + zod
- **Icons:** lucide-react
- **Toasts:** sonner
- **Calendar:** react-big-calendar
- **Language:** TypeScript

## Folder Structure

```
src/
├── app/
│   ├── (auth)/login/          # Login page
│   ├── (private)/
│   │   ├── manager/           # Manager dashboard, requests, employees
│   │   ├── employee/          # Employee dashboard, apply leave
│   │   ├── leave-history/     # Leave history with filter/sort
│   │   ├── calendar/          # Calendar view
│   │   └── layout.tsx         # Sidebar + header layout
│   └── layout.tsx             # Root layout with Redux provider
├── features/
│   ├── auth/                  # Login API, auth types
│   ├── employee/              # Employee API, hooks, schemas, components
│   ├── manager/               # Manager API, hooks, components
│   ├── shared/                # Reusable UI, utils, constants, types
│   └── ThemeToggle/           # Dark mode toggle
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm or yarn

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (see below)
cp .env.example .env

# Run the development server
pnpm run dev
```

The app will be available at `http://localhost:3000`.

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://localhost:4000` |

## Assumptions

1. **Leave types** — Fixed to: Paid Leave, Sick Leave, Casual Leave, Unpaid Leave.
2. **Edit/delete restricted** — Only pending leaves can be edited or deleted.
3. **Manager approval** — Managers can only approve or reject; they cannot edit leave details.
4. **Server-side pagination** — Both manager and employee leave lists use server-side pagination with 10 items per page.
5. **Optimistic updates** — Approve/reject (manager) and delete (employee) use optimistic UI via component-level state with tag-based refetch for server consistency.
6. **Theme persistence** — Dark mode preference is stored in localStorage.
7. **No signup** — Users are pre-registered; no signup flow is implemented.


## Login Credentials
| Role | Email | Password |
|------|-------|----------|
| Employee | employee1@leave.com | password123 |
| Manager | manager@leave.com | password123 |


# Important note: database is hosted on free tier so it may take some time to wake up the server if it has been idle for a while (which is very short time). Please be patient when accessing the application after a period of inactivity.