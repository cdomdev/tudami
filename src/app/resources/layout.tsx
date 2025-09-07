import { SearchInput } from "./components/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Recursos que potencia tus habilidades",
        template: "%s | Tudami",
    },
    description: "Descube recursos que potencia tus habilidades. Aprende con otros. Comparte con todos.",
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

    return (
        <>
            <section className="pt-24 px-10 pb-10 w-full bg-gradient-to-r from-pink-200 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto flex flex-col mb-3">
                    <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
                        Recursos que potencian tu aprendizaje
                    </h1>
                    <span className="text-center text-lg text-muted-foreground flex items-center justify-center gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Explora</span>
                        <span>
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                        </span>

                        <span className="text-green-600 dark:text-green-400 font-semibold">aprende</span>

                        <span>
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                        </span>

                        <span className="text-red-700 dark:text-red-400 font-semibold">crece</span>
                    </span>
                </div>
                <div className="md:max-w-6xl text-center mx-auto">
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                        Encuentra aquí una selección de herramientas, guías, tutoriales y plataformas que te ayudarán a resolver dudas y ampliar tus conocimientos.  Desde documentación oficial hasta cursos gratuitos, todo está organizado por categorías y actualizado con frecuencia para que aprendas de forma más ágil y efectiva.
                    </p>
                </div>
            </section>
            <section className="py-10">
                <h2 className="text-3xl font-bold text-center mb-6">Centro de Recursos</h2>
                <SearchInput />
                <div className="mt-7 flex flex-wrap justify-center gap-3 mb-8">
                    {["📚 Guías", "🛠️ Herramientas", "📄 Documentación", "🎥 Videos"].map(
                        (cat) => (
                            <span
                                key={cat}
                                className="px-4 py-2 bg-gray-200 rounded-full text-black cursor-pointer hover:bg-gray-300  md:text-sm font-medium"
                            >
                                {cat}
                            </span>
                        )
                    )}
                </div>
            </section>
            <section className="max-w-6xl mx-auto">
                {children}
            </section>
        </>
    );
}

