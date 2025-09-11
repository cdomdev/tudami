"use client";
import Link from "next/link";
import { Users } from "lucide-react";
import { useOfferApplicationsCount } from "@/hooks/use-offer-count-apply";
import { useSession } from "@/context/context.sesion";

export function CounterOffers({
  offer_id,
  hidden_btn_counter,
  text,
  isHref = false, 
}: {
  offer_id: number;
  hidden_btn_counter: boolean;
  text?: string;
  isHref?: boolean;
}) {

  const count = useOfferApplicationsCount(offer_id);

  const { user } = useSession();

  const Wrapper = isHref ? Link : "div";

  return (
    <Wrapper
      href={`/profile-user/offers?page=list_aplications&offer_id=${offer_id}&user_id=${user?.id}`}
    >
      <div className={`${hidden_btn_counter ? "hidden" : "flex"}  items-center flex-col`}>
        <span className="flex items-center gap-1 font-semibold text-base">
          <Users className={`w-5 h-5 ${text ? "hover:animate-bounce" : ""} `} />
          {count}
        </span>
        <p className={`text-sm ${text ? "hover:underline" : ""} }`}>{text || "Candidatos"}</p>
      </div>
    </Wrapper>
  );
}
