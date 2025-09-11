"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/context.sesion";
import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Notifications } from "./Notifications";
import { Button } from "./ui/button";
import { logout } from "@/app/auth/lib/auth";
import { supabase } from "@/utils/supabase/supabaseClient";

export function Profile() {
  const { user, clearUser } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    clearUser();
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión on client:", error);
    }

    router.push("/");
  };

  return (
    <div className="flex items-center gap-5">
      <Notifications />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 p-0 border-none cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent focus:ring-0 focus:ring-offset-0 active:bg-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:focus:ring-0 dark:focus:ring-offset-0"
          >
            <Avatar className="cursor-pointer w-9 h-9">
              <AvatarImage
                src={user?.avatar_url || ""}
                alt={user?.full_name || ""}
              />
              <AvatarFallback>{user?.full_name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Abrir menú de usuario</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>
            <div className="font-medium">{user?.full_name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link
            className="gap-2 flex px-2 hover:bg-accent p-2 rounded-md items-center text-sm dark:text-gray-300 dark:hover:text-gray-100"
            href={`/profile-user?id=${user?.id}`}
          >
            <UserIcon className="w-4 h-4" />
            Mi perfil
          </Link>
          <DropdownMenuItem
            className="gap-2 text-red-500 px-2  p-2 rounded-md cursor-pointer text-sm hover:bg-red-50 dark:hover:text-red-200"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
