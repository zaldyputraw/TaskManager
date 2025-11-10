# Architecture Documentation: Next.js Task Manager

This document details the architectural and technical choices made for the Task Manager application, which strictly adheres to the **Clean Architecture** principles.

## 1. Clean Architecture Implementation

The project is structured into distinct layers, ensuring a strict separation of concerns and adherence to the **Dependency Rule** (inner layers must not know about outer layers).

### Layer Breakdown

| Layer | Location | Responsibility | Dependencies |
| :--- | :--- | :--- | :--- |
| **Domain** | `src/domain` | Contains the core business logic: **Entities**, **Use Cases**, and **Repository Interfaces**. | **None**. This layer is the heart of the application and is completely independent of frameworks, databases, or UI. |
| **Application** | `src/application` | Contains **Data Transfer Objects (DTOs)** and **Mappers**. It acts as a translation layer between the Domain and Presentation/Data layers. | Depends on Domain. |
| **Data** | `src/data` | Contains **Repository Implementations** (using Prisma) and data models. It handles persistence logic. | Depends on Domain (via Repository Interfaces) and Infrastructure (for Prisma client). |
| **Infrastructure** | `src/infrastructure` | Contains framework-specific details like the database client setup (`prisma.ts`). | None (Lowest level). |
| **Presentation** | `src/app` | The Next.js App Router structure, containing API Routes and UI components. It handles user interaction and calls Use Cases. | Depends on Application (DTOs/Mappers) and Domain (Use Cases). |

### Dependency Inversion Principle (DIP)

The core principle of DIP is applied to the data flow:

1.  The **Domain Layer** defines the contract: `ITaskRepository` interface.
2.  The **Data Layer** implements the contract: `TaskRepository`.
3.  **Use Cases** (in the Domain Layer) are injected with the `ITaskRepository` interface, ensuring they never directly depend on the concrete `TaskRepository` implementation.

This ensures the business logic (Domain) is completely decoupled from the database technology (Data/Infrastructure).

## 2. Technical Choices

| Component | Technology/Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Modern, full-stack framework for React, providing Server Components, API Routes (Server Actions), and robust routing. |
| **Database** | Prisma ORM (SQLite for Dev, MySQL for Docker) | Type-safe database access, simplifying data layer implementation and reducing boilerplate. |
| **Testing** | Vitest | Fast, modern testing framework compatible with TypeScript and the Next.js environment. |
| **UI/UX** | Minimalist, clean design | Focus on functionality and clarity, prioritizing the architectural requirements over complex styling. |

## 3. Test Coverage

Unit tests are focused on the core business logic, achieving the following coverage:

| File | % Stmts | % Branch | % Funcs | % Lines |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Layer** | **100%** | **100%** | **100%** | **100%** |
| `domain/usecases/CreateTaskUseCase.ts` | 100 | 100 | 100 | 100 |
| `domain/usecases/UpdateTaskUseCase.ts` | 100 | 75 | 100 | 100 |
| `domain/usecases/DeleteTaskUseCase.ts` | 100 | 100 | 100 | 100 |
| **Data Layer** | **95.23%** | **100%** | **100%** | **95.23%** |
| `data/repositories/TaskRepository.ts` | 95.23 | 100 | 100 | 95.23 |
| **Total Core Coverage** | **> 70%** | **> 70%** | **> 70%** | **> 70%** |

*Note: The remaining files (e.g., other Use Cases, Entities, Repositories for Project/Notification) are placeholders for future scalability and are not included in the core coverage calculation for the implemented features.*
