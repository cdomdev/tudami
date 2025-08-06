"use client";

import { useSession } from "@/context/context.sesion";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { getNotifications } from "@/lib/notifications";
import Link from "next/link";

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

  useEffect(() => {
    async function fetchNotifications() {
      if (!user?.id) return;
      const data = await getNotifications(user.id);
      if (data) {
        setNotifications(data);
      }
    };
    fetchNotifications();
  }, [])




  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild >
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 p-0 border-none cursor-pointer hover:bg-transparent dark:hover:bg-transparent"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">handle notification</span>
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-full max-w-72 max-h-80 overflow-y-auto popoveer-content p-0"
      >
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-0" />
        {notifications.length === 0 ? (
          <p className="px-4 py-2 text-sm text-muted-foreground">
            No tienes notificaciones.
          </p>
        ) : (
          notifications.map((n) => {
            const Wrapper = n.url ? Link : "div";

            return (
              <Wrapper
                key={n.id}
                href={n.url || ""}
                className="block px-4 py-2 text-sm text-accent-foreground hover:bg-accent cursor-pointer no-underline"
              >
                {n.content}
              </Wrapper>
            );
          })
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
