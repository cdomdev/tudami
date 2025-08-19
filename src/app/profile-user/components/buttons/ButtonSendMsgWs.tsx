import { Button } from "@/components/ui/button";
import { WhatSappIcon } from "@/components/icons/WhatSappIcon";
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ButtonSendMessageWs({
  phone,
  full_name,
  isAvailable,
}: {
  phone: number;
  full_name: string;
  isAvailable: boolean;
}) {
  function handleSendMessage() {
    const bodyMsg = encodeURIComponent(
      `Hola, mi nombre es ${full_name}\n Estoy contactando a los candidatos que aplicaron a mi oferta.\n Seleccione su perfil, si le interesa continuar con el proceso, responda a este mensaje.`
    );
    const whatsappUrl = `https://wa.me/+57${phone
      .toString()
      .replace(/\D/g, "")}?text=${bodyMsg}`;
    window.open(whatsappUrl, "_blank");
  }
  const msTooltip = isAvailable
    ? "Enviar mensaje por WhatsApp"
    : "No disponible";

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            className="bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer"
            onClick={handleSendMessage}
            disabled={!isAvailable}
          >
            <WhatSappIcon />
            {isAvailable ? "Enviar mensaje" : "No disponible"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{msTooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
