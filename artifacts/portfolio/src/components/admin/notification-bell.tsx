import { useState, useRef, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useNotifications } from "@/hooks/use-notifications";
import { notificationTypeConfig } from "@/lib/notifications";
import type { Notification } from "@/lib/notifications";

function timeAgo(dateStr: string) {
  try {
    return formatDistanceToNow(parseISO(dateStr), {
      addSuffix: true,
      locale: es,
    });
  } catch {
    return "";
  }
}

export default function NotificationBell() {
  const { notifications, unreadCount, loading, error, markAsRead, markAllAsRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const recent = notifications.slice(0, 10);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleMarkAllRead = useCallback(async () => {
    await markAllAsRead();
  }, [markAllAsRead]);

  const handleNotificationClick = useCallback(
    async (n: Notification) => {
      if (!n.read) await markAsRead(n.id);
    },
    [markAsRead],
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-full border-2 border-black hover:bg-gray-100 transition-all"
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-archivo font-black rounded-full px-1 leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black">
            <h3 className="font-archivo font-black text-sm uppercase">
              Notificaciones
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-archivo font-bold text-[#18a0fb] hover:underline"
              >
                Marcar todas le\u00eddas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center font-archivo text-sm text-gray-400">
                Cargando...
              </div>
            )}

            {!loading && error && (
              <div className="p-6 text-center font-archivo text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && recent.length === 0 && (
              <div className="p-6 text-center font-patrick text-gray-400">
                No tienes notificaciones
              </div>
            )}

            {recent.map((n) => {
              const config = notificationTypeConfig[n.type] || notificationTypeConfig.info;
              return (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-all ${
                    !n.read ? "bg-blue-50/60" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 mt-0.5 rounded-full flex items-center justify-center font-archivo font-black text-white text-xs flex-shrink-0 ${config.dot}`}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span
                          className={`font-archivo font-bold text-xs truncate ${
                            n.read ? "text-gray-600" : "text-black"
                          }`}
                        >
                          {n.title}
                        </span>
                        <span className="text-[10px] font-archivo text-gray-400 flex-shrink-0 ml-2">
                          {timeAgo(n.createdAt)}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 line-clamp-2 ${
                          n.read ? "text-gray-500" : "text-gray-700"
                        }`}
                      >
                        {n.message}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <a
            href="/admin/notifications"
            className="block w-full py-3 text-center font-archivo font-bold text-sm uppercase border-t-2 border-black bg-gray-50 hover:bg-gray-100 transition-all"
          >
            Ver todas
          </a>
        </div>
      )}
    </div>
  );
}
