"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Confetti } from "@/components/Confetti";
export default function PageSuccess() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 px-4">
      <CheckCircle2 className="w-16 h-16 text-green-500" />
      <h1 className="text-2xl font-bold">🎉 ¡Gracias por tu contribución!</h1>
        <Confetti  />
      <p className="text-muted-foreground max-w-md">
        Tu recurso fue enviado correctamente y quedará pendiente de revisión.
        Apreciamos tu aporte para seguir construyendo una comunidad más fuerte.
      </p>

      <div className="flex gap-4 ">
        <Link href="/resources/new" className="cursor-pointer">
          <Button variant="default">Agregar otro recurso</Button>
        </Link>
        <Link href="/resources" className="cursor-pointer">
          <Button variant="outline">Volver a los recursos</Button>
        </Link>
      </div>
    </div>
  );
}
