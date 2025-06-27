"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Notifications() {

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 p-0 border-none  cursor-pointer focus:bg-transparent focus:ring-0 focus:ring-offset-0 active:bg-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:focus:ring-0 dark:focus:ring-offset-0"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit max-w-64">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <p className="px-4 py-2 text-sm text-muted-foreground">
          No tienes notificaciones nuevas.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
