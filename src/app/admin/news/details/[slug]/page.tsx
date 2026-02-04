import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabaseClient";
import { ArrowLeft, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("news").select("*");

  if (error) {
    console.error("Error fetching static params:", error);
    return [];
  }

  return data.map((r) => ({
    slug: r.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: resource, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !resource) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Noticia no encontrada</h1>
        <Link
          href="/admin/news"
          className="text-blue-600 dark:text-foreground underline mt-4 block"
        >
          <Button variant={"outline"}>
            <ArrowLeft /> Regresar a noticias
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        href="/admin/news"
        className="text-foreground  group flex gap-1 items-center transition-all duration-300 mb-7"
      >
        <Button variant={"outline"}>
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1" />
          Regresar a noticias
        </Button>
      </Link>
      <Image
        src={resource.image}
        alt={resource.title}
        width={1920}
        height={1080}
        loading="lazy"
        className="mb-6 rounded-2xl"
      />
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">
        {resource.title}
      </h1>
      <div
        className="mb-4 space-y-2 text-justify text-sm md:text-base leading-normal"
        dangerouslySetInnerHTML={{ __html: resource.description }}
      />
    </div>
  );
}
