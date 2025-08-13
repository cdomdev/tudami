"use client"

import { Users } from "lucide-react"
import { useOfferApplicationsCount } from "@/hooks/use-offer-count-apply"

export function CounterOffers({ offer_id }: { offer_id: number }) {
    const count = useOfferApplicationsCount(offer_id);

    return (
        <div className="flex items-center flex-col">
            <span className="flex items-center gap-1 font-semibold text-base">
                <Users className="w-5 h-5" />
                {count}
            </span>
            <p className="text-[10px]">Aplicaciones</p>
        </div>
    )
}
