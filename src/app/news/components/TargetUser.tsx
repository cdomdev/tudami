"use client";

import { useSession } from "@/context/context.sesion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { validateSubscribe, desSubscribe } from "../lib/new";
import { Button } from "@/components/ui/button";
import { Check, Mail, User } from "lucide-react";
import { alternativeSubcription } from "@/lib/subcription";
import { toast } from "sonner";
import { Spinner } from "@/components";
import Link from "next/link";

export function TargetUser() {
  const [isSubcribe, setIsSubcribe] = useState<boolean | undefined>(false);
  const [loadin, setLoading] = useState(false);
  const { user } = useSession();
  const email = user?.email || "";

  useEffect(() => {
    const fetch = async () => {
      const res = await validateSubscribe(email.toLowerCase());
      setIsSubcribe(res);
    };

    fetch();
  }, [email]);

  async function subcribe() {
    setLoading(true);
    try {
      const { error } = await alternativeSubcription(email);
      if (error) {
        toast.error(
          "Error: No pudimos proceder con la soliciutd, intentalo mas tarde"
        );
      }
      setIsSubcribe(true);
      toast.success("Te has suscrito correctamente. ¡Gracias!");
    } catch (error) {
      console.error("Erro al procesar la suscripcion", error);
      toast.error(
        "Error: No pudimos proceder con la soliciutd, intentalo mas tarde"
      );
    } finally {
      setLoading(false);
    }
  }
  async function handleDesubscribe() {
    try {
      const { error } = await desSubscribe(email);
      if (!error) {
        toast.error(
          "Error: No pudimos proceder con la soliciutd, intentalo mas tarde"
        );
      }
      setIsSubcribe(false);
      toast.success("Te suscripcion se cancelo correctamente.");
    } catch (error) {
      console.error("Erro al procesar la suscripcion", error);
      toast.error(
        "Error: No pudimos proceder con la soliciutd, intentalo mas tarde"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!user)
    return (
      <aside className="w-full space-y-4">
        <p className=" text-xs md:text-sm text-gray-600 dark:text-gray-400 text-pretty">
          Inicia sesion y suscribete al boletin de noticias
        </p>
        <Link href="/auth/login"  >
          <Button variant={"default"} className="cursor-pointer"><User /> Iniciar sesion</Button>
        </Link>
      </aside>
    );

  return (
    <aside className="w-full flex flex-col justify-start items-start">
      <Image
        src={user?.avatar_url || ""}
        alt="image profile user"
        width={40}
        height={40}
        className="rounded-md ml-6 mb-1"
      />
      <h2 className="font-semibold mb-1">
        Hola <strong>{user.full_name}</strong>
      </h2>
      <p className="text-xs text-gray-600 dark:text-gray-400 text-balance mb-6">
        Aqui encontraras noticias relacionadas a la programación.
      </p>
      {isSubcribe ? (
        <Button
          onClick={handleDesubscribe}
          className="inline-flex bg-blue-700/80 text-white hover:bg-blue-700 cursor-pointer dark:bg-blue-800/60  "
          variant={"secondary"}
        >
          <Check className="w-4 h-4" /> Suscrito
        </Button>
      ) : (
        <Button onClick={subcribe} className="cursor-pointer">
          {loadin ? (
            <Spinner className="w-4 h-4" />
          ) : (
            <Mail className="w-4 h-4" />
          )}

          {loadin ? "Suscribiendote..." : "Suscribrirme"}
        </Button>
      )}
    </aside>
  );
}
