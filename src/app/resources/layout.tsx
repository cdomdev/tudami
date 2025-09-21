import { Metadata } from "next";
import Link from "next/link";
import { SectionNavNewResource } from "./components/SectionNavNewResource";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    default: "Recursos - Potencia tus habilidades",
    template: "%s | Tudami",
  },
  description:
    "Descube recursos que potencia tus habilidades. Aprende con otros. Comparte con todos.",
  metadataBase: new URL("https://tudami.com"),
  openGraph: {
    title: "Tudami",
    description: "Aprende con otros. Comparte con todos.",
    url: "https://tudami.com",
    siteName: "Tudami",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tudami App",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tudami",
    description: "Aprende con otros. Comparte con todos.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function LayoutRecourses({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemsHeadNav = [
    {
      title: "Cursos",
      href: "/resources?category=cursos",
      href_image: "/Courses.svg",
    },
    {
      title: "Herramientas",
      href: "/resources?category=tools",
      href_image: "/Tools.svg",
    },
    {
      title: "Documentación",
      href: "/resources?category=documentation",
      href_image: "/Folder.svg",
    },
    {
      title: "Videos",
      href: "/resources?category=videos",
      href_image: "/Video.svg",
    },
  ];

  return (
    <>
      <section className="pt-24 md:px-10 pb-10 w-full bg-gradient-to-r from-pink-200 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto flex flex-col mb-3">
          <h1 className="text-xl md:text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
            Recursos que potencian tu aprendizaje
          </h1>
          <span className="text-center text-base md:text-lg text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Explora
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            </span>

            <span className="text-green-600 dark:text-green-400 font-semibold">
              aprende
            </span>

            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            </span>

            <span className="text-red-700 dark:text-red-400 font-semibold">
              crece
            </span>
          </span>
        </div>
        <div className="md:max-w-6xl text-center mx-auto">
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
            Encuentra aquí una selección de herramientas, guías, tutoriales y
            plataformas que te ayudarán a resolver dudas y ampliar tus
            conocimientos. Desde documentación oficial hasta cursos gratuitos,
            todo está organizado por categorías y actualizado con frecuencia
            para que aprendas de forma más ágil y efectiva.
          </p>
        </div>
      </section>
      <section className="py-5">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-6  bg-gradient-to-t from-sky-700 dark:from-sky-600 to-red-900 dark:to-red-500 text-transparent bg-clip-text">
          Centro de Recursos
        </h2>
        <div className="mt-3 flex gap-3 justify-start lg:justify-center overflow-x-auto no-scrollbar p-2">
          {itemsHeadNav.map((item) => (
            <Link key={item.title} href={item.href}>
              <span className="px-3 py-1.5 flex gap-x-2 bg-gray-200 rounded-full text-black cursor-pointer hover:bg-gray-300 text-xs md:text-sm font-medium whitespace-nowrap">
                <Image
                  src={item.href_image}
                  alt="icon"
                  width={20}
                  height={20}
                />{" "}
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto py-10">{children}</section>
      <SectionNavNewResource />
    </>
  );
}
