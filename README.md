# AESCION Enterprise Software Ecosystem

Welcome to the **AESCION Enterprise Software Ecosystem**. This repository represents the definitive, production-ready architecture powering the entirety of AESCION's digital footprint. It integrates a public-facing website, a comprehensive Admin Operating System (Admin OS), and a highly scalable, secure NestJS backend.

## 🏛️ Repository Structure

The system relies on a strict, clean separation of concerns into two primary domains:

```text
AESCION
├── .github/            # GitHub Actions CI/CD workflows
├── Frontend/           # All client applications (Next.js)
│   ├── admin/          # Admin OS (Port 3002)
│   ├── website/        # Public Website (Port 3000)
│   ├── packages/       # Shared TS packages (types, constants)
│   └── package.json    # Frontend Workspace configuration
├── Backend/            # NestJS API & Database Operations (Port 3001)
│   ├── prisma/         # Database schemas and seed scripts
│   ├── src/            # Core business logic and controllers
│   └── ecosystem.config.js # PM2 deployment configuration
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14/15, React 19, Tailwind CSS v4, Zustand, TanStack Query, Shadcn/Radix UI.
- **Backend**: NestJS, TypeScript, PostgreSQL, Prisma ORM, JWT, bcrypt.
- **Infrastructure**: AWS EC2, PM2, GitHub Actions (CI/CD).

## 🚀 Setup & Installation Guide

### Prerequisites
- Node.js (v20+)
- PostgreSQL (v14+)
- Git

### 1. Development Setup
Clone the repository and install dependencies in their respective isolated environments:
```bash
git clone https://github.com/your-org/aescion.git
cd aescion

# Install Frontend ecosystem
cd Frontend
npm install

# Install Backend ecosystem
cd ../Backend
npm install
```

### 2. Environment Configuration
Copy the provided environment templates:
```bash
cp Frontend/.env.example Frontend/.env
cp Backend/.env.example Backend/.env
```
Ensure you set your PostgreSQL connection string in `Backend/.env` (`DATABASE_URL`).

### 3. Database Migration & Seeding
From the `Backend/` directory, generate the client, migrate, and securely seed the Super Admin:
```bash
cd Backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma db seed
```

## 💻 Development Commands

- **Run API (Backend)**: `cd Backend && npm run start:dev`
- **Run Admin (Frontend)**: `cd Frontend && npm run dev:admin`
- **Run Website (Frontend)**: `cd Frontend && npm run dev:website`
- **TypeScript Verification**: Run `npx tsc --noEmit` inside respective directories.
- **Linter**: Run `npm run lint` inside respective directories.

## 🌍 Production Setup (AWS EC2 + PM2)

This architecture utilizes a blazingly fast native Node.js runtime managed by PM2 cluster mode.

### Start via PM2
The PM2 configuration lives inside the `Backend/` directory and orchestrates the entire platform:
```bash
cd Backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### PM2 Commands
- **Check Status**: `pm2 status`
- **View Logs**: `pm2 logs`
- **Zero-Downtime Reload**: `pm2 reload ecosystem.config.js`

### CI/CD Pipeline
`.github/workflows/deploy.yml` automates the release:
- Lints and tests both `Frontend` and `Backend`.
- Executes isolated builds.
- Deploys to EC2 via SSH and triggers a PM2 zero-downtime reload.

---
*Developed for the AESCION Enterprise. See internal roadmap documentation for ERP and HRMS milestones.*
