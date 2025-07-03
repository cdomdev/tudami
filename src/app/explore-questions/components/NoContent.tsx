import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function NoContent() {
  return (
    <div className="text-center  bg-accent p-6 rounded-md space-y-6">
      <p className="text-muted-foreground">No se encontraron preguntas.</p>
      <Button asChild className="group sm:ml-auto w-2/6 mx-auto">
        <Link href="/create-questions">
          <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
          Nueva pregunta
        </Link>
      </Button>
    </div>
  );
}
