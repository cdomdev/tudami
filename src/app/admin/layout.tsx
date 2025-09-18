import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Dahsboard",
    template: "%s | Tudami",
  }
}
export default function layoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="cursor-pointer" />
      <main className="w-full min-h-dvh lg:max-w-6xl mx-auto py-20">
        {children}
      </main>
    </SidebarProvider>
  );
}
