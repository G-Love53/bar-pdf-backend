import "dotenv/config";
import cors from "cors";
import express from "express";

// Render (and most PaaS) require listening on 0.0.0.0 and process.env.PORT.
const PORT = process.env.PORT ?? "8787";
const HOST = process.env.HOST ?? "0.0.0.0";
const SEGMENT = String(process.env.SEGMENT || "bar").trim().toLowerCase();

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true, segment: SEGMENT });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "bar-pdf-backend",
    segment: SEGMENT,
    note: "Bar intake scaffold; submit-quote and render paths to be added from pdf-backend.",
  });
});

app.listen(Number(PORT), HOST, () => {
  console.log(
    `[bar-pdf-backend] listening on http://${HOST}:${PORT} segment=${SEGMENT}`,
  );
});
