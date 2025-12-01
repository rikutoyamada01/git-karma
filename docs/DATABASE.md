# Database Schema

We use PostgreSQL as our primary database and Prisma as our ORM.

## ER Diagram

```mermaid
erDiagram
    User ||--o{ Account : "has"
    User ||--o{ Session : "has"
    User ||--o{ Transaction : "sent"
    User ||--o{ Transaction : "received"

    User {
        String id PK
        String name
        String email
        Int karma
        DateTime createdAt
        DateTime updatedAt
    }

    Account {
        String id PK
        String userId FK
        String provider
        String providerAccountId
    }

    Session {
        String id PK
        String userId FK
        String sessionToken
    }

    Repository {
        String id PK
        Int githubId
        String name
        String url
    }

    Transaction {
        String id PK
        Int amount
        String fromUserId FK
        String toUserId FK
        DateTime createdAt
    }
```

## Key Models

### User
The central entity. Stores profile information and current Karma balance.
- `karma`: The user's current karma points (default 0).

### Transaction
Records the flow of Karma between users.
- `fromUser`: The user giving Karma.
- `toUser`: The user receiving Karma.
- `amount`: The amount of Karma transferred.

### Repository
Stores information about GitHub repositories registered on the platform.
