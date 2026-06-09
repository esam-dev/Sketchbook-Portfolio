import { useState, useEffect, useCallback, useRef } from "react";
import type { Notification, UnreadCount } from "@/lib/notifications";

type NotificationsState = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
};

export function useNotifications() {
  const [state, setState] = useState<NotificationsState>({
    notifications: [],
    unreadCount: 0,
    loading: true,
    error: null,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tokenRef = useRef<string | null>(null);

  const updateState = useCallback((partial: Partial<NotificationsState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const list = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data) ? data : [];
        updateState({ notifications: items, error: null });
        return;
      }
      if (res.status === 401) {
        updateState({ error: "Sesión expirada" });
      } else {
        const body = await res.json().catch(() => ({}));
        updateState({ error: body.error || `Error ${res.status}` });
      }
    } catch {
      updateState({ error: "Error de conexión" });
    }
  }, [updateState]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications/unread-count", {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      });
      if (res.ok) {
        const data: UnreadCount = await res.json();
        updateState({ unreadCount: data.count ?? 0 });
      }
    } catch {
      // silent
    }
  }, [updateState]);

  const load = useCallback(async () => {
    updateState({ loading: true, error: null });
    const token = localStorage.getItem("admin_token");
    if (!token) {
      updateState({ loading: false, notifications: [], unreadCount: 0 });
      return;
    }
    tokenRef.current = token;
    await list();
    await fetchUnreadCount();
    updateState({ loading: false });
  }, [list, fetchUnreadCount, updateState]);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(() => {
      const token = localStorage.getItem("admin_token");
      if (token) {
        fetchUnreadCount();
      }
    }, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load, fetchUnreadCount]);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await fetch(`/api/notifications/${id}/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        });
        updateState({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        });
      } catch {
        // silent
      }
    },
    [state.notifications, state.unreadCount, updateState],
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await fetch("/api/notifications/read-all", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      });
      updateState({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      });
    } catch {
      // silent
    }
  }, [state.notifications, updateState]);

  const remove = useCallback(
    async (id: string) => {
      try {
        await fetch(`/api/notifications/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        });
        const removed = state.notifications.find((n) => n.id === id);
        updateState({
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount: removed && !removed.read
            ? Math.max(0, state.unreadCount - 1)
            : state.unreadCount,
        });
      } catch {
        // silent
      }
    },
    [state.notifications, state.unreadCount, updateState],
  );

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  return {
    ...state,
    markAsRead,
    markAllAsRead,
    deleteNotification: remove,
    refresh,
  };
}
