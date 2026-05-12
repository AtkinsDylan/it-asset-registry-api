# IT Asset Registry API

A RESTful API for managing IT assets, built with Node.js, Express, and PostgreSQL. Features full CRUD operations, asset assignment tracking, department and user management, and automatic audit logging.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **Validation:** express-validator

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repo
   git clone https://github.com/AtkinsDylan/it-asset-registry-api.git

2. Install dependencies
   npm install

3. Create a `.env` file in the root directory
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=it_assets
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=3000

4. Set up the database by running the SQL in `database.sql`

5. Start the server
   npm run dev

## API Endpoints

### Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /assets | Get all assets |
| GET | /assets/:id | Get asset by ID |
| POST | /assets | Create new asset |
| PUT | /assets/:id | Update asset |
| DELETE | /assets/:id | Delete asset |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create new user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

### Departments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /departments | Get all departments |
| GET | /departments/:id | Get department by ID |
| POST | /departments | Create new department |
| PUT | /departments/:id | Update department |
| DELETE | /departments/:id | Delete department |

### Audit Log

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /audit-log | Get all audit entries |

## Asset Status Values

- `available`
- `assigned`
- `under repair`
- `retired`