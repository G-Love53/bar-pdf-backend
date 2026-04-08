# bar-pdf-backend

Bar-only **intake** service for CID: `POST /submit-quote`, `POST /render-bundle`, PDF generation from `CID_HomeBase` templates, and outbound Gmail. The universal **operator** stack (poller, S4/S5/S6, dashboard, webhooks) stays on [`pdf-backend`](https://github.com/G-Love53/pdf-backend) / **CID-PDF-API** on Render.

## Status

This repo includes the **`BAR_INTAKE`** bundle (`SUPP_BAR` + ACORD125/126/130/140), `recordSubmission` to Postgres, optional **`Client-Submission.pdf`** snapshot (HTML + R2), and the same carrier email behavior as the legacy Bar path on CID-PDF-API.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

- Health: `GET /healthz`
- Submit: `POST /submit-quote` with `bundle_id: "BAR_INTAKE"` and `segment: "bar"` (see `scripts/test-delivery-bar.sh`)
- Render-only: `POST /render-bundle` with `bundle_id` + `formData`

## Environment

Copy **`PUPPETEER_EXECUTABLE_PATH`**, **`DATABASE_URL`**, Gmail, and R2 settings from the **CID-PDF-API** Render service unless you intentionally split credentials. See `.env.example`.

## Related

- **Operator / CID-PDF-API:** `pdf-backend` — do not duplicate poller, S4–S6, or operator UI here.
- **Templates:** `CID_HomeBase` git submodule (`templates/SUPP_BAR`, ACORDs, `_SHARED`).
