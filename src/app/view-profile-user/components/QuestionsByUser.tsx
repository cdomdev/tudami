import { MessageSquare } from "lucide-react";
export function QuestionsByUser({
  //   questions,
  full_name,
}: {
  questions?: Array<{ id: string; title: string; createdAt: string }>;
  full_name: string;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white flex items-center">
        <MessageSquare className="w-5 h-5 mr-2" />
        Preguntas realizadas por {full_name}
      </h3>
    </>
  );
}
