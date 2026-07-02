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

## Live

- **Storefront:** https://rakhistore-ten.vercel.app
- **Admin dashboard:** https://rakhistore-ten.vercel.app/admin/login
- **API:** https://rakhistore.onrender.com

## Deployment

- Frontend → Vercel, root directory `frontend`. `vercel.json` rewrites all
  routes to `index.html` so client-side routing (e.g. `/shop`, `/products/:slug`)
  works on direct navigation/refresh, not just in-app links.
- Backend → Render (Web Service), root directory `backend`, build command
  `npm install`, start command `npm start`. MongoDB Atlas must allow access
  from anywhere (`0.0.0.0/0`) since Render doesn't have static outbound IPs.

Environment variables must be configured on each platform's dashboard (see `.env.example` in each folder). `CLIENT_ORIGIN` on the backend must exactly match the deployed frontend URL (no trailing slash) for CORS to work.

### Known follow-ups before/at launch

- Real WhatsApp business number: currently a placeholder (`VITE_WHATSAPP_NUMBER`
  on Vercel). Update it once you have the number.
- 60 products were seeded from the provided photos into a single "Rakhi
  Collection" category with placeholder ₹299 pricing and generic names
  ("Rakhi Design NN") — reorganize into real categories/names/prices via
  the admin panel.
- `sitemap.xml` reflects the catalogue as of deploy time; regenerate it
  (see `docs/ARCHITECTURE.md` or re-run the generation approach used during
  deployment) after major catalogue changes for best SEO.
- Free-tier Render services sleep after inactivity — the first request
  after idle can take ~30-60s to wake up. Upgrade to a paid instance
  before the Raksha Bandhan traffic spike if that's a concern.
