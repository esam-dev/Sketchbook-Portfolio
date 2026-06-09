export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { password } = req.body;
  const adminPassword = process.env["ADMIN_PASSWORD"];

  if (!adminPassword) {
    res.status(500).json({ error: "Error de configuración del servidor" });
    return;
  }

  if (password !== adminPassword) {
    res.status(401).json({ error: "Contraseña incorrecta" });
    return;
  }

  res.json({ success: true });
}
