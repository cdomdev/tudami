
export const createNotification = async (notificationData: {
  user_id: string;
  message: string;
}) => {
  const url = `/api/notifications/new`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationData),
  });

  if (!response.ok) {
    throw new Error("Error creating notification");
  }
  const data = await response.json();
  return data;
};

export const getNotifications = async (userId: string) => {
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

export const markNotificationAsRead = async (notificationId: string) => {
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
