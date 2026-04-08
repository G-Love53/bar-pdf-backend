import "dotenv/config";
import cors from "cors";
import express from "express";

const PORT = Number(process.env.PORT) || 8787;
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

app.listen(PORT, () => {
  console.log(`[bar-pdf-backend] listening on :${PORT} segment=${SEGMENT}`);
});
