"use client";

import { useSearchParams } from "next/navigation";
import resources from "@/content/resources/resources.json";
import { CardResources } from "./components/CardResources";
import Link from "next/link";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
}

const allowedCategories = [
  "cursos",
  "herramientas",
  "documentacion",
  "videos",
] as const;
type Category = (typeof allowedCategories)[number];

const typedResources: Record<Category, ResourceItem[]> = resources;

export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const page = (searchParams.get("page") as Category) || "cursos";

  const categoria: Category = allowedCategories.includes(page)
    ? page
    : "cursos";

  const items = typedResources[categoria];

  if (!items.length) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Categoría no encontrada</h2>
        <p className="text-gray-500 mt-2">
          Verifica la URL: cursos, herramientas, documentacion o videos.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link href={`/resources/details/${item.id}`} key={item.id}>
            <CardResources {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
