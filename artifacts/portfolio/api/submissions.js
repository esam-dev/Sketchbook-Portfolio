const FORMS_HUB_SUBMISSIONS_URL =
  "https://forms-hub-backend-production.up.railway.app/api/v1/projects/6e392e9d-ecf2-4c39-bb5f-730248cb2fc3/submissions";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const auth = req.headers["authorization"];
  const adminPassword = process.env["ADMIN_PASSWORD"];

  if (!adminPassword || auth !== `Bearer ${adminPassword}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const formsToken = process.env["FORMS_HUB_TOKEN"];

  if (!formsToken) {
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  try {
    const response = await fetch(FORMS_HUB_SUBMISSIONS_URL, {
      headers: { Authorization: `Bearer ${formsToken}` },
    });

    const text = await response.text();
    console.log("Forms Hub status:", response.status);
    console.log("Forms Hub raw response:", text.substring(0, 500));

    if (response.ok) {
      const data = JSON.parse(text);
      res.json(data);
    } else {
      res.status(response.status).json({ error: "Upstream error", detail: text.substring(0, 500) });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(502).json({ error: "Failed to reach forms service" });
  }
}
