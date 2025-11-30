# [Next Write](https://nextwrite.redesu.com.br/)

![Main page](https://i.imgur.com/vgNQBcA.png)

A full-stack tech blog built with **Node.js**, **Express**, **PostgreSQL** (backend) and **Next.js**, **Radix UI** (frontend).

## You can find a live version [HERE](https://nextwrite.redesu.com.br/)
---

## Features

- Use authentication with email and password
![Login Screenshot](https://i.imgur.com/GlkLkMJ.png)
- Blog posts with infinite scrolling
![Infinite Scrolling](https://i.imgur.com/KwqowTz.gif)
- Edit and Delete posts (auth required)
![CRUD Screenshot](https://i.imgur.com/m6z5aHl.png)
- Create comments and reply to other comments!
![Comment Screenshot](https://i.imgur.com/qYMnrss.png)



---

## Monorepo Structure

```
.
├── backend/         # Express.js + PostgreSQL API
└── next-write/     # Next.js + Radix UI
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL instance (local or cloud)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/Redesu/NextWrite
cd NextWrite
```

### 2. Setup the Backend

```sh
cd backend
cp .env.example .env   # Create your .env file

npm install
npm run dev            # or: npm start
```
> [!WARNING]  
> Make sure your PostgreSQL instance is running! Check the schematic script in the last step.

**Backend Environment Variables (`backend/.env`):**
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=how_long_the_token_expires
REFRESH_TOKEN_EXPIRES_IN=how_long_the_refresh_token_expires
COOKIE_EXPIRES_IN=how_long_the_cookie_expires
```

### 3. Setup the Frontend

```sh
cd ../next-write
cp .env.local.example .env.local   # Create your .env.local file
npm install
npm run dev
```

**Frontend Environment Variables (`next-write/.env.local`):**
```
NEXT_PUBLIC_API_URL=your_api_url
```

### 4. Create the Schematic in your PostgreSQL instance 
The database uses the following schematic
![Schema ERD](https://i.imgur.com/aovjbZN.png)

Create the database schema using the script in script.sql in the root of the backend folder.

---

## Usage

- Visit [http://localhost:3000](http://localhost:3000) to use the app.
- Login or register to start posting and commenting.

---

## API Endpoints

See [`backend/routes`](backend/src/routes/) for all available endpoints.

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `POST /api/auth/logout` – Logout user
- `POST /api/auth/refresh-token` – Refresh token (auth required)
- `GET /api/auth/me` – Get user info (auth required)

- `POST /api/comments/:postSlug` – Add comment (auth required)
- `GET /api/comments/:postSlug` – List comments from a post

- `POST /api/posts/:postSlug` - Add a new post (auth required)
- `GET /api/posts` - List all posts
- `GET /api/posts/:postSlug` - Get a single post
- `PUT /api/posts/:postSlug` - Edit a post (auth required)
- `DELETE /api/posts/:postSlug` - Delete a post (auth required)

---

## Testing

The backend is covered by automated tests using **Jest**. The test suite includes both unit tests for controllers and integration tests for routes.

### Test Structure

```text
└───test
    ├───integration
    │   └───routes
    └───unit
        └───controllers
            ├───auth
            ├───comments
            ├───middleware
            └───posts
```

### Running Tests

To run the full test suite, navigate to the backend directory and run the test command:

```sh
cd backend
npm test
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
