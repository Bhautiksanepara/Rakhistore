# Rakhi Store

A premium Raksha Bandhan catalogue website. Customers browse Rakhis and place orders directly via WhatsApp — no online payment. Includes an admin dashboard for managing products and categories.

## Stack

- **Frontend:** React (Vite), Tailwind CSS v4, React Router, Framer Motion, Lucide Icons, React Hook Form — deployed on Vercel
- **Backend:** Node.js, Express — deployed on Render
- **Database:** MongoDB Atlas
- **Image storage:** Cloudinary (URLs only stored in MongoDB)
- **Auth:** JWT + bcrypt

## Structure

```
rakhi-store/
├── frontend/   # React storefront + admin UI
├── backend/    # Express REST API
└── docs/       # Architecture notes, API reference
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full architecture, database schema, and API reference.

## Local development

**Backend**
```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, Cloudinary keys, JWT secret
npm install
npm run seed            # creates the admin account + sample data
npm run dev              # http://localhost:5000
```

**Frontend**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

## Deployment

- Frontend → Vercel, root directory `frontend`
- Backend → Render (Web Service), root directory `backend`, build command `npm install`, start command `npm start`

Environment variables must be configured on each platform's dashboard (see `.env.example` in each folder).
