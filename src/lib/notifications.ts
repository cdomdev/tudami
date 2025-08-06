
interface dataNotification {
  user_id: string;
  actor_id: string;
  type: string;
  entity_id?: string;
  entity_type?: string;
  content: string;
  urlNotification?: string;
  read: boolean;
}

export async function createNotification({ actor_id, content, entity_id, entity_type, read, type, user_id, urlNotification }: dataNotification) {
  const url = `/api/notifications/new`;
  const bodyNotification = {
    actor_id,
    content,
    entity_id,
    entity_type,
    read,
    type,
    user_id,
    urlNotification,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyNotification),
  });

  if (!response.ok) {
    throw new Error("Error creating notification");
  }
  const data = await response.json();
  return data;
};

export async function getNotifications(userId: string) {
  const url = `/api/notifications/get?userId=${userId}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error fetching notifications");
  }
  const data = await response.json();
  return data;
};

export async function markNotificationAsRead(notificationId: string) {
  const url = `/api/notifications/mark?notificationId=${notificationId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error marking notification as read");
  }
  const data = await response.json();
  return data;
};
