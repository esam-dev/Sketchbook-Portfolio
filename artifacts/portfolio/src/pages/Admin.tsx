import { useState, useEffect } from "react";
import { format, isToday, isYesterday, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import NotificationBell from "@/components/admin/notification-bell";

type Submission = {
  id: string;
  payload: { name: string; phone: string; message: string };
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
            phone: item.payload?.phone || item.phone || "",
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
        payload: { name: item.payload?.name || item.name || "", phone: item.payload?.phone || item.phone || "", message: item.payload?.message || item.message || "" },
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
      <div className="w-screen h-screen overflow-hidden relative desktop-gradient flex items-center justify-center">
        <div className="panel-gradient h-[28px] flex items-center px-3 text-[12px] text-white fixed top-0 left-0 right-0 z-[1000]" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
          <span className="font-semibold">Admin Login</span>
        </div>
        <form onSubmit={handleLogin} className="bg-[#d4d0c8] border border-[#404040] shadow-[1px_1px_0px_#000] w-[350px]" style={{ animation: "window-open 0.15s ease-out" }}>
          <div className="titlebar-gradient flex items-center h-[26px] px-[3px]">
            <div className="flex-1 text-[12px] font-semibold text-white px-1 leading-[26px]">Admin Login</div>
          </div>
          <div className="p-6 bg-white m-[3px] mt-0 bevel-sunken">
            <h1 className="text-[18px] font-bold text-[#333] mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>ADMIN</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-2 py-1.5 text-[12px] bg-white bevel-sunken focus:outline-none mb-3"
              autoFocus
            />
            {error && <p className="text-[12px] text-[#cc0000] font-semibold mb-3">{error}</p>}
            <button type="submit" disabled={!password || loading} className="btn-bluecurve w-full py-2 font-bold text-[13px] disabled:opacity-50">
              {loading ? "LOADING..." : "ENTER"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative desktop-gradient flex flex-col">
      {/* Top panel */}
      <div className="panel-gradient h-[28px] flex items-center px-3 text-[12px] text-white shrink-0" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
        <span className="font-semibold">Admin - Messages</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button onClick={logout} className="h-[20px] px-3 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] text-black text-[11px] font-semibold hover:brightness-105">
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar list */}
        <div className="w-full sm:w-80 bg-[#ececec] border-r border-[#808080] overflow-y-auto bluecurve-scrollbar">
          {submissions.length === 0 && !loading && <p className="p-6 text-center text-[12px] text-[#888]">No messages yet</p>}
          {submissions.map((sub) => {
            const unread = !readIds.has(sub.id);
            return (
              <button key={sub.id} onClick={() => select(sub)} className={`w-full text-left px-3 py-2.5 border-b border-[#d0d0d0] hover:bg-[#e0e0e0] ${selected?.id === sub.id ? "bg-[#3366aa]/15" : ""}`}>
                <div className="flex items-start gap-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-[11px] font-bold text-white shrink-0 ${unread ? "bg-[#3366aa]" : "bg-[#888]"}`}>
                    {sub.payload.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className={`text-[12px] truncate ${unread ? "font-bold" : ""}`}>{sub.payload.name}</span>
                      <span className="text-[10px] text-[#888] ml-2 shrink-0">{formatDate(sub.createdAt)}</span>
                    </div>
                    <p className={`text-[11px] truncate ${unread ? "font-semibold" : "text-[#666]"}`}>{sub.payload.message}</p>
                  </div>
                </div>
              </button>
            );
          })}
          {loading && <p className="p-4 text-center text-[12px] text-[#888]">Loading...</p>}
        </div>

        {/* Detail pane */}
        <div className="hidden sm:flex flex-1 flex-col bg-[#ececec]">
          {selected ? (
            <div className="flex-1 overflow-y-auto p-4 bluecurve-scrollbar">
              <div className="bg-white bevel-sunken p-4 max-w-xl mx-auto">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#d0d0d0]">
                  <div className="w-10 h-10 bg-[#3366aa] flex items-center justify-center text-[14px] font-bold text-white shrink-0">
                    {selected.payload.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold">{selected.payload.name}</h2>
                    <a href={`tel:${selected.payload.phone}`} className="text-[11px] text-[#3366aa] hover:underline">{selected.payload.phone}</a>
                  </div>
                </div>
                <div className="bg-[#f8f8f8] bevel-sunken p-3 mb-3">
                  <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{selected.payload.message}</p>
                </div>
                <p className="text-[10px] text-[#888] text-right">{formatDetailDate(selected.createdAt)}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[14px] text-[#888]">Select a message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
