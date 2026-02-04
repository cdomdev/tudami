"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteNews } from "../_lib/news";
import { Spinner } from "@/components/ui/spinner";
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

export function BtnDeleteNews({ news_id, onDelete }: { news_id?: number; onDelete?: (id: number) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await deleteNews(news_id);
      if (res.success) {
        toast.success("Noticia eliminada con éxito");
        if (onDelete && news_id) {
          onDelete(news_id);
        } else {
          window.location.reload();
        }
      } else {
        toast.error("Error al eliminar la noticia, intenta nuevamente");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la noticia, intenta más tarde");
    } finally {
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
            Eliminar noticia
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Eliminar noticia</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas
              eliminar esta noticia?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleDelete}
              variant={"destructive"}
              className="cursor-pointer"
            >
              {isLoading && <Spinner />}
              {isLoading ? "Eliminando..." : "Eliminar noticia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}