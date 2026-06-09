import { useState, useEffect } from "react";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  differenceInDays,
} from "date-fns";
import { es } from "date-fns/locale";

type Submission = {
  id: string;
  payload: {
    name: string;
    phone: string;
    message: string;
  };
  createdAt: string;
};

function formatDate(dateStr: string) {
  const date = parseISO(dateStr);
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return "Ayer";
  if (differenceInDays(new Date(), date) < 7)
    return format(date, "EEEE", { locale: es });
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

  async function fetchSubmissions() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || "Error fetching submissions");
      }
      const data = await res.json();
      console.log("Submissions raw data:", data);
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
      setSubmissions(
        list.sort(
          (a: Submission, b: Submission) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err: any) {
      console.error("Parse error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || "Wrong password");
      }
      const data = await res.json();
      console.log("Submissions raw data:", data);
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
      setSubmissions(
        list.sort(
          (a: Submission, b: Submission) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      setLoggedIn(true);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function select(sub: Submission) {
    setSelected(sub);
    setReadIds((prev) => new Set(prev).add(sub.id));
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <h1 className="text-3xl font-archivo font-black uppercase mb-6 text-center">
            Admin
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border-4 border-black p-3 text-xl font-archivo font-bold uppercase mb-4 focus:outline-none focus:ring-4 focus:ring-[#18a0fb]"
            autoFocus
          />
          {error && (
            <p className="text-red-600 font-archivo font-bold mb-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={!password || loading}
            className="w-full py-3 bg-[#29c46a] text-black border-4 border-black font-archivo font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#18a0fb] hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "LOADING..." : "ENTER"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black bg-white px-4 py-3 flex items-center justify-between shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-2xl font-archivo font-black uppercase">Mensajes</h1>
        <button
          onClick={() => {
            setLoggedIn(false);
            setSelected(null);
            setPassword("");
          }}
          className="font-archivo font-bold uppercase text-sm px-4 py-2 border-2 border-black hover:bg-red-500 hover:text-white transition-all"
        >
          Salir
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat list */}
        <div className="w-full sm:w-80 md:w-96 border-r-4 border-black overflow-y-auto bg-white">
          {submissions.length === 0 && !loading && (
            <p className="p-6 text-center font-patrick text-xl text-gray-400">
              No hay mensajes aún
            </p>
          )}
          {submissions.map((sub) => {
            const unread = !readIds.has(sub.id);
            return (
              <button
                key={sub.id}
                onClick={() => select(sub)}
                className={`w-full text-left px-4 py-3 border-b-2 border-black hover:bg-gray-50 transition-all ${
                  selected?.id === sub.id ? "bg-[#18a0fb]/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-archivo font-black text-white text-sm flex-shrink-0 ${
                      unread ? "bg-[#29c46a]" : "bg-gray-400"
                    }`}
                  >
                    {sub.payload.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span
                        className={`font-archivo font-bold truncate ${
                          unread ? "text-black" : "text-gray-600"
                        }`}
                      >
                        {sub.payload.name}
                      </span>
                      <span className="text-xs font-archivo text-gray-400 flex-shrink-0 ml-2">
                        {formatDate(sub.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {unread && (
                        <span className="w-2 h-2 rounded-full bg-[#29c46a] flex-shrink-0" />
                      )}
                      <p
                        className={`text-sm truncate ${
                          unread ? "font-bold text-black" : "text-gray-500"
                        }`}
                      >
                        {sub.payload.message}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          {loading && (
            <p className="p-4 text-center font-archivo text-gray-400">
              Loading...
            </p>
          )}
        </div>

        {/* Detail / empty state */}
        <div className="hidden sm:flex flex-1 flex-col bg-[#e5ddd5]">
          {selected ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xl mx-auto">
                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-black">
                    <div className="w-14 h-14 rounded-full bg-[#29c46a] flex items-center justify-center font-archivo font-black text-white text-xl">
                      {selected.payload.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-archivo font-black">
                        {selected.payload.name}
                      </h2>
                      <a
                        href={`tel:${selected.payload.phone}`}
                        className="text-sm font-archivo text-[#18a0fb] hover:underline"
                      >
                        {selected.payload.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 border-black p-4 mb-4">
                    <p className="font-patrick text-xl leading-relaxed whitespace-pre-wrap">
                      {selected.payload.message}
                    </p>
                  </div>

                  <p className="text-xs font-archivo text-gray-400 text-right">
                    {formatDetailDate(selected.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-patrick text-2xl text-gray-400">
                Selecciona un mensaje
              </p>
            </div>
          )}
        </div>

        {/* Mobile detail (full screen) */}
        {selected && (
          <div className="sm:hidden fixed inset-0 z-50 bg-[#e5ddd5] flex flex-col">
            <header className="border-b-4 border-black bg-white px-3 py-2 flex items-center gap-3 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => setSelected(null)}
                className="font-archivo font-black text-lg"
              >
                ←
              </button>
              <div className="w-8 h-8 rounded-full bg-[#29c46a] flex items-center justify-center font-archivo font-black text-white text-xs">
                {selected.payload.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-archivo font-black truncate">
                  {selected.payload.name}
                </p>
                <p className="text-xs font-archivo text-gray-400">
                  {selected.payload.phone}
                </p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white border-2 border-black p-4 max-w-xs ml-auto">
                <p className="font-patrick text-lg whitespace-pre-wrap">
                  {selected.payload.message}
                </p>
                <p className="text-xs font-archivo text-gray-400 text-right mt-2">
                  {formatDate(selected.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
