
"use client"
export default function ResourcesPage() {
    return (
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

    )
}
