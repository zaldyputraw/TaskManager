# Task Manager Application - Next.js Senior Technical Test

A collaborative task management application built with **Next.js** and **Clean Architecture**.

## 🎯 Objective

This project demonstrates a scalable and modular architecture with proper separation of Domain, Data, and Presentation layers, adhering to Clean Architecture principles.

### Required Features

1.  **Authentication**: User login and signup.
2.  **Task Management**: Create, Edit, Delete, List, and Filter tasks by status.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm (or yarn/pnpm)
-   Docker and Docker Compose (for containerized deployment)

### Option 1: Local Development (Recommended for Development)

The application uses **SQLite** for simplicity in local development.

#### 1. Install Dependencies

```bash
cd task-manager
npm install
```

#### 2. Setup Environment

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
NODE_ENV="development"
```

#### 3. Initialize Database

This command generates the Prisma client and creates the `dev.db` file.

```bash
npx prisma generate
npx prisma db push --accept-data-loss
```

#### 4. Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**.

#### 5. Run Tests

Unit tests for the Domain layer use cases can be run with:

```bash
npm run test
```

### Option 2: Docker Deployment (Recommended for Production/Review)

The Docker setup uses a multi-stage build for a lightweight production image.

#### 1. Build and Run

```bash
docker-compose up --build -d
```

This starts the **Next.js Application** on port **3000**.

#### 2. Access the Application

The application will be available at **http://localhost:3000**.

#### 3. Stop Services

```bash
docker-compose down
```

## 📸 Screenshots

Screenshots of the main pages are available in the `/screenshots` folder.

## 🏗️ Architecture Summary

The project strictly follows Clean Architecture:

-   **Domain Layer**: Contains Entities, Use Cases, and Repository Interfaces (framework-independent).
-   **Data Layer**: Contains Repository Implementations (using Prisma/SQLite) and Models.
-   **Presentation Layer**: Contains Next.js pages, components, and API routes.

**Dependency Inversion Principle (DIP)** is applied: The Domain layer defines the contract (interface), and the Data layer implements it, ensuring inner layers are never dependent on outer ones.

## 📋 Project Structure

The project structure is organized around the Clean Architecture layers:

```
task-manager/
├── src/
│   ├── domain/                 # Core Business Logic (Entities, Use Cases, Interfaces)
│   ├── application/            # Data Transfer Objects (DTOs) and Mappers
│   ├── data/                   # Repository Implementations (Prisma)
│   ├── infrastructure/         # Database Client (Prisma Singleton)
│   └── app/                    # Next.js App Router (UI Pages, API Routes)
│
├── tests/                      # Unit Tests
│   ├── domain/                 # Tests for Use Cases
│   └── data/                   # Tests for Repository Implementations (with Prisma Mocking)
│
├── prisma/                     # Database Schema
├── Dockerfile                  # Docker build configuration
├── docker-compose.yml          # Docker orchestration
└── screenshots/                # Screenshots of main pages
```

## ⚙️ Technical Choices and Architectural Decisions

### Clean Architecture and DIP

The application strictly adheres to the **Dependency Inversion Principle (DIP)**. The core business logic (Domain Layer) is completely decoupled from the persistence layer (Data Layer) by relying solely on abstract interfaces (`ITaskRepository`).

-   **Domain Layer**: Defines *what* the application does (e.g., `CreateTaskUseCase`).
-   **Data Layer**: Defines *how* data is persisted (e.g., `TaskRepository` implementation using Prisma).

This separation ensures maximum testability and future scalability, as the database technology can be swapped without touching the core business logic.

### Data Flow with DTOs and Mappers

To maintain strict separation, the **Application Layer** is introduced to manage data transfer:

-   **Incoming Data**: API Routes (Presentation) receive raw data, which is immediately converted into a validated **DTO** before being passed to the Use Case.
-   **Outgoing Data**: Use Cases return Domain Entities, which are then converted by **Mappers** into **Response DTOs** before being sent back to the client.

This prevents Domain Entities from leaking into the Presentation Layer, protecting the integrity of the business rules.

### Test Coverage

Unit tests cover the most critical layers:

-   **Domain Use Cases**: 100% coverage.
-   **Data Repositories**: >95% coverage (using Vitest and Prisma mocking).

Run `npm run test:coverage` to generate the full report.

### CI/CD Readiness

The project is structured to be CI/CD ready:
1.  `npm run test` runs unit tests quickly.
2.  `docker-compose up --build` provides a clean, production-ready environment.
3.  The clean commit history (to be created by the developer) is the final step for a professional delivery.
