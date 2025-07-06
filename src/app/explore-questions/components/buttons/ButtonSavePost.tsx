"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/context.sesion";
import { isQuestionSaved, toggleSave } from "../../lib/saveQuestions";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonSavePost({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const [isSaved, setIsSaved] = useState(false);

  // Verifica al montar si ya está guardado
  useEffect(() => {
    if (!user) return;
    isQuestionSaved(question_id, user.id).then(setIsSaved);
  }, [user, question_id]);

  // Suscripción en tiempo real
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`save-question-${question_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "questions_save",
          filter: `question_id=eq.${question_id}`,
        },
        async () => {
          const updated = await isQuestionSaved(question_id, user.id);
          setIsSaved(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, question_id]);

  const handleSave = async () => {
    if (!user) return;
    const { saved } = await toggleSave(question_id, user.id);
    if (saved) toast.success("Se guardó la pregunta en tu perfil");
    else toast.error("Se eliminó la pregunta de tus guardados");
    setIsSaved(saved);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSave}
      className={`cursor-pointer ${isSaved
          ? "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:hover:text-white dark:hover:bg-gray-400"
        } px-4 py-2 rounded-md transition-colors duration-200 `}
    >
      <Bookmark
        className={`h-5 w-5 ${isSaved ? "text-white" : "text-gray-800 hover:text-white"
          }`}
      />
    </Button>
  );
}
