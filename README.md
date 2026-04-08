# bar-pdf-backend

Bar-only **intake** service for CID: `POST /submit-quote`, bundle render, and outbound email to carriers. The universal **operator** stack (poller, S4/S5/S6, dashboard, webhooks) remains on [`pdf-backend`](https://github.com/G-Love53/pdf-backend) / **CID-PDF-API** on Render.

## Status

This repo is scaffolded with a minimal HTTP server. Bar submit, `CID_HomeBase` templates (`SUPP_BAR`), and shared DB/R2 wiring will be ported from `pdf-backend` in a phased rollout.

## Run locally

```bash
cp .env.example .env   # fill values when wired
npm install
npm run dev
```

- Health: `GET /healthz`
- Root: `GET /` (service metadata)

## Environment

See `.env.example` when present. Production will mirror other segment backends (Supabase, R2, Gmail send, etc.) as routes are added.

## Related

- **Operator / CID-PDF-API:** `pdf-backend` — do not duplicate poller, S4–S6, or operator UI here.
