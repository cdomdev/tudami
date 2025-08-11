import Image from "next/image";
import Link from "next/link";
import { UserCircle, CircleDollarSign, Users } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaOffers } from "@/schemas";
import { ButtonSaveOffer } from "../components/ButtonSaveOffer";
import { ButtonShare } from "@/components/ui/ButtonShare";
import { useSession } from "@/context/context.sesion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ButtonApplytOffer } from "./ButtonApplyOffer";

export function CardPostOffers({
  details,
  created_at,
  id,
  users,
  title,
  offers_aplication
}: SchemaOffers) {
  const { user: dataUserSesion } = useSession();
  const approvalToken = dataUserSesion?.approval_token || "";
  return (
    <article
      key={id}
      className="bg-card dark:bg-custom-card border border-border rounded-sm p-5 shadow-sm hover:shadow transition"
    >
      <div className="flex items-start justify-between mb-3">
        <Link
          href={`/view-profile-user/${users.full_name}?u_view_profile_p=${users.id}&aprov=${approvalToken}`}
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
              <time className="text-xs text-muted-foreground">
                Publicado hace {formatTimestamp(created_at.toString())}
              </time>
            </div>
            <TooltipProvider >
              <Tooltip delayDuration={150} >
                <TooltipTrigger asChild>
                  <CircleDollarSign className="w-6 h-6 text-green-300" />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                >
                  Oferta marcada como remunera
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Link>

        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta oferta con tus conocidos" />
          <ButtonSaveOffer offer_id={id} />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
        <div
          className="text-black dark:text-foreground text-pretty text-sm md:text-md "
          dangerouslySetInnerHTML={{ __html: details }}
        />
      </div>
      <div className="flex w-full  justify-between items-center">
        <div className="flex items-center flex-col">
          <span className="flex items-center gap-1">
            <Users className="w-5 h-5" />
            {offers_aplication || 0}
          </span>
          <p className="text-[10px]">Aplicaciones</p>
        </div>
        <ButtonApplytOffer user_id={users.id} />
      </div>
    </article>
  );
}
