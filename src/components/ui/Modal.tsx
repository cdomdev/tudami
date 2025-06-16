import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";

interface ModalProps {
  modalTitle: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Modal({
  modalTitle,
  isOpen,
  onOpenChange,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[425px] [&>button:last-child]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">{modalTitle}</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 rounded-md cursor-pointer p-2 text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-0 focus:ring-ring border-gray-200 border"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogClose>

        {children}
      </DialogContent>
    </Dialog>
  );
}
