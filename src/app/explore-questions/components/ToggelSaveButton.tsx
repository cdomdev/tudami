"use client";

import { useEffect, useState } from "react";
import { SaveButton } from "./Save";
import { useSession } from "@/context/context.sesion";
import { isQuestionSaved, toggleSave } from "../lib/saveQuestions";
import { supabase } from "@/lib/supabase";
import {toast} from "sonner";

export function ToggleSaveButton({ question_id }: { question_id: number }) {
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
    if(saved) toast.success("Se guardó la pregunta en tu perfil");
    else toast.error("Se eliminó la pregunta de tus guardados");
    setIsSaved(saved);
  };

  return <SaveButton isSaved={isSaved} onSave={handleSave} />;
}
