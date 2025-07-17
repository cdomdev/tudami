
"use client"
export default function ResourcesPage() {
    return (
        <section className="pt-30 px-10 pb-10 w-full bg-gradient-to-r from-pink-200 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="mx-auto flex flex-col mb-3">
                <h1 className="text-4xl font-bold text-center dark:text-slate-100 bg-gradient-to-tl from-blue-700 via-purple-600 to-red-500 text-transparent bg-clip-text">
                    Recursos que potencian tu aprendizaje
                </h1>
                <span className="text-center text-xl text-muted-foreground">
                    Explora, aprende, crece.
                </span>
            </div>
            <article className="md:max-w-5xl text-center mx-auto">
                <p className="text-sm md:text-base text-pretty">
                    Encuentra aquí una selección de herramientas, guías, tutoriales y plataformas que te ayudarán a resolver dudas y ampliar tus conocimientos.
                </p>
                <p className="text-sm md:text-base text-pretty">
                    Desde documentación oficial hasta cursos gratuitos, todo está organizado por categorías y actualizado con frecuencia para que aprendas de forma más ágil y efectiva.
                </p>
            </article>
        </section>

    )
}
