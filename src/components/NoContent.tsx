import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NoContent({
  url,
  url_redirect,
  text,
  text_btn,
}: {
  url: string;
  url_redirect: string;
  text: string;
  text_btn: string;
}) {
  return (
    <div className="text-center flex flex-col p-6 rounded-md space-y-6">
      <p className="text-muted-foreground">{text}</p>
      <Button asChild className="group sm:ml-auto md:w-2/6 mx-auto">
        <Link href={url}>
          <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
          {text_btn}
        </Link>
      </Button>
      <Link
        href={url_redirect}
        className="group inline-flex justify-center items-center mx-auto w-28 gap-1 px-3 py-2 rounded-md  text-base  transition"
      >
        <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
        <span>Volver</span>
      </Link>
    </div>
  );
}
