import React from "react";
import { Card } from "./Card";
import { SkeletonStats } from "./skeletons/SkeletonStats";

interface DashboardStatsProps {
  itemsDashboard?: Array<{
    title: string;
    text: string;
    data: number;
    color: string;
    icon: React.ReactNode;
  }> | null;
}

export function DashboardStats({ itemsDashboard }: DashboardStatsProps) {
  return (
    <section>
      <header>
        <h1 id="resumen-general" className="text-lg lg:text-xl font-semibold">
          Resumen general
        </h1>
      </header>
      {itemsDashboard === null || itemsDashboard === undefined ? (
        <SkeletonStats />
      ) : (
        <div className="py-10">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {itemsDashboard.map((item, index) => (
              <li key={index}>
                <Card {...item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
