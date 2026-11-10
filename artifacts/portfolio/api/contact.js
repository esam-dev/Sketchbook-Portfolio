const FORMS_HUB_URL = "https://forms-hub-backend-production.up.railway.app/api/v1/submissions";

export default async function handler(req, res) {
  console.log("Contact API called, method:", req.method);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env["FORMS_HUB_API_KEY"];
  console.log("FORMS_HUB_API_KEY present:", !!apiKey);

  if (!apiKey) {
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

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
    const response = await fetch(FORMS_HUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        formName: "contacto",
        payload: { name, email, phone, message },
      }),
    });

    if (response.ok) {
      res.json({ success: true });
    } else {
      const text = await response.text().catch(() => "");
      console.error("Forms Hub error:", response.status, text);
      res.status(response.status).json({ error: "Upstream error", detail: text });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(502).json({ error: "Failed to reach forms service" });
  }
}
