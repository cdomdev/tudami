import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-16 space-y-12 mt-20">
            <header className="text-center space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-pretty">Acerca de Tudami</h1>
                <p className="text-lg text-muted-foreground">
                    Aprende con otros. Comparte con todos.
                </p>
            </header>

            <article className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold">¿Qué es Tudami?</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Tudami</strong> es una plataforma colaborativa diseñada para
                    que aprendices, estudiantes y entusiastas del conocimiento puedan
                    <span className="font-medium"> publicar sus dudas, compartir experiencias y ofrecer ayuda</span>.
                    Creemos que la mejor forma de aprender es junto a otros,
                    resolviendo problemas reales y construyendo comunidad.
                </p>
            </article>

            <article className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold">Nuestra misión</h2>
                <p className=" text-gray-700 dark:text-gray-300">
                    Democratizar el acceso al conocimiento y crear un espacio donde
                    <em> nadie se quede con la duda</em>. Queremos que cualquier persona,
                    sin importar su nivel, encuentre apoyo para avanzar en sus proyectos
                    y en su formación profesional.
                </p>
            </article>

            <article className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold">¿Cómo funciona?</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Publica tus preguntas en la comunidad.</li>
                    <li>Explora dudas ya resueltas por otros aprendices.</li>
                    <li>Postúlate para ayudar en ofertas y comparte tu experiencia.</li>
                    <li>Construye una red de apoyo mutuo para crecer juntos.</li>
                </ul>
            </article>

            <article className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold">Nuestros valores</h2>
                <p>
                    Tudami se sostiene sobre tres principios fundamentales:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Colaboración:</strong> aprender no es un camino solitario.</li>
                    <li><strong>Confianza:</strong> compartimos para crecer, no para competir.</li>
                    <li><strong>Accesibilidad:</strong> el conocimiento debe estar al alcance de todos.</li>
                </ul>
            </article>

            <footer className="text-center space-y-6">
                <h2 className="text-lg md:text-xl font-bold">Únete a la comunidad</h2>
                <p className="text-balance">
                    Si tienes una duda, publícala.
                    Si tienes una respuesta, compártela.
                    Porque <span className="font-semibold">en Tudami todos aprendemos con todos</span>.
                </p>
                <Link
                    href="/auth/login"
                >
                    <Button variant={"default"}
                        className="cursor-pointer"
                    >
                        <User className="w-4 h-4" />
                        Crear una cuenta en tudami
                    </Button>
                </Link>
            </footer>
        </section>
    );
}
