import React from "react";
import { parseDay } from "@/utils/formatDate";
import { RenderContent } from "../../questions/explore/components/RenderContent";
import { RecentPost } from "../_lib/types";
import { SkeletonPosts } from "./skeletons/SkeletonPosts";

interface RecentPostsProps {
  posts?: RecentPost[] | null;
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="border rounded-md p-5 shadow-md dark:shadow-white/10 max-h-150 overflow-y-auto">
      <h3
        id="ultimas-publicaciones"
        className="text-base md:text-lg font-semibold sticky top-0 bg-gray-100 py-2 pl-2"
      >
        Ultimas publicaciones
      </h3>
      <hr className="w-full bg-gray-900 border mb-5" />
      {posts === null || posts === undefined ? (
        <SkeletonPosts />
      ) : posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay publicaciones recientes.</p>
        </div>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="flex justify-between items-center border-b mb-5 overflow-y-auto border border-dashed rounded-md p-3"
          >
            <div className="flex items-center gap-2 p-2 w-full">
              <div className=" w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                  <time
                    className="text-gray-400 text-xs"
                    dateTime={post.created_at}
                  >
                    Publicado el {parseDay(post.created_at)}
                  </time>
                </div>
                <RenderContent content={post.content} />
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
