import Image from "next/image";
import { UserCircle } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { ButtonSavePost } from "@/app/questions/explore/components/buttons/ButtonSavePost";
import { ButtonShare } from "@/components/ui/ButtonShare";
import Link from "next/link";
import { useSession } from "@/context/context.sesion";
import { SchemaPost } from "@/schemas";

export function CardsQuestionSaves({
  id,
  users,
  created_at,
  content,
  title,
}: SchemaPost) {
  const { user } = useSession();

  const approval_token = user?.approval_token || "";
  return (
    <article className="bg-card border border-border rounded-xl p-5  hover:shadow transition">
      <div className="flex items-start justify-between mb-3">
        <Link
          href={`/view-profile-user/${users?.full_name}?u_view_profile_p=${users?.id}&aprov=${approval_token}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {users?.avatar_url ? (
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
              <time className="text-xs text-muted-foreground">
                {created_at
                  ? `Publicado hace ${formatTimestamp(created_at)}`
                  : "Fecha desconocida"}
              </time>
            </div>
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta pregunta" />
          <ButtonSavePost question_id={id} />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
        <div
          className="text-black dark:text-foreground text-pretty text-sm md:text-md "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      
    </article>
  );
}
