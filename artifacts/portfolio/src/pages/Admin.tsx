import { useState, useEffect } from "react";
import { format, isToday, isYesterday, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import NotificationBell from "@/components/admin/notification-bell";

type Submission = {
  id: string;
  payload: { name: string; email?: string; phone: string; message: string };
  createdAt: string;
};

function formatDate(dateStr: string) {
  const date = parseISO(dateStr);
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return "Yesterday";
  if (differenceInDays(new Date(), date) < 7) return format(date, "EEEE");
  return format(date, "d/M/yy");
}

function formatDetailDate(dateStr: string) {
  const date = parseISO(dateStr);
  return format(date, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es });
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [readIds, setReadIds] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("admin_read") || "[]"));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem("admin_read", JSON.stringify([...readIds]));
  }, [readIds]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setLoggedIn(true);
      setPassword(token);
      fetchSubmissions(token);
    }
  }, []);

  async function fetchSubmissions(token: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const raw = Array.isArray(data) ? data : data.submissions || data.data || data.rows || [];
        const list = raw.map((item: any) => ({
          id: item.id || item._id,
          payload: {
            name: item.payload?.name || item.name || "",
            email: item.payload?.email || item.email || "", phone: item.payload?.phone || item.phone || "",
            message: item.payload?.message || item.message || "",
          },
          createdAt: item.createdAt || item.created_at || item.date || "",
        }));
        setSubmissions(list.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch { /* ignore */ } finally { setLoading(false); }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const loginRes = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!loginRes.ok) {
        const msg = await loginRes.json().catch(() => ({}));
        throw new Error(msg.error || "Wrong password");
      }
      localStorage.setItem("admin_token", password);
      const res = await fetch("/api/submissions", { headers: { Authorization: `Bearer ${password}` } });
      if (!res.ok) throw new Error("Error fetching messages");
      const data = await res.json();
      const raw = Array.isArray(data) ? data : data.submissions || data.data || data.rows || [];
      const list = raw.map((item: any) => ({
        id: item.id || item._id,
        payload: { name: item.payload?.name || item.name || "", email: item.payload?.email || item.email || "", phone: item.payload?.phone || item.phone || "", message: item.payload?.message || item.message || "" },
        createdAt: item.createdAt || item.created_at || item.date || "",
      }));
      setSubmissions(list.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoggedIn(true);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  }

  function select(sub: Submission) { setSelected(sub); setReadIds((prev) => new Set(prev).add(sub.id)); }

  function logout() {
    localStorage.removeItem("admin_token");
    setLoggedIn(false);
    setSelected(null);
    setPassword("");
    setSubmissions([]);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-6 py-20">
        <form onSubmit={handleLogin} className="card-minimal w-full max-w-sm p-8 shadow-[0_32px_64px_-32px_rgb(0_0_0/0.15)] animate-fade-up">
          <p className="eyebrow mb-3">Portfolio</p>
          <h1 className="text-2xl font-bold tracking-tight mb-6">Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-minimal mb-3"
            autoFocus
          />
          {error && <p className="text-sm text-destructive font-medium mb-3">{error}</p>}
          <button type="submit" disabled={!password || loading} className="btn-primary w-full">
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <span className="text-sm font-semibold tracking-tight">
            Admin <span className="text-muted-foreground font-normal">· Messages</span>
          </span>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <button
              onClick={logout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar list */}
        <div className="w-full sm:w-80 border-r border-border/60 bg-background overflow-y-auto">
          {submissions.length === 0 && !loading && (
            <p className="p-6 text-center text-sm text-muted-foreground">No messages yet</p>
          )}
          {submissions.map((sub) => {
            const unread = !readIds.has(sub.id);
            return (
              <button
                key={sub.id}
                onClick={() => select(sub)}
                className={`w-full text-left px-5 py-4 border-b border-border/60 transition-colors ${
                  selected?.id === sub.id ? "bg-secondary" : "hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    unread ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {sub.payload.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className={`text-sm truncate ${unread ? "font-semibold" : ""}`}>
                        {sub.payload.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {formatDate(sub.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {sub.payload.message}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
          {loading && <p className="p-6 text-center text-sm text-muted-foreground">Loading...</p>}
        </div>

        {/* Detail pane */}
        <div className="hidden sm:flex flex-1 flex-col bg-secondary/40">
          {selected ? (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="card-minimal p-6 max-w-xl mx-auto">
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border/60">
                  <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                    {selected.payload.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold tracking-tight">{selected.payload.name}</h2>
                    <a
                      href={selected.payload.email ? `mailto:${selected.payload.email}` : `tel:${selected.payload.phone}`}
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-colors"
                    >
                      {selected.payload.email || selected.payload.phone}
                    </a>
                  </div>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.payload.message}</p>
                <p className="text-[11px] text-muted-foreground text-right mt-4">
                  {formatDetailDate(selected.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Select a message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
