import React from "react";
import Image from "next/image";
import { parseDay } from "@/utils/formatDate";
import { UserActivity } from "../_lib/types";
import { SkeletonUsers } from "./skeletons/SkeletonUsers";

interface NewUsersProps {
  users?: UserActivity[] | null;
}

export function NewUsers({ users }: NewUsersProps) {
  return (
    <article className="border rounded-md p-5 shadow-md dark:shadow-white/10 max-h-120 overflow-y-auto">
      <h3
        id="actividad-usuarios"
        className="text-base md:text-lg pl-2 font-semibold sticky top-0 bg-gray-100 dark:bg-gray-700 py-2"
      >
        Actividad de usuarios recien registrados
      </h3>
      <hr className="w-full bg-gray-900 border mb-5" />
      {users === null || users === undefined ? (
        <SkeletonUsers />
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay usuarios nuevos registrados.</p>
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-end border-b"
          >
            <div className="flex items-center gap-2 p-2">
              <Image
                src={user.avatar_url}
                alt={`Avatar de ${user.full_name}`}
                width={32}
                height={32}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <time className="text-gray-500 text-sm" dateTime={user.created_at}>
              Se unio el {parseDay(user.created_at)}
            </time>
          </div>
        ))
      )}
    </article>
  );
}
