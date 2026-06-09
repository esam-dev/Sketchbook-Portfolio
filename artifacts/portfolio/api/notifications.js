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
  } catch (err) {
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

  const { method } = req;

  if (method === "GET") {
    const parts = req.url?.split("/") || [];
    const last = parts[parts.length - 1]?.split("?")[0];
    if (last === "unread-count") {
      await proxyToFormshub(req, res, "/api/v1/notifications/unread-count");
      return;
    }
    await proxyToFormshub(req, res, "/api/v1/notifications");
    return;
  }

  if (method === "PATCH") {
    const isReadAll = req.url?.includes("read-all");
    if (isReadAll) {
      await proxyToFormshub(req, res, "/api/v1/notifications/read-all", "PATCH");
      return;
    }

    const parts = req.url?.split("/") || [];
    const idIndex = parts.indexOf("notifications") + 1;
    const id = idIndex > 0 && idIndex < parts.length ? parts[idIndex] : null;
    if (id) {
      await proxyToFormshub(req, res, `/api/v1/notifications/${id}/read`, "PATCH");
      return;
    }
    res.status(400).json({ error: "ID de notificación requerido" });
    return;
  }

  if (method === "DELETE") {
    const parts = req.url?.split("/") || [];
    const id = parts[parts.length - 1]?.split("?")[0];
    if (id && id !== "notifications") {
      await proxyToFormshub(req, res, `/api/v1/notifications/${id}`, "DELETE");
      return;
    }
    res.status(400).json({ error: "ID de notificación requerido" });
    return;
  }

  res.status(405).json({ error: "Método no permitido" });
}
