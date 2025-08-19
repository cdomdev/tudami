"use client";

import { useSession } from "@/context/context.sesion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import { formatTimestamp } from "@/utils/formatDate";
import { markNotificationAsRead } from "../lib/notifications";

export function Notifications() {
  const { user } = useSession();
  const { notifications, loading, error } = useRealtimeNotifications(
    user?.id || null
  );

  async function markNotitifacion(id: string) {
    await markNotificationAsRead(Number(id));
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
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
        {loading ? (
          <p className="px-4 py-2 text-sm text-muted-foreground">
            Cargando notificaciones...
          </p>
        ) : error ? (
          <p className="px-4 py-2 text-sm text-red-500">
            Error al cargar notificaciones
          </p>
        ) : notifications.length === 0 ? (
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
                className="flex flex-col px-4 py-2 text-sm text-accent-foreground hover:bg-accent cursor-pointer no-underline"
                onClick={() => markNotitifacion(n.id)}
              >
                {n.content}
                <time className="text-xs text-gray-600 dark:text-gray-200">
                  Hace {formatTimestamp(n.created_at)}
                </time>
              </Wrapper>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
