import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "@/context/context.sesion";

export function ButtonViewProfile({
  full_name,
  id,
}: {
  full_name: string;
  id: string;
}) {
  const { user } = useSession();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Link
            href={`/view-profile-user/${full_name}?u_view_profile_p=${id}&aprov=${user?.approval_token}`}
          >
            <Button className="cursor-pointer">
              <User />
              Ver perfil
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>Ver perfil de {full_name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
