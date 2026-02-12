import React from "react";
import { User, Newspaper, Workflow } from "lucide-react";
import { dataPanel } from "./_lib";
import { DashboardStats } from "./components/DashboardStats";
import { RecentActivity } from "./components/RecentActivity";
import { PanelData } from "./_lib/types";

export default async function PageAdmin() {
  const data: PanelData | undefined = await dataPanel();
  const itemsDashboard = [
    {
      title: "Usuarios",
      text: "Total de usuarios registrados",
      data: data?.totalUsers || 0,
      color: "indigo",
      icon: <User />,
    },
    {
      title: "Recursos",
      text: "Total de recursos disponibles",
      data: data?.totalResources || 0,
      color: "red",
      icon: <Workflow />,
    },
    {
      title: "Noticias",
      text: "Total de noticias publicadas",
      data: data?.totalNews || 0,
      color: "yellow",
      icon: <Newspaper />,
    },
    {
      title: "Publicaciones",
      text: "Total publicaciones",
      data: data?.countPosts || 0,
      color: "green",
      icon: <Newspaper />,
    },
    {
      title: "Ofertas",
      text: "Total ofertas",
      data: data?.countOffers || 0,
      color: "slate",
      icon: <Newspaper />,
    },
  ];
  if (!data) {
    return (
      <main>
        <DashboardStats itemsDashboard={null} />
        <RecentActivity data={null} />
      </main>
    );
  }
  return (
    <main>
      <DashboardStats itemsDashboard={itemsDashboard} />
      <RecentActivity data={data} />
    </main>
  );
}
