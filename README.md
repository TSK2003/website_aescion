# AESCION Enterprise Software Ecosystem

## Project Overview
Welcome to the **AESCION Enterprise Software Ecosystem**. This repository represents the definitive, production-ready architecture powering the entirety of AESCION's digital footprint. It integrates a public-facing website, a comprehensive Admin Operating System (Admin OS), and a highly scalable, secure NestJS backend.

## Architecture Diagram
The system relies on a strict, clean separation of concerns into two primary domains:

- **Frontend Domain**: Next.js 14/15, React 19, Tailwind CSS v4, Zustand, TanStack Query, Shadcn/Radix UI.
- **Backend Domain**: NestJS, TypeScript, PostgreSQL, Prisma ORM, JWT, bcrypt.
- **Infrastructure**: AWS EC2, PM2, GitHub Actions (CI/CD).

## Repository Structure
```text
AESCION
├── .github/            # GitHub Actions CI/CD workflows
├── Frontend/           # All client applications and Next.js workspaces
├── Backend/            # NestJS API, Database operations & PM2 configs
├── .gitignore
└── README.md
```

## Folder Explanation
- **Frontend/admin/**: Admin OS portal running on Port 3002.
- **Frontend/website/**: Public-facing Website running on Port 3000.
- **Frontend/packages/**: Shared TypeScript packages, constants, and utilities for the frontend workspace.
- **Backend/src/**: Core business logic, controllers, and services for the NestJS API.
- **Backend/prisma/**: Database schemas, migration files, and seed scripts.
- **.github/workflows/**: CI/CD automation pipelines for continuous deployment.

## Installation
Ensure you have Node.js (v20+), PostgreSQL (v14+), and Git installed.

## Frontend Setup
Clone the repository and install the frontend ecosystem (which utilizes npm workspaces for independent dependency management):
```bash
git clone https://github.com/TSK2003/website_aescion.git
cd website_aescion/Frontend
npm install
```

## Backend Setup
Install the backend ecosystem independently:
```bash
cd ../Backend
npm install
```

## Environment Variables
Environment variables are strictly isolated between the domains.
Copy the provided environment templates and configure them accordingly:

**Frontend**:
```bash
cp Frontend/.env.example Frontend/.env
```
Ensure `NEXT_PUBLIC_API_URL` is configured correctly.

**Backend**:
```bash
cp Backend/.env.example Backend/.env
```
Ensure your PostgreSQL connection string in `Backend/.env` (`DATABASE_URL`) is properly set.

## Database Commands
From the `Backend/` directory, perform database migrations and generate the Prisma client:
```bash
cd Backend
npx prisma generate
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma db seed
npx prisma studio
```

## Seed Commands
From the `Backend/` directory, seed the database with initial required data (e.g., Super Admin):
```bash
cd Backend
npx prisma migrate reset
npx prisma db seed
npx prisma studio
```

## Development Commands
- **Run API (Backend)**: `cd Backend && npm run start:dev` (Runs on Port 3001)
- **Run Admin (Frontend)**: `cd Frontend && npm run dev:admin` (Runs on Port 3002)
- **Run Website (Frontend)**: `cd Frontend && npm run dev:website` (Runs on Port 3000)
- **TypeScript Verification**: Run `npx tsc --noEmit` inside the respective directories.
- **Linter**: Run `npm run lint` inside the respective directories.

## Production Commands
Run isolated production builds:
```bash
cd Backend && npm run build
cd ../Frontend/admin && npm run build
cd ../website && npm run build
```

## Deployment Guide
The deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`).
The pipeline will lint, test, build, and deploy the application to your EC2 instance via SSH, executing a zero-downtime PM2 reload.

## PM2 Guide
The architecture utilizes a blazingly fast native Node.js runtime managed by PM2 cluster mode. The PM2 configuration (`ecosystem.config.js`) lives inside the `Backend/` directory.

### Start via PM2
```bash
cd Backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### PM2 Commands
- **Check Status**: `pm2 status`
- **View Logs**: `pm2 logs`
- **Zero-Downtime Reload**: `pm2 reload ecosystem.config.js --update-env`

## Troubleshooting
- **Git Push Error on `Frontend/admin`**: The repository is set up with independent frontend/backend environments but tracked by a single `.git` repository at the root. Do not initialize a separate `.git` folder inside subdirectories.
- **Missing Environment Variables**: Make sure to always copy from `.env.example` when cloning on a new machine.

## FAQ
- **Why are dependencies separated?** To maintain true isolation and ensure clean micro-architectural boundaries between the frontend Next.js workspace and the backend NestJS environment.

## Contribution Guide
Please ensure that your PRs follow the established directory structure. Do not place root-level configuration files unless absolutely necessary. Run Linters and TypeScript verification locally before submitting any pull requests.

## Future Roadmap
- Implementation of comprehensive ERP and HRMS features.
- Advanced monitoring and telemetry integration.
- Automated API documentation syncing and deployment.
