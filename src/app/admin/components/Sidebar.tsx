import { Home, Workflow, Newspaper, Users,  PanelsTopLeft, PanelTop } from "lucide-react";
import Link from "next/link";

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
  return (
    <Sidebar>
      <div className="px-4 pt-6 pb-4 flex items-center">
        <span>Perfil</span>
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
