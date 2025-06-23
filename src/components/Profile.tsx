"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/context.sesion";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export function Profile() {
  const { user, clearUser } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    router.push("/");
  };

  return (
    <div className="flex items-center gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative p-1.5 cursor-pointer rounded-full hover:bg-muted ring-0 focus:ring-0 outline-none focus:bg-transparent focus:outline-none">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-accordion-up" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="text-sm text-muted-foreground px-2 py-2">
            No tienes notificaciones aún.
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer w-9 h-9">
            <AvatarImage
              src={user?.avatar_url || ""}
              alt={user?.full_name || ""}
            />
            <AvatarFallback>
              {user?.full_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>
            <div className="font-semibold">{user?.full_name}</div>
            <div className="text-xs text-muted-foreground">
              {user?.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link className="gap-2 flex px-2 items-center text-sm text-gray-300 hover:text-gray-100" href={`/profile/user/${user?.id}`}>
            <UserIcon className="w-4 h-4" />
            Mi perfil
          </Link>
          <DropdownMenuItem className="gap-2 text-red-500" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
