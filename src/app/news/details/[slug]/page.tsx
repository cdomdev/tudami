import { supabase } from "@/utils/supabase/supabaseClient";
import { ExternalLink, MoveLeft } from "lucide-react";
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
          href="/news"
          className="text-blue-600 dark:text-foreground underline mt-4 block"
        >
          ← Volver a noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        href="/news"
        className="text-foreground mb-4 group flex gap-1 items-center transition-all duration-300 pl-5"
      >
        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1" />
        Volver a noticias
      </Link>
      <Image
        src={resource.image}
        alt={resource.title}
        width={1920}
        height={1080}
        loading="lazy"
        className="mb-6 rounded-2xl"
      />
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">{resource.title}</h1>
      <div
        className="mb-4 space-y-2 text-justify text-sm md:text-base leading-normal"
        dangerouslySetInnerHTML={{ __html: resource.description }}
      />

      <Link
        href={resource.url_source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 mt-6 
                 bg-blue-600 hover:bg-blue-700 
                 text-white font-medium rounded-lg 
                 transition-colors shadow-md hover:shadow-lg"
      >
        Continuar lectura
        <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}
