import { Router, type IRouter, type Request, type Response } from "express";

const FORMSHUB_BASE =
  process.env["FORMS_HUB_BASE_URL"] ||
  "https://forms-hub-backend-production.up.railway.app";

const router: IRouter = Router();

function isAuthenticated(req: Request): boolean {
  const auth = req.headers["authorization"];
  const adminPassword = process.env["ADMIN_PASSWORD"];
  return !!(adminPassword && auth === `Bearer ${adminPassword}`);
}

async function proxyToFormshub(
  req: Request,
  res: Response,
  path: string,
  method: string = "GET",
  body?: unknown,
) {
  const token = process.env["FORMS_HUB_TOKEN"];
  if (!token) {
    res.status(500).json({ error: "Server misconfiguration: FORMS_HUB_TOKEN not set" });
    return;
  }

  try {
    const fetchOpts: RequestInit = {
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

router.get("/notifications", (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  proxyToFormshub(req, res, "/api/v1/notifications");
});

router.get("/notifications/unread-count", (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  proxyToFormshub(req, res, "/api/v1/notifications/unread-count");
});

router.patch("/notifications/read-all", (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  proxyToFormshub(req, res, "/api/v1/notifications/read-all", "PATCH");
});

router.patch("/notifications/:id/read", (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  proxyToFormshub(req, res, `/api/v1/notifications/${req.params.id}/read`, "PATCH");
});

router.delete("/notifications/:id", (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  proxyToFormshub(req, res, `/api/v1/notifications/${req.params.id}`, "DELETE");
});

export default router;
