"use client"


import { Home, Workflow, Newspaper, Users, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/context/context.sesion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Inicio",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Recursos",
    url: "/admin/resources",
    icon: Workflow,
  },
  {
    title: "Noticias",
    url: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Volver a tudami",
    url: "/",
    icon: PanelsTopLeft,
  },
];

export function AppSidebar() {
  const { user } = useSession()
  return (
    <Sidebar>
      <div className="px-4 pt-6 pb-4 flex items-center border-b border-gray-200">
        <Avatar className="cursor-pointer w-9 h-9">
          <AvatarImage
            src={user?.avatar_url || ""}
            alt={user?.full_name || ""}
          />
          <AvatarFallback>{user?.full_name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col leadi">
          <h1 className="font-semibold ml-1 text-xl">{user?.full_name}</h1>
          <span className="text-center text-xs text-muted-foreground">Admin</span>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
