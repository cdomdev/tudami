import { supabase } from "./supabase";

export const createNotification = async (notificationData: {
  user_id: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([notificationData]);

  if (error) {
    console.error("Error creating notification:", error);
    return null;
  }

  return data;
};

export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }

  return data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }

  return data;
};
