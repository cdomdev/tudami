import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { DetailsResource } from "@/schemas/schema.form_resources";

interface PageProps {
  params: { topic: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Preconstruir rutas estáticas
export async function generateStaticParams(): Promise<{ topic: string }[]> {
  const { data, error } = await supabase.from("resources").select("slug");

  if (error) {
    console.error("Error fetching static params:", error);
    return [];
  }

  return (data || []).map((r) => ({
    topic: r.slug as string,
  }));
}

// Página de detalle
export default async function ResourceDetailPage({ params }: PageProps) {
  const { topic } = params;

  const { data: resource, error } = await supabase
    .from("resources")
    .select("*, details_resources(*)")
    .eq("slug", topic)
    .single();

  if (error || !resource) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Recurso no encontrado</h2>
        <Link
          href="/resources"
          className="text-blue-600 dark:text-foreground underline mt-4 block"
        >
          ← Volver a recursos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 ">
      <Link
        href="/resources"
        className="text-foreground mb-4 group flex gap-1 items-center transition-all duration-300 pl-5"
      >
        <MoveLeft className="w-4 h-4 group-hover:-translate-x-1" />
        Volver a recursos
      </Link>
      <Image
        src={resource.url_image}
        alt={resource.title}
        width={1920}
        height={1080}
        loading="lazy"
        className="mb-6 rounded-2xl"
      />
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
      <div className=" mb-4">
        {Array.isArray(resource.details_resources)
          ? resource.details_resources.map((detail: DetailsResource) => (
              <div key={detail.title}>
                <h2 className="text-foreground text-lg mb-1">{detail.title}</h2>
                <p className="text-base font-normal text-foreground dark:text-gray-400 mb-7">
                  {detail.description}
                </p>
                <p className="text-base font-normal text-foreground mb-4">
                  Visita el recurso externo y fortalce tus habilidades
                </p>
                <Link
                  href={detail.url_resource || ""}
                  target="_blank"
                  className="text-blue-600 dark:text-foreground font-semibold flex items-center gap-x-1 group transition duration-300 border max-w-fit px-5 py-2 rounded-md dark:hover:bg-gray-100 dark:hover:text-black"
                >
                  Ir al recurso externo
                  <MoveRight className="w-4 h-4 group-hover:translate-x-1.5" />
                </Link>
              </div>
            ))
          : resource.details || resource.description}
      </div>
    </div>
  );
}
