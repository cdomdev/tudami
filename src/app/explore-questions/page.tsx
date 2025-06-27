"use client";
import { SectionContainer } from "@/components/SectionContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockPosts } from "./utils/mockContent";
import { CardPost } from "./components/CardPost";

// Datos de ejemplo para simular publicaciones

export default function ExploreQuestionsPage() {
  const [posts] = useState(mockPosts);

  return (
    <>
      <SectionContainer className="py-8">
        <div className="space-y-6 mb-8">
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
        </div>

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
      </SectionContainer>
    </>
  );
}
