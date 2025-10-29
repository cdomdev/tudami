"use client";
import { useSession } from "@/context/context.sesion";
import { CounterOffers } from "./CounterOffers";
import { ButtonApplyOffer } from "./ButtonApplyOffer";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, CircleDollarSign } from "lucide-react";
import { ButtonSaveOffer } from "../components/ButtonSaveOffer";
import { ButtonShare } from "@/components/ui/ButtonShare";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaOffers } from "@/schemas";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RenderContent } from "@/app/questions/explore/components/RenderContent";

export function CardPostOffers({
  details,
  created_at,
  id,
  users,
  title,
  hidden_btn_apply,
  hidden_btn_counter,
  text_btn_counter,
  isHref_btn_counter,
}: SchemaOffers) {
  const { user } = useSession();
  const approvalToken = user?.approval_token || "";

  const displayName = users?.full_name ?? "Anónimo";
  const profileHref = users
    ? `/view-profile-user/${encodeURIComponent(displayName)}?u_view_profile_p=${
        users.id
      }&aprov=${approvalToken}`
    : "#";

  return (
    <article className="bg-card border border-border rounded-sm p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <Link href={profileHref} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {users && users.avatar_url ? (
              <Image
                src={users.avatar_url}
                alt={displayName}
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
          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <CircleDollarSign className="w-6 h-6 text-green-300" />
              </TooltipTrigger>
              <TooltipContent>Oferta remunerada</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta oferta con tus conocidos" />
          <ButtonSaveOffer offer_id={id} />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
        <RenderContent content={details} />
      </div>

      <div className="flex justify-between items-center">
        <CounterOffers
          offer_id={id}
          hidden_btn_counter={hidden_btn_counter}
          text={text_btn_counter}
          isHref={isHref_btn_counter}
        />
        <ButtonApplyOffer
          user_id={users?.id}
          offer_id={id}
          hidden_btn_apply={hidden_btn_apply}
        />
      </div>
    </article>
  );
}
