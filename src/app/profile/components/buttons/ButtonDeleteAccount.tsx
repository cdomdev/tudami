"use client";
import { useSession } from "@/context/context.sesion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import { deleteAccount } from "../../lib/profile";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components";

export function DeleteAccount() {
  const [loading, setLoading] = useState(false);

  const { user } = useSession();
  const userId = user?.id || "";

  async function handle() {
    setLoading(true);
    if (!userId) {
      toast.error(
        "No podemos proceder con la solicitud en el momento, intentalo mas tarde"
      );
      return;
    }

    try {
      const res = await deleteAccount(userId);
      console.log("Response from deleteAccount client:", res);
      toast.success("Tu cuenta ha sido eliminada exitosamente");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("No se pudo eliminar la cuenta, intentalo mas tarde");
      console.error("Error al eliminar la cuenta:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer">
              Solicito eliminar mi cuenta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar mi cuenta</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-slate-400 space-y-2">
              <p>
                A continuacon te explicamos un poco que pasa con tu informacion.
              </p>
              <ul className="list-decimal pl-6">
                <li>Tu informacion personal sera eliminada.</li>
                <li>
                  Tus publicaciones permaneceran bajo un perfil con datos
                  anonimos.
                </li>
              </ul>
              <span>
                Quieres saber un poco mas al respeccto, por favor visita los
                <Link
                  href={"/terms"}
                  className="underline pl-1 text-blue-500 hover:text-blue-600"
                >
                  terminos de uso
                </Link>
              </span>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="button" onClick={handle} className="cursor-pointer">
                {loading && <Spinner className="ml-2 w-4 h-4 text-gray-500" />}
                {loading ? "Eliminando" : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
