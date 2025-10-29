"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { useCommentsChannel } from "@/hooks/use-comments-channel";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BodyComments } from "./BodyComments";

export function DrawerComments({ question_id }: { question_id: number }) {
  const count = useCommentsChannel(question_id);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:bg-none hover:bg-transparent dark:hover:bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-700 cursor-pointer"
        >
          <MessageCircle className="h-8 w-8 " />
          {count}
          <span className="sr-only">open dialog</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Comentarios</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 w-full">
            <BodyComments question_id={question_id} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
