# Database design (draft)

Target: **Supabase (PostgreSQL)**. All primary keys are **UUIDs**, so data can later be
moved to a distributed database without changing IDs. The TypeScript types in
`src/lib/types.ts` follow this schema.

```mermaid
erDiagram
    USERS ||--o{ PRODUCTS : "sells"
    USERS ||--o{ POSTS : "publishes"
    USERS ||--o{ THREADS : "writes"
    USERS ||--o{ ORDERS : "buys"
    USERS ||--o{ REVIEWS : "writes"
    PRODUCTS ||--o{ ORDERS : "ordered in"
    PRODUCTS |o--o{ POSTS : "featured in"
    POSTS ||--o{ COMMENTS : "has"
    THREADS ||--o{ COMMENTS : "has replies"
    ORDERS ||--o| REVIEWS : "reviewed by"

    USERS {
        uuid id PK
        text username UK
        text display_name
        text bio
        text location
        boolean verified
        timestamptz created_at
    }

    PRODUCTS {
        uuid id PK
        uuid seller_id FK
        text name
        integer price
        text unit
        integer stock
        text image_url
        text description
        date harvested_at
        boolean pickup
        boolean delivery
        timestamptz created_at
    }

    POSTS {
        uuid id PK
        uuid user_id FK
        uuid product_id FK "nullable"
        text caption
        text media_url
        text media_type "video | image"
        timestamptz created_at
    }

    THREADS {
        uuid id PK
        uuid user_id FK
        text text
        text tag "Harvest | Question | Event | Tips"
        text image_url
        timestamptz created_at
    }

    COMMENTS {
        uuid id PK
        uuid user_id FK
        uuid post_id FK "nullable"
        uuid thread_id FK "nullable"
        text text
        timestamptz created_at
    }

    ORDERS {
        uuid id PK
        uuid product_id FK
        uuid buyer_id FK
        uuid seller_id FK
        integer quantity
        text fulfillment "pickup | delivery"
        text note
        text status "requested | accepted | completed | declined"
        timestamptz created_at
    }

    REVIEWS {
        uuid id PK
        uuid order_id FK
        uuid reviewer_id FK
        uuid reviewee_id FK
        smallint score "1-5"
        text text
        timestamptz created_at
    }
```

## Notes

- **Likes** will be a separate table (`likes(user_id, post_id | thread_id)`), not a counter column,
  so a user can only like once.
- **Rating** (`User.rating`, `User.reviewCount` in the mock) will be computed from `REVIEWS`,
  and only reviews linked to a *completed* order count — this makes fake reviews harder.
- Row Level Security: users can only edit their own rows; sellers can only change the status of orders they received.
