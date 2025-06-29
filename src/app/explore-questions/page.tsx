"use client";
// import { SectionContainer } from "@/components/SectionContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockPosts } from "./utils/mockContent";
import { CardPost } from "./components/CardPost";

// Datos de ejemplo para simular publicaciones

export default function ExploreQuestionsPage() {
  const [posts] = useState(mockPosts);

  return (
    <>
      <section className="py-8 mb-8 space-y-6">
        {posts.map((post) => (
          <CardPost
            id={post.id}
            key={post.id}
            author={post.author}
            commentsCount={post.commentsCount}
            content={post.content}
            date={post.date}
            likesCount={post.likesCount}
            tags={post.tags}
            title={post.title}
            authorAvatar={post.authorAvatar}
          />
        ))}
      </section>
      <section className="py-8">
        {/* Paginación */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="default" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </section>
    </>
  );
}
