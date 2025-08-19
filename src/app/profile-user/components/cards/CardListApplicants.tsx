import { OfferApplication } from "@/schemas";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { ButtonSendMessageWs } from "../buttons/ButtonSendMsgWs";
import { ButtonSendMessageMl } from "../buttons/ButtonCopyMail";
import { ButtonViewProfile } from "../buttons/ButtonViewProfile";

export function CardListApplicants({ user, preferences }: OfferApplication) {
  return (
    <div className="flex gap-20 border-b pb-5  border-gray-200 dark:border-gray-700 relative before:absolute before:left-[-15px] before:block before:h-full before:border-l-2 before:border-black/20 dark:before:border-white/15 before:content-[''] md:gap-1 md:space-x-4">
      <div className="relative pb-5 md:col-span-2">
        <div className="sticky top-0">
          <span className="text-amber-400 -left-[21px] absolute rounded-full text-5xl ">
            •
          </span>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {user?.avatar_url ? (
          <Image
            src={user?.avatar_url}
            alt={user?.full_name}
            width={40}
            height={40}
            priority
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <UserCircle className="h-8 w-8 text-muted-foreground" />
        )}
        <div className="flex flex-col leading-3">
          <span>{user?.full_name}</span>
          <span className="text-sm text-gray-400">{user?.email}</span>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <ButtonViewProfile full_name={user?.full_name} id={user?.id} />
        <ButtonSendMessageWs
          full_name={user?.full_name}
          phone={user?.phone}
          isAvailable={preferences?.allow_whatsapp}
        />
        <ButtonSendMessageMl
          full_name={user?.full_name}
          mail={user?.email}
          isAvailable={preferences?.allow_email}
        />
      </div>
    </div>
  );
}
