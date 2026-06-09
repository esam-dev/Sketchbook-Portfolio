export type NotificationType = "info" | "submission_received";

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
};

export type UnreadCount = {
  count: number;
};

const BASE = "/api";

function getToken(): string | null {
  try {
    return localStorage.getItem("admin_token");
  } catch {
    return null;
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Error ${res.status}`);
  }

  return res.json();
}

export async function fetchNotifications(): Promise<Notification[]> {
  return apiFetch<Notification[]>("/notifications");
}

export async function fetchUnreadCount(): Promise<UnreadCount> {
  return apiFetch<UnreadCount>("/notifications/unread-count");
}

export async function markAsRead(id: string): Promise<Notification> {
  return apiFetch<Notification>(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export async function markAllAsRead(): Promise<void> {
  await apiFetch<void>("/notifications/read-all", { method: "PATCH" });
}

export async function deleteNotification(id: string): Promise<void> {
  await apiFetch<void>(`/notifications/${id}`, { method: "DELETE" });
}

export const notificationTypeConfig: Record<
  NotificationType,
  { label: string; dot: string; icon: string }
> = {
  info: { label: "Info", dot: "bg-[#18a0fb]", icon: "i" },
  submission_received: {
    label: "Nuevo mensaje",
    dot: "bg-[#29c46a]",
    icon: "\u2709",
  },
};
