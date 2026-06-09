import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    res.status(400).json({ error: "name, phone and message are required" });
    return;
  }

  const apiKey = process.env["FORMS_HUB_API_KEY"];

  if (!apiKey) {
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  try {
    const response = await fetch(
      "https://forms-hub-backend-production.up.railway.app/api/v1/submissions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          formName: "contacto",
          payload: { name, phone, message },
        }),
      },
    );

    if (response.ok) {
      res.json({ success: true });
    } else {
      const text = await response.text().catch(() => "");
      res.status(response.status).json({ error: "Upstream error", detail: text });
    }
  } catch {
    res.status(502).json({ error: "Failed to reach forms service" });
  }
});

export default router;
