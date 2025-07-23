import Image from "next/image";
import { UserCircle } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaQuestionsSaveds } from "../../schema/schema.questions_saveds";
import { ButtonSavePost } from "@/app/explore-questions/components/buttons/ButtonSavePost";
import { ButtonShare } from "@/app/explore-questions/components/buttons/ButtonShare";
import Link from "next/link";
import { useSession } from "@/context/context.sesion";

export function CardsQuestionSaves({ id, questions }: SchemaQuestionsSaveds) {
  const { user } = useSession();

  const approval_token = user?.approval_token || "";
  return (
    <article
      key={id}
      className="bg-card border border-border rounded-xl p-5  hover:shadow transition"
    >
      {/* Cabecera del autor */}
      <div className="flex items-start justify-between mb-3">
        <Link
          href={`/view-profile-user/${questions.user?.full_name}?u_view_profile_p=${questions.user?.id}&aprov=${approval_token}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {questions.user?.avatar_url ? (
                <Image
                  src={questions.user.avatar_url}
                  alt={questions.user.full_name}
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">
                {questions.user?.full_name || "Anónimo"}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTimestamp(questions.created_at.toString())}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta pregunta" />
          <ButtonSavePost question_id={questions.id} />
        </div>
      </div>

      {/* Título y contenido */}
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          {questions.title}
        </h2>
        <div
          className="text-black dark:text-foreground text-pretty text-sm md:text-md "
          dangerouslySetInnerHTML={{ __html: questions.content }}
        />
      </div>

      {/* Etiquetas */}
      {questions.question_tags && questions.question_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {questions.question_tags.map((questionTag) => (
            <span
              key={questionTag.tag.id}
              className={`text-xs px-2.5 py-0.5 rounded-full  text-gray-50 font-normal`}
              style={{ backgroundColor: `${questionTag.tag.color}` }}
            >
              {questionTag.tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
