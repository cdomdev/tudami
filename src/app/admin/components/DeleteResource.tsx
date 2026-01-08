"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteResource } from "../_lib/resources";
import { Spinner } from "@/components";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function BtnDeleteResource({ resource_id }: { resource_id?: number }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await deleteResource(resource_id);
      if (res.success) {
        toast.success("Recurso eliminado con exito");
        window.location.reload();
      } else {
        toast.error("Error al eliminar el recurso, intenta nuevamente");
      }
    } catch (error) {
      toast.error("Error al eliminar el recurso, intenta mas tarde");
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <form onSubmit={handleDelete}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="font-normal w-full hover:bg-red-300 inline-flex items-start justify-start px-2 text-left hover:cursor-pointer"
          >
            Eliminar recurso
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Eliminar recurso</DialogTitle>
            <DialogDescription>
              Esta accion no se puede deshacer. ¿Estás seguro de que deseas
              eliminar este recurso?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleDelete}
              variant={"destructive"}
              className="cursor-pointer"
            >
              {isLoading && <Spinner />}
              {isLoading ? "Eliminando..." : "Eliminar recurso"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
