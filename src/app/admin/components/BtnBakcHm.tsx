
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BtnBackHm({ url }: { url: string }) {
  return (
    <Link href={url}>
      <Button className="w-fit mb-5 cursor-pointer" variant={"outline"}>
        <ArrowLeft /> Regresar
      </Button>
    </Link>
  );
}
