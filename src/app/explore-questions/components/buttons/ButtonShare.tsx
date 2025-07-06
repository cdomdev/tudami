"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export function ButtonShare({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    const currentUrl = url || window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: text || title,
          url: currentUrl,
        });
      } else {
        await navigator.clipboard.writeText(currentUrl);
        alert("Enlace copiado al portapapeles");
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="ghost"
      size="icon"
      className="cursor-pointer"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
