const FORMS_HUB_URL = "https://forms-hub-backend-production.up.railway.app/api/v1/submissions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env["FORMS_HUB_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  const { name, phone, message } = req.body;
  if (!name || !phone || !message) {
    res.status(400).json({ error: "name, phone and message are required" });
    return;
  }

  try {
    const response = await fetch(FORMS_HUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        formName: "contacto",
        payload: { name, phone, message },
      }),
    });

    if (response.ok) {
      res.json({ success: true });
    } else {
      const text = await response.text().catch(() => "");
      res.status(response.status).json({ error: "Upstream error", detail: text });
    }
  } catch {
    res.status(502).json({ error: "Failed to reach forms service" });
  }
}
