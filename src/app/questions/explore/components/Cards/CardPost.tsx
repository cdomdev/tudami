import Image from "next/image";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaPost } from "@/schemas";
import { FooterCardPost } from "./FooterCardPost";
import { ButtonSavePost } from "../buttons/ButtonSavePost";
import { ButtonShare } from "../../../../../components/ui/ButtonShare";
import { useSession } from "@/context/context.sesion";
import { RenderContent } from "../RenderContent";


export function CardPost({
  content,
  created_at,
  id,
  question_tags,
  users,
  title,
}: SchemaPost) {
  const { user: dataUserSesion } = useSession();

  const approvalToken = dataUserSesion?.approval_token || "";

  return (
    <article
      key={id}
      className="bg-card dark:bg-custom-card border border-border rounded-sm p-5 shadow-sm hover:shadow transition animate-fade-in-down"
    >
      {/* Cabecera del autor */}
      <div className="flex items-start justify-between mb-3">
        <Link
          href={`/view-profile-user/${users.full_name || "anonimo"}?u_view_profile_p=${users.id}&aprov=${approvalToken}`}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {users.avatar_url ? (
                <Image
                  src={users.avatar_url}
                  alt={users.full_name}
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
              <p className="font-medium">{users?.full_name || "Anónimo"}</p>
              <p className="text-xs text-muted-foreground">
                Publicado hace {formatTimestamp(created_at.toString())}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta pregunta" />
          <ButtonSavePost question_id={id} />
        </div>
      </div>

      {/* Título y contenido */}
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
        <RenderContent content={content}/>
        {/* <div
          className="prose relative dark:prose-invert max-w-none text-sm md:text-md"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
      </div>


      {/* Etiquetas */}
      {question_tags && question_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {question_tags.map((questionTag) => (
            <Link
              href={`/questions/explore/tags?slug=${questionTag.tag.slug}`}
              key={questionTag.tag.id}
            >
              <span
                key={questionTag.tag.id}
                className={`text-xs px-2.5 py-0.5 rounded-full  dark:text-gray-50 font-normal hover:opacity-80 transition`}
                style={{ border: `1px solid ${questionTag.tag.color}` }}
              >
                {questionTag.tag.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Acciones botones y contadores de los preguntas */}
      <FooterCardPost question_id={id} />
    </article>
  );
}
