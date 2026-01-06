import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BtnBackHm() {
  return (
    <Link href="/admin/resources">
      <Button className="w-fit mb-5 cursor-pointer" variant={"outline"}>
        <ArrowLeft /> Regresar
      </Button>
    </Link>
  );
}
