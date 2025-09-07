
"use client"

import { CardResources } from "./components/CardResources";

const itemsCard = [
    {
        title: "Recursos web",
        image: "/images/web.png",
        href: "/resources/web",
        text: "Colección de herramientas, frameworks y documentación para el desarrollo web.",
    },
    {
        title: "Recursos para desarrolladores móviles",
        image: "/images/mobile.png",
        href: "/resources/mobile",
        text: "SDKs, guías y plantillas para crear apps móviles en iOS y Android.",
    },
    {
        title: "Bases de datos",
        image: "/images/database.png",
        href: "/resources/databases",
        text: "Documentación y ejemplos de SQL, NoSQL y herramientas de gestión de datos.",
    },
    {
        title: "Herramientas de diseño",
        image: "/images/design.png",
        href: "/resources/design",
        text: "Plantillas, iconos y recursos para mejorar la experiencia visual de tus proyectos.",
    },
    {
        title: "Inteligencia Artificial",
        image: "/images/ai.png",
        href: "/resources/ai",
        text: "Modelos, librerías y documentación para proyectos con IA y machine learning.",
    },
    {
        title: "Ciberseguridad",
        image: "/images/security.png",
        href: "/resources/security",
        text: "Buenas prácticas, guías y herramientas para proteger aplicaciones y datos.",
    },
    {
        title: "APIs y Servicios",
        image: "/images/api.png",
        href: "/resources/apis",
        text: "Directorio de APIs públicas, documentación y ejemplos de integración.",
    },
    {
        title: "Cloud & DevOps",
        image: "/images/cloud.png",
        href: "/resources/cloud",
        text: "Guías para AWS, GCP, Azure, despliegues, CI/CD y contenedores.",
    },
    {
        title: "Inicio",
        image: "/images/home.png",
        href: "/",
        text: "Regresa a la página principal.",
    },
];


export default function ResourcesPage() {
    return (
        <>
            <div className="min-h-screen  p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {itemsCard.map((item, i) => (
                        <div className="bg-white rounded-lg shadow-md p-5" key={i}>
                            <h3 className="text-lg font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {item.text}
                            </p>
                            <a
                                href="#"
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                            >
                                Ver recurso
                            </a>
                        </div>

                    ))}

                </div>
                {/* <CardResources /> */}
            </div>

        </>
    )
}
