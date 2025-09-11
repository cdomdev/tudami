
interface dataNotification {
  user_id: string;
  actor_id: string;
  type: string;
  entity_id?: string;
  entity_type?: string;
  content: string;
  url?: string;
  read: boolean;
}

export async function createNotification({
  actor_id,
  content,
  entity_id,
  entity_type,
  read,
  type,
  user_id,
  url,
}: dataNotification) {
  const urlRequest = `/api/notifications/new`;
  
  const bodyNotification = {
    actor_id,
    content,
    entity_id,
    entity_type,
    read,
    type,
    user_id,
    url,
  };


  const response = await fetch(urlRequest, {
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
}

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
}

export async function markNotificationAsRead(id: number) {
  const url = `/api/notifications/mark?id=${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error data:", errorData);
    throw new Error("Error marking notification as read");
  }

  return response.json();
}
