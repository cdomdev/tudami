"use client";

import { useSession } from "@/context/context.sesion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { supabase } from "@/lib/supabase";
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

export function Notifications() {
  const { user } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setNotifications(data);
  };

  // Cargar manualmente sin efecto
  // Solo se ejecuta al hacer clic en la campana
  const handleOpen = () => {
    if (notifications.length === 0) {
      fetchNotifications();
    }
  };


  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild onClick={handleOpen}>
        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8 p-0 border-none cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-full max-w-72 max-h-80 overflow-y-auto popoveer-content">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <p className="px-4 py-2 text-sm text-muted-foreground">
            No tienes notificaciones.
          </p>
        ) : (
          notifications.map((n) => (
            <p key={n.id} className="p-2 text-sm text-accent-foreground border-b border-muted">
              {n.content}
            </p>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
