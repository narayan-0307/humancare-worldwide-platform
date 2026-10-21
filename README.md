
# HumanCare Worldwide Platform

A multi-application platform for patient services, vendor operations, administration, and future CRM integration.

## Project Structure

- `apps/admin-portal` — Admin web dashboard (React + Vite).
- `apps/vendor-portal` — Vendor web dashboard (React + Vite).
- `apps/mobile-app` — Shared Patient and Vendor mobile application (React Native + Expo).
- `backend` — Shared Node.js and Express API, Prisma database access, and future business logic.
- `docs` — Architecture decisions and project documentation.
- `infrastructure` — Reserved for deployment and infrastructure configuration.

## Technology Stack

- Node.js and npm workspaces
- React and Vite for web portals
- React Native and Expo for mobile
- Express.js for the backend API
- Prisma ORM and MySQL for database access

Use the exact dependency versions in the package manifests and lockfile.

## Current Implementation Status

- Web and mobile application scaffolds are present.
- The backend provides a health endpoint and JSON error handling.
- Backend automated health tests are included.
- Prisma schema validation and client generation have been checked.
- A local development database can be configured using `backend/.env`.
- Application data models, database migrations, authentication, business workflows, and CRM integration remain to be implemented.

## Local Setup

Requirements: Node.js 22 or later, npm, and MySQL 8.

1. Clone the repository.
2. From the project root, install dependencies:

   ```powershell
   npm ci
   ```

3. Configure the backend environment by copying `backend/.env.example` to `backend/.env` and setting the local database connection string.
4. Start the backend:

   ```powershell
   npm run dev:backend
   ```

5. Open another terminal at the project root to start the desired application:

   ```powershell
   npm run dev:admin
   npm run dev:vendor
   npm run dev:mobile
   ```

Run each application command separately. Database migrations are not available until application models and migration files have been created.

## Useful Checks

```powershell
npm run test:backend
npm run build:admin
npm run build:vendor
npm run lint:admin
npm run lint:vendor
```

## Database and Secrets

Use a dedicated development database. Keep real credentials in the ignored `backend/.env` file. Never commit passwords, API tokens, private keys, patient data, or database backups.

## Architecture and Security Principles

- Keep this project separate from the existing HumanCare Worldwide repository.
- Enforce authentication and authorization in the backend.
- Keep secrets out of client applications and source control.
- Store HumanCare application records independently of CRM availability.
- Confirm Bitrix24 API access, permissions, fields, and status mappings before implementing integration.
- Do not introduce a Superadmin dashboard or manual assignment of every lead without an explicit architecture review.
