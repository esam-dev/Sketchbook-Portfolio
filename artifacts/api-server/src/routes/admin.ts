import { timingSafeEqual } from "node:crypto";
import { Router, type IRouter, type Request } from "express";
import { listLeads } from "../lib/leads";

const router: IRouter = Router();

function matches(candidate: unknown): boolean {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected || typeof candidate !== "string") return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const bearer = (req: Request) => req.headers.authorization?.replace(/^Bearer\s+/i, "");

router.post("/login", (req, res) => {
  if (!process.env["ADMIN_PASSWORD"]) {
    res.status(503).json({ error: "ADMIN_PASSWORD no está configurada" });
    return;
  }
  if (!matches(req.body?.password)) {
    res.status(401).json({ error: "Contraseña incorrecta" });
    return;
  }
  res.json({ success: true });
});

router.get("/submissions", async (req, res) => {
  if (!matches(bearer(req))) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  res.json({ submissions: await listLeads() });
});

export default router;
