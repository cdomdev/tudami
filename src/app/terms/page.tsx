// app/terms/page.tsx

export default function TermsPage() {
    return (
        <section className="max-w-4xl mx-auto px-6 py-12 mt-20">
            <h1 className="text-3xl font-bold mb-6">Términos de Uso</h1>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Bienvenido a <strong>Tudami</strong>. Al acceder y utilizar nuestra plataforma,
                aceptas los siguientes términos y condiciones. Te recomendamos leerlos
                detenidamente antes de hacer uso de nuestros servicios.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">1. Aceptación de términos</h2>
            <p className="mb-4">
                Al registrarte o usar Tudami, confirmas que entiendes y aceptas cumplir
                con estos Términos de Uso. Si no estás de acuerdo con ellos, te pedimos
                que no uses la plataforma.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">2. Uso adecuado de la plataforma</h2>
            <p className="mb-4">
                Tudami es un espacio para el intercambio de conocimiento. Por ello, queda prohibido:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Publicar contenido ofensivo, discriminatorio o ilegal.</li>
                <li>Compartir información personal de terceros sin su consentimiento.</li>
                <li>Usar la plataforma con fines comerciales no autorizados.</li>
                <li>Intentar vulnerar la seguridad de Tudami o de sus usuarios.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">3. Propiedad intelectual y contenido</h2>
            <p className="mb-4">
                El contenido publicado por los usuarios (preguntas, respuestas u ofertas) sigue siendo
                de su propiedad intelectual. No obstante, al compartirlo en Tudami, otorgas
                a la plataforma una licencia no exclusiva para mostrarlo y permitir su consulta
                con fines educativos, permanentes o de archivo.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">4. Eliminación de cuenta y tratamiento de datos personales</h2>
            <p className="mb-4">
                Si decides eliminar tu cuenta en Tudami, procederemos de la siguiente manera:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>
                    Toda tu información personal (nombre, correo, foto de perfil, etc.) será eliminada
                    o reemplazada por datos anónimos (anonimización).
                </li>
                <li>
                    Tus aportes —preguntas, respuestas u ofertas— se conservarán en forma anonimizada,
                    porque forman parte del conocimiento compartido con la comunidad.
                </li>
                <li>
                    Esto implica que tu contribución seguirá estando disponible para ayudar a otros,
                    pero ya no estará vinculada a tu identidad real.
                </li>
            </ul>
            <p className="mb-4">
                Adoptamos esta práctica para mantener la integridad de los hilos de discusión
                y preservar el valor del conocimiento generado en la comunidad, sin comprometer
                tu derecho a la privacidad.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">5. Derechos de los usuarios / Protección de datos personales (Colombia)</h2>
            <p className="mb-4">
                En cumplimiento de la Ley Estatutaria 1581 de 2012 de Protección de Datos
                Personales y sus decretos reglamentarios (como el Decreto 1377 de 2013), todo usuario
                (“Titular”) tiene los siguientes derechos irrenunciables:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Conocer qué datos personales hemos recolectado y con qué finalidad.</li>
                <li>Solicitar la actualización o rectificación de datos incorrectos o incompletos.</li>
                <li>Solicitar la supresión de datos personales cuando ya no sean necesarios para la finalidad
                    con la que fueron recolectados o cuando retires tu autorización.</li>
                <li>Revocar la autorización otorgada al tratamiento de tus datos, sin que ello afecte
                    la legalidad del tratamiento previo.</li>
                <li>Ser informado sobre terceros a quienes se les haya comunicado o transferido tus datos.</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) en caso
                    de vulneración de tus derechos en materia de datos.</li>
            </ul>

            <p className="mb-4">
                Tudami se compromete a tratar tus datos de acuerdo con los principios de:
                legalidad, finalidad, veracidad, transparencia, acceso y circulación restringida,
                seguridad y confidencialidad, conforme a la normatividad colombiana.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">6. Transferencia internacional de datos</h2>
            <p className="mb-4">
                Si tus datos se transfieren o alojan fuera de Colombia, lo haremos solo cuando el país receptor
                ofrezca un nivel adecuado de protección o con tu autorización expresa. En los casos en que
                la transferencia requiera autorización de la Superintendencia de Industria y Comercio,
                cumpliremos con dichos requisitos.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">7. Suspensión y cancelación de cuentas</h2>
            <p className="mb-4">
                Tudami se reserva el derecho de suspender o cancelar cuentas que violen estos Términos,
                como en casos de conducta abusiva, publicación de contenido ilegal o intentos de dañar
                la plataforma.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">8. Limitación de responsabilidad</h2>
            <p className="mb-4">
                Tudami no garantiza la veracidad ni precisión de las respuestas publicadas por los usuarios.
                La plataforma actúa como facilitador del intercambio de conocimiento, no como consultor
                profesional ni sustituto de asesoramiento especializado.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">9. Modificaciones a los términos</h2>
            <p className="mb-4">
                Nos reservamos el derecho a modificar estos Términos en cualquier momento. Las versiones
                actualizadas serán publicadas aquí con su correspondiente fecha de última actualización.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">10. Legislación aplicable y jurisdicción</h2>
            <p className="mb-4">
                Estos Términos se rigen por las leyes colombianas. En caso de disputa, los tribunales
                competentes en Colombia serán los encargados de resolverla.
            </p>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Última actualización: Octubre 2025.
            </p>
        </section>
    );
}
