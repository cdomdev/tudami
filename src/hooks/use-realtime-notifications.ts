import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  type: string;
  entity_id: string;
  entity_type: string;
  content: string;
  read: boolean;
  url: string;
  created_at: string;
}

export function useRealtimeNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const loadNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setNotifications(data);
      } else if (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    loadNotifications();

    const channel = supabase
      .channel(`notifications:user:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => {
            // Evitar duplicados por id
            if (prev.some((n) => n.id === newNotification.id)) return prev;
            return [newNotification, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { notifications, loading, error, setNotifications };
}
