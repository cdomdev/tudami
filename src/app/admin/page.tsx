import React from "react";
import { Card } from "./components/Card";
import { User, Newspaper, Workflow, Eye } from "lucide-react";
import { dataPanel } from "./_lib";
import Image from "next/image";
import { parseDay } from "@/utils/formatDate";
import Link from "next/link";
import { RenderContent } from "../questions/explore/components/RenderContent";

export default async function PageAdmin() {
  const data = await dataPanel();
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
  ];
  return (
    <>
      <section>
        <h1 className="text-lg lg:text-xl font-semibold">Resumen general</h1>
        <div className="py-10 ">
          <div className="grid grid-cols-3 gap-7">
            {itemsDashboard.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-5 h-full">
        <h2 className="text-lg lg:text-xl">Actividad reciente</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-3 py-10 px-4">
          <div className="grid gap-2">
            <article className="border rounded-md p-5 shadow-md shadow-white/10">
              <h3 className="text-base md:text-lg font-semibold">
                Recursos pendientes de aprobación
              </h3>
              <div className="w-full bg-gray-900 border" />
              {data?.recentResources?.map((resource) => (
                <div
                  key={resource.id}
                  className="flex justify-between items-center border-b"
                >
                  <div className="flex items-center gap-2 p-2">
                    <div>
                      <p className="font-medium">{resource.title}</p>
                      <p className="text-sm text-gray-500">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col py-2">
                    <span
                      className={` py-1 px-2.5 text-center rounded-full text-sm font-medium ${
                        resource.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {resource.status === "pending" ? "Pendiente" : "Aprobado"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      Enviado el {parseDay(resource.created_at)}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/admin/resources/edit?slug=${resource.slug}`}
                      className="flex flex-col items-center group"
                    >
                      <Eye
                        size={30}
                        className="text-gray-500 group-hover:text-gray-700"
                      />
                      <span className="text-xs text-gray-500 ">
                        Ver recurso
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </article>
            <article className="border rounded-md p-5 shadow-md shadow-white/10">
              <h3 className="text-base md:text-lg font-semibold">
                Actividad de usuarios recien registrados
              </h3>
              <div className="w-full bg-gray-900 border" />
              {data?.userActivity?.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-end border-b"
                >
                  <div className="flex items-center gap-2 p-2">
                    <Image
                      src={user.avatar_url}
                      alt={user.full_name}
                      width={32}
                      height={32}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    Se unio el {parseDay(user.created_at)}
                  </span>
                </div>
              ))}
            </article>
          </div>
          <section className="border rounded-md p-5 shadow-md shadow-white/10">
            <h3 className="text-base md:text-lg font-semibold">
              Ultimas publicaciones
            </h3>
            <div className="w-full bg-gray-900 border" />
            {data?.recentPosts?.map((post) => (
              <article
                key={post.id}
                className="flex justify-between items-center border-b mb-5 overflow-y-auto"
              >
                <div className="flex items-center gap-2 p-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{post.title}</p>
                      <span className="text-gray-400 text-xs">
                        Publicado el {parseDay(post.created_at)}
                      </span>
                    </div>
                    <RenderContent content={post.content} />
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </>
  );
}
