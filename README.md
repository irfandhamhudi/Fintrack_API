# FinTrack Backend

Backend REST API terpisah untuk FinTrack menggunakan Express, TypeScript, MongoDB/Mongoose, JWT cookie authentication, Cloudinary, dan cron worker recurring.

## Menjalankan

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

Isi `backend/.env` berdasarkan `backend/.env.example`. Jangan commit kredensial asli.

## Endpoint dasar

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET|POST /api/v1/wallets`
- `GET|POST /api/v1/categories`
- `GET|POST /api/v1/transactions`
- `GET|POST /api/v1/budgets`
- `GET|POST /api/v1/goals`
- `GET|POST /api/v1/recurring`
- `POST /api/v1/uploads`

Resource routes juga mendukung `GET /:id`, `PATCH /:id`, dan `DELETE /:id`. Semua resource membutuhkan autentikasi kecuali register/login.

## Struktur

- `src/models`: Mongoose schemas
- `src/views`: response formatter
- `src/controllers`: request handlers
- `src/routes`: API routes
- `src/services`: business logic dan recurring worker
- `src/config`: environment, database, Cloudinary
- `src/middleware`: auth, validation, upload, security
- `src/utils`: errors, async handler, API response
