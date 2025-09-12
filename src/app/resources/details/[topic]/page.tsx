
import resources from "@/content/resources/resources.json";
import Image from "next/image";
import Link from "next/link";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  details?: Array<{ title: string; content: string }> | string;
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  // aplanar todas las categorías
  const allResources: ResourceItem[] = Object.values(resources).flat();
  const resource = allResources.find((r) => r.id === topic);

  if (!resource) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Recurso no encontrado</h2>
        <p className="text-gray-500 mt-2">
          El recurso con ID {topic} no existe.
        </p>
        <Link href="/resources" className="text-blue-600 underline mt-4 block">
          ← Volver a recursos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8">
      <Image
        src={resource.image}
        alt={resource.title}
        width={1920}
        height={1080}
        className="mb-6 rounded-2xl"
      />
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
      <p className="text-gray-700 mb-4">
        {Array.isArray(resource.details)
          ? resource.details.map((detail) => (
              <div key={detail.title}>
                <h2 className="font-semibold">{detail.title}</h2>
                <p>{detail.content}</p>
              </div>
            ))
          : resource.details || resource.description}
      </p>
      <Link
        href={resource.url}
        target="_blank"
        className="text-blue-600 font-semibold hover:underline "
      >
        Ir al recurso externo →
      </Link>
    </div>
  );
}
