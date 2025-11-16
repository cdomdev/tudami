"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { useCommentsChannel } from "@/hooks/use-comments-channel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SchemaComment } from "@/schemas";
import { useEffect, useState } from "react";
import { getCommentBy } from "../lib/comment";
import { SkeletonComments } from "./SkeletonComments";
import { RenderContent } from "./RenderContent";
import { BtnLikeResponse } from "./buttons/BtnLikeResponse";
import { formatTimestamp } from "@/utils/formatDate";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerComments({ question_id }: { question_id: number }) {
  const [comments, setComments] = useState<SchemaComment[]>([]);
  const [loading, setLoading] = useState(false);
  const count = useCommentsChannel(question_id);

  useEffect(() => {
    setLoading(true);
    async function fechDataComment() {
      await getCommentBy(question_id)
        .then((data) => setComments(data.comments))
        .finally(() => setLoading(false));
    }
    fechDataComment();
  }, [question_id]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:bg-none hover:bg-transparent dark:hover:bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-700 cursor-pointer"
        >
          <MessageCircle className="h-8 w-8 " />
          {count}
          <span className="sr-only">open drawer</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Comentarios</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 w-full">
            <div className="flex flex-col space-y-3 w-full  ">
              {loading ? (
                <SkeletonComments />
              ) : comments.length === 0 ? (
                <p className="text-center text-sm md:text-base ">
                  Esta pregunta no tiene respuestas.
                </p>
              ) : (
                comments.map((com, i) => (
                  <div
                    key={com.id || i}
                    className="border-b p-2 mb-3 overflow-x-hidden"
                  >
                    <div className="flex mb-2 ">
                      <div className="flex-shrink-0">
                        <Image
                          src={com.users.avatar_url || ""}
                          alt={com.users.full_name}
                          width={40}
                          height={40}
                          className="rounded-full aspect-square object-cover"
                        />
                      </div>
                      <div className="flex ml-3 flex-col items-start">
                        <div className="flex gap-3 items-center">
                          <span className=" font-semibold text-sm md:text-lg">
                            {com.users.full_name}
                          </span>
                          <p className="text-xs text-gray-500 inline-flex items-center gap-1">
                            Respuesta hace{" "}
                            {formatTimestamp(com.created_at.toString())}
                          </p>
                        </div>
                        <RenderContent content={com.text} />
                      </div>
                    </div>
                    <div className="translate-x-10 space-x-6 flex gap-2 items-center">
                      <BtnLikeResponse
                        response_id={com.id}
                        question_id={question_id}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
