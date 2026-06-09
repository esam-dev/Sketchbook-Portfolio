import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useNotifications } from "@/hooks/use-notifications";
import { notificationTypeConfig } from "@/lib/notifications";
import type { Notification } from "@/lib/notifications";

type Filter = "all" | "unread" | "read";

function formatDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), "d 'de' MMMM 'a las' HH:mm", { locale: es });
  } catch {
    return dateStr;
  }
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [, navigate] = useLocation();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh,
  } = useNotifications();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const handleMarkRead = useCallback(
    async (n: Notification) => {
      if (!n.read) await markAsRead(n.id);
    },
    [markAsRead],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteNotification(id);
    },
    [deleteNotification],
  );

  const handleMarkAllRead = useCallback(async () => {
    await markAllAsRead();
  }, [markAllAsRead]);

  const filterBtn = (value: Filter, label: string) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-3 py-1.5 font-archivo font-bold text-xs uppercase border-2 border-black transition-all ${
        filter === value
          ? "bg-black text-white"
          : "bg-white text-black hover:bg-gray-100"
      }`}
    >
      {label}
      {value === "unread" && unreadCount > 0 && (
        <span className="ml-1.5 text-[10px]">({unreadCount})</span>
      )}
    </button>
  );

  if (!localStorage.getItem("admin_token")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b-4 border-black bg-white px-4 py-3 flex items-center justify-between shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <a
            href="/admin"
            className="font-archivo font-black text-lg hover:text-[#18a0fb] transition-colors"
          >
            ←
          </a>
          <h1 className="text-2xl font-archivo font-black uppercase">
            Notificaciones
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="font-archivo font-bold uppercase text-xs px-3 py-1.5 border-2 border-[#29c46a] text-[#29c46a] hover:bg-[#29c46a] hover:text-white transition-all"
            >
              Marcar todas le\u00eddas
            </button>
          )}
          <a
            href="/admin"
            className="font-archivo font-bold uppercase text-sm px-4 py-2 border-2 border-black hover:bg-red-500 hover:text-white transition-all"
          >
            Volver
          </a>
        </div>
      </header>

      <div className="px-4 py-3 bg-white border-b-2 border-black flex items-center gap-2">
        {filterBtn("all", "Todas")}
        {filterBtn("unread", "No le\u00eddas")}
        {filterBtn("read", "Le\u00eddas")}
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {loading && (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 border-2 border-gray-200 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <p className="font-patrick text-xl text-red-500 mb-4">{error}</p>
            <button
              onClick={refresh}
              className="font-archivo font-bold uppercase text-sm px-4 py-2 border-2 border-black hover:bg-[#18a0fb] hover:text-white transition-all"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center mb-4">
              <span className="text-3xl text-gray-300 font-archivo font-black">
                !
              </span>
            </div>
            <p className="font-patrick text-xl text-gray-400">
              {filter === "all"
                ? "No tienes notificaciones"
                : filter === "unread"
                  ? "No tienes notificaciones sin leer"
                  : "No tienes notificaciones le\u00eddas"}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-3">
            {filtered.map((n) => {
              const config =
                notificationTypeConfig[n.type] || notificationTypeConfig.info;
              return (
                <div
                  key={n.id}
                  className={`border-2 border-black transition-all ${
                    !n.read ? "bg-blue-50/60 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-white"
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-archivo font-black text-white text-sm flex-shrink-0 ${config.dot}`}
                      >
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-archivo font-black text-sm uppercase truncate">
                              {n.title}
                            </span>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-[#18a0fb] flex-shrink-0" />
                            )}
                          </div>
                          <span className="text-xs font-archivo text-gray-400 flex-shrink-0 whitespace-nowrap">
                            {formatDate(n.createdAt)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="font-patrick text-base leading-relaxed whitespace-pre-wrap">
                            {n.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                          <span
                            className={`text-xs font-archivo font-bold px-2 py-0.5 rounded text-white ${config.dot}`}
                          >
                            {config.label}
                          </span>
                          {!n.read && (
                            <button
                              onClick={() => handleMarkRead(n)}
                              className="text-xs font-archivo font-bold text-[#18a0fb] hover:underline"
                            >
                              Marcar le\u00edda
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(n.id)}
                            className="text-xs font-archivo font-bold text-red-500 hover:underline ml-auto"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
