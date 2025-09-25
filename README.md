# Blog_website

# Blog Website (Full‑Stack)

A full‑stack blogging application with a React (Vite) frontend, Node/Express REST API backend, and an optional mobile client. This README documents the project, local setup, API endpoints, how AI was used during development, submission checklist and evaluation mapping.

---

## Project overview

This repository contains a full-stack blog platform that supports:

- User registration and authentication
- Create / Read / Update / Delete blog posts
- Likes and comments on posts (persistent)
- Profile / account pages showing a user's posts
- Authorization: only the blog owner can edit/delete their posts
- REST API backend (MongoDB + Mongoose)
- Web frontend built with React + Vite


Repository structure (top-level):

- `backend/` — Express server, routes, Mongoose models
- `frontend/` — web client (Vite project in `frontend/vite-project`)

---

## Features (high level)

- Authentication (sign up / login)
- Blog CRUD (title, excerpt, content, tags, image)
- Persistent likes and comments
- Profile page listing the logged-in user's posts
- API endpoints documented below
- Basic UI components (cards, hero section, navbar)

---

## Quick setup

> These commands assume you are in the repository root.

1) Backend


cd .\backend
# install dependencies if needed
npm installed
#create a .env file with MONGO_URI and optionally PORT
#Example .env:
#MONGO_URI=mongodb://localhost:27017/blogdb
#PORT=5000
npm start
```

2) Frontend (web)

cd .\frontend\vite-project
npm install
npm run dev
# open the local dev url shown (usually http://localhost:5173)
```



---

## Environment variables

Example `.env` for backend (place in `backend/.env`):

```
MONGO_URI=<your mongo connection string>
PORT=5000

```

Keep secrets out of source control. Use GitHub Secrets for deployment.

---

## API reference (short)

Base path: `http://localhost:5000/api`

Auth (examples; check `backend/routes/auth.js`):
- `POST /api/auth/register` — Register user (body: {firstName, lastName, email, password})
- `POST /api/auth/login` — Login (body: {email, password}) — returns user object or token

Blogs (check `backend/routes/blogRoutes.js`):
- `GET /api/blogs` — Get all blogs
- `POST /api/blogs` — Create a blog (body: { title, excerpt, content, tags, image, author })
- `GET /api/blogs/:id` — Get single blog by id
- `PUT /api/blogs/:id` — Update blog (owner-only)
- `DELETE /api/blogs/:id` — Delete blog (owner-only)
- `POST /api/blogs/:id/like` — Increment like counter
- `POST /api/blogs/:id/comment` — Add a comment (body: { comment })
- `GET /api/blogs/user/:id` — Get all blogs for a specific user

Notes:
- The project uses Mongoose models where `author` is stored as an ObjectId reference to the User collection. When creating a blog, ensure `author` is the user's `_id`.

Optional: export a Postman collection or OpenAPI doc and add it under `/docs`.

---

## How frontend expects user info

The web client stores the logged-in user object in `localStorage` under the key `user`. Typical expected shape:

```json
{
	"_id": "60...",
	"firstName": "Rohan",
	"lastName": "Jimani",
	"email": "you@example.com",
	...
}
```

The account page fetches the user's blogs with `GET /api/blogs/user/:id` using `storedUser._id` from `localStorage`. If blog posts don't show:
- Verify `storedUser._id` exists and matches blog documents' `author` field in the DB.
- Ensure blog creation sets `author` to the logged-in user id.

---

## Running & testing tips

- Use the browser devtools network tab to confirm `GET /api/blogs/user/:id` returns the expected data.
- If you see 404s for routes like `/api/blogs/:id/like`, check the backend router order. Routes with `/user/:id` should not be shadowed by generic `/:id` handlers.
- To inspect data directly, connect to MongoDB (Compass or `mongo` shell) and query the `blogs` collection.

---

## Security & best practices applied

- Store database credentials and JWT secrets in `.env` and never commit them.
- Use HTTPS in production and secure cookies / proper CORS configuration.
- Ensure passwords are hashed server-side (bcrypt) and that JWT tokens or sessions are used for auth.
- Validate and sanitize incoming data on the server.

---

## How AI was used (transparent disclosure)

AI tools used during development:
- ChatGPT / Copilot / Code-completion tools were used to accelerate development of routes, frontend components, and unit tests.
- Examples of where AI helped:
	- Drafting route handlers for likes/comments and resolving route order to avoid 404s
	- Generating React component skeletons and small UI fix suggestions
	- Producing this README and suggested prompts

Prompting techniques and examples):
- Iterative prompts with context: "I have a Node/Express route that returns 404 for `/like` — here's my `routes/blogRoutes.js` content, please fix route order and show the corrected file."  
- Small targeted prompts: "Create a React account page that fetches `/api/blogs/user/:id` and displays the user's posts."  
- Verification prompts: "Given this frontend fetch call, what DB documents should look like to return matching results?"

Notes on responsible AI use:
- AI was used to generate suggestions and templates, but all code was reviewed and adapted by the developer.
- No proprietary code from closed-source projects was copied verbatim.

---

## Challenges faced

- Route matching order caused 404s (fixed by reordering `/user/:id` before `/:id`).
- Ensuring `author` ObjectId consistency between created posts and the logged-in user.
- UI state synchronization for likes/comments (local state vs server state) — solved by updating server-side counters and re-fetching relevant data.



