import React from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import { parseDay } from "@/utils/formatDate";
import { RecentResource } from "../_lib/types";
import { SkeletonResources } from "./skeletons/SkeletonResources";

interface PendingResourcesProps {
  resources?: RecentResource[] | null;
}

export function PendingResources({ resources }: PendingResourcesProps) {
  return (
    <article className="border rounded-md p-5 shadow-md dark:shadow-white/10">
      <h3
        id="recursos-pendientes"
        className="text-base md:text-lg font-semibold sticky top-0 bg-gray-100 dark:bg-gray-700 py-2 pl-2"
      >
        Recursos pendientes de aprobación
      </h3>
      <hr className="w-full bg-gray-900 border mb-5" />
      {resources === null || resources === undefined ? (
        <SkeletonResources />
      ) : resources.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No hay recursos pendientes de aprobación.
          </p>
        </div>
      ) : (
        resources.map((resource) => (
          <div
            key={resource.id}
            className="grid grid-cols-1 md:grid-cols-8 items-center border border-dashed rounded-md p-2 mb-4"
          >
            <div className="flex items-center col-span-4 gap-2 p-2  ">
              <div>
                <p className="font-medium">{resource.title}</p>
                <p className="text-sm text-gray-500 text-wrap overflow-hidden line-clamp-3">
                  {resource.description}
                </p>
              </div>
            </div>
            <div className="flex gap-1 flex-col py-2 col-span-2 items-center">
              <span
                className={` py-1 px-2.5 text-center rounded-full text-sm font-medium ${
                  resource.status === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {resource.status === "pending" ? "Pendiente" : "Aprobado"}
              </span>
              <time
                className="text-gray-400 text-xs"
                dateTime={resource.created_at}
              >
                Enviado el {parseDay(resource.created_at)}
              </time>
            </div>
            <div className="col-span-2">
              <Link
                href={`/admin/resources/edit?slug=${resource.slug}`}
                className="flex flex-col items-center group"
                aria-label="Ver recurso"
              >
                <Eye
                  size={30}
                  className="text-gray-500 group-hover:text-gray-700"
                />
                <span className="text-xs text-gray-500 ">Ver recurso</span>
              </Link>
            </div>
          </div>
        ))
      )}
    </article>
  );
}
