import { Router, type IRouter } from "express";
import { saveLead } from "../lib/leads";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !message || (!email && !phone)) {
    res.status(400).json({ error: "name, message and email (or phone) are required" });
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "invalid email" });
    return;
  }
  if (name.length > 120 || email.length > 200 || phone.length > 40 || message.length > 5000) {
    res.status(400).json({ error: "field too long" });
    return;
  }

  try {
    await saveLead({ name, email, phone, message });
  } catch {
    res.status(500).json({ error: "Could not save message" });
    return;
  }

  // Opcional: reenviar a Forms Hub si hay clave configurada.
  const apiKey = process.env["FORMS_HUB_API_KEY"];
  if (apiKey) {
    fetch("https://forms-hub-backend-production.up.railway.app/api/v1/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ formName: "contacto", payload: { name, email, phone, message } }),
    }).catch(() => undefined);
  }

  res.json({ success: true });
});

export default router;
