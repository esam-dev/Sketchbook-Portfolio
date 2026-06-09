// Handles sub-paths:
//   GET    /api/notifications/unread-count
//   PATCH  /api/notifications/read-all
//   PATCH  /api/notifications/:id/read
//   DELETE /api/notifications/:id

const FORMSHUB_BASE =
  process.env["FORMS_HUB_BASE_URL"] ||
  "https://forms-hub-backend-production.up.railway.app";

function isAuthenticated(req) {
  const auth = req.headers["authorization"];
  const adminPassword = process.env["ADMIN_PASSWORD"];
  return !!(adminPassword && auth === `Bearer ${adminPassword}`);
}

async function proxyToFormshub(req, res, path, method = "GET", body) {
  const token = process.env["FORMS_HUB_TOKEN"];
  if (!token) {
    res.status(500).json({ error: "Server misconfiguration: FORMS_HUB_TOKEN not set" });
    return;
  }

  try {
    const fetchOpts = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    if (body && method !== "GET") {
      fetchOpts.body = JSON.stringify(body);
    }

    const response = await fetch(`${FORMSHUB_BASE}${path}`, fetchOpts);
    const text = await response.text();

    if (response.ok) {
      try {
        res.json(JSON.parse(text));
      } catch {
        res.json({ success: true });
      }
    } else {
      res.status(response.status).json({
        error: "Error del servicio de notificaciones",
        detail: text.substring(0, 500),
      });
    }
  } catch {
    res.status(502).json({ error: "Error al conectar con el servicio de notificaciones" });
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }

  // Vercel passes catch-all segments as req.query.path (array)
  // e.g. ["unread-count"] | ["read-all"] | ["abc123", "read"] | ["abc123"]
  const segments = Array.isArray(req.query.path) ? req.query.path : [req.query.path];
  const { method } = req;

  // GET /api/notifications/unread-count
  if (method === "GET" && segments.length === 1 && segments[0] === "unread-count") {
    await proxyToFormshub(req, res, "/api/v1/notifications/unread-count");
    return;
  }

  // PATCH /api/notifications/read-all
  if (method === "PATCH" && segments.length === 1 && segments[0] === "read-all") {
    await proxyToFormshub(req, res, "/api/v1/notifications/read-all", "PATCH");
    return;
  }

  // PATCH /api/notifications/:id/read
  if (method === "PATCH" && segments.length === 2 && segments[1] === "read") {
    const id = segments[0];
    await proxyToFormshub(req, res, `/api/v1/notifications/${id}/read`, "PATCH");
    return;
  }

  // DELETE /api/notifications/:id
  if (method === "DELETE" && segments.length === 1) {
    const id = segments[0];
    await proxyToFormshub(req, res, `/api/v1/notifications/${id}`, "DELETE");
    return;
  }

  res.status(404).json({ error: "Ruta no encontrada" });
}
