"use client";
import Link from "next/link";
import { Users } from "lucide-react";
import { useOfferApplicationsCount } from "@/hooks/use-offer-count-apply";
import { useSession } from "@/context/context.sesion";

export function CounterOffers({
  offer_id,
  hidden,
}: {
  offer_id: number;
  hidden: boolean;
}) {
  const count = useOfferApplicationsCount(offer_id);
  const { user } = useSession();

  const Wrapper = hidden ? Link : "div";
  return (
    <Wrapper
      href={`/profile-user/save?page=list_aplications&offer_id=${offer_id}&user_id=${user?.id}`}
    >
      <div className="flex items-center flex-col">
        <span className="flex items-center gap-1 font-semibold text-base">
          <Users className="w-5 h-5" />
          {count}
        </span>
        <p className="text-[10px]">Aplicaciones</p>
      </div>
    </Wrapper>
  );
}
