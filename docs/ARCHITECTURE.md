# Architecture

## Overview

Rakhi Store is a two-part monorepo: a React storefront/admin SPA (`frontend/`) and an Express REST API (`backend/`). There is no online payment — the product detail page builds a `wa.me` deep link with a pre-filled order message, and WhatsApp handles the rest of the conversation.

## Database Schema (MongoDB Atlas, Mongoose)

### Admin
| Field | Type | Notes |
|---|---|---|
| name | String | |
| email | String | unique, lowercase |
| passwordHash | String | bcrypt |
| role | String | default `admin` |
| createdAt / updatedAt | Date | |

### Category
| Field | Type | Notes |
|---|---|---|
| name | String | |
| slug | String | unique, auto-generated from name |
| description | String | optional |
| image | `{ url, publicId }` | optional |
| isActive | Boolean | default true |
| createdAt / updatedAt | Date | |

New categories created via the admin panel appear on the storefront automatically — the frontend always fetches categories from the API, never hardcodes them.

### Product
| Field | Type | Notes |
|---|---|---|
| name | String | |
| slug | String | unique, auto-generated |
| description | String | |
| price | Number | |
| originalPrice | Number | optional, used to derive a discount badge |
| category | ObjectId → Category | |
| images | `[{ url, publicId }]` | Cloudinary |
| tags | `[String]` | |
| featured | Boolean | default false |
| newArrival | Boolean | default false |
| availability | Boolean | default true (in stock) |
| sku | String | auto-generated, e.g. `RKH-0001` |
| createdAt / updatedAt | Date | |

Indexes: unique `slug`, text index on `name` + `tags` for search, index on `category` for filtering.

## API Endpoints

### Public
- `GET /api/products` — query: `search, category, sort(price_asc|price_desc|newest|featured), featured, newArrival, availability, page, limit`
- `GET /api/products/:slug`
- `GET /api/products/:id/related`
- `GET /api/categories`
- `GET /api/categories/:slug`

### Auth
- `POST /api/auth/login` — sets httpOnly JWT cookie
- `GET /api/auth/me` — protected
- `POST /api/auth/logout`

### Admin — Products (protected)
- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `POST /api/admin/products/:id/duplicate`
- `POST /api/admin/products/bulk-delete` — body `{ ids: [] }`

### Admin — Categories (protected)
- `POST /api/admin/categories`
- `PUT /api/admin/categories/:id`
- `DELETE /api/admin/categories/:id`

### Admin — Upload / Dashboard (protected)
- `POST /api/admin/upload` — multipart, streams to Cloudinary, returns `{ url, publicId }`
- `GET /api/admin/stats` — totals + recent products

Cross-cutting middleware: `helmet`, `cors` (locked to `CLIENT_ORIGIN`), `express-rate-limit`, `express-mongo-sanitize`, centralized error handler, `express-validator` on every write route.

## Design System

- Palette: Saffron `#FF9933`, Deep Maroon `#7A1F2B`, Royal Gold `#D4AF37`, Cream `#FFF8ED`, Warm Beige `#F3E5D3`, Soft Orange `#FFB366`.
- Fonts: `Marcellus` (headings), `Poppins` (body).
- Dark mode: Tailwind class-based variant (`.dark`), toggled and persisted client-side.
