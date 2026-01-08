import React from "react";
import { PendingResources } from "./PendingResources";
import { NewUsers } from "./NewUsers";
import { RecentPosts } from "./RecentPosts";
import { PanelData } from "../_lib/types";

interface RecentActivityProps {
  data?: PanelData | null;
}

export function RecentActivity({ data }: RecentActivityProps) {
  return (
    <section className="py-5 h-full">
      <h2 id="actividad-reciente" className="text-lg lg:text-xl font-semibold">
        Actividad reciente
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-3 py-5">
        <div className="grid gap-7">
          <PendingResources resources={data?.recentResources ?? null} />
          <NewUsers users={data?.userActivity ?? null} />
        </div>
        <RecentPosts posts={data?.recentPosts ?? null} />
      </section>
    </section>
  );
}
