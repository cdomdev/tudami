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

export function DeleteAccount() {
  const { user } = useSession();
  
  async function handle() {
    console.log("identidicador del usaurio", user?.id);
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="destructive">Solicito eliminar mi cuenta</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar mi cuenta</DialogTitle>
              <div className="text-sm text-slate-400 space-y-2">
                <p>
                  A continuacon te explicamos un poco que pasa con tu
                  informacion.
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
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="button" onClick={handle}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
