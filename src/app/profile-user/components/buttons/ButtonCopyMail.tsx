import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleCopyEmailContact } from "@/app/view-profile-user/lib/contact";
import { Clipboard } from "lucide-react";

export function ButtonSendMessageMl({
  mail,
  full_name,
  isAvailable,
}: {
  mail: string;
  full_name: string;
  isAvailable: boolean;
}) {
  function handleCopy() {
    handleCopyEmailContact(mail);
  }

  const msTooltip = isAvailable
    ? "Copiar correo de " + full_name
    : "No disponible";

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            className="flex cursor-pointer transition duration-200 text-muted-foreground dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 dark:hover:text-black"
            variant="outline"
            onClick={handleCopy}
            disabled={!isAvailable}
          >
            <span className="truncate">{msTooltip}</span>
            <Clipboard className="w-4 h-4 text-slate-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{msTooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
