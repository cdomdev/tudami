export default function PageAbout() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Por qué vale la pena suscribirse
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Un boletín hecho para personas curiosas, prácticas y con ganas de estar al día.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
          <h2 className="text-xl font-semibold mb-2">Acceso sin límites</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Más que un correo, es la llave a todo el contenido del sitio.
            Artículos, novedades y recursos siempre disponibles para ti.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
          <h2 className="text-xl font-semibold mb-2">Noticias a tu ritmo</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cada edición llega directo a tu bandeja de entrada. 
            No tienes que buscar nada: la información viene a ti.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
          <h2 className="text-xl font-semibold mb-2">Una comunidad contigo</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Al suscribirte no solo recibes noticias, también compartes espacio 
            con personas que buscan lo mismo: aprender, crear y crecer.
          </p>
        </div>
      </div>
 
    </section>
  );
}
