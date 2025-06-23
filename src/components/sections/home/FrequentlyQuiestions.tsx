import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FrequentlyQuestions() {
  const itemsAcordion = [
    {
      value: "item-1",
      title: "¿Qué es Tudami y cómo funciona?",
      content: [
        "Tudami es una plataforma colaborativa donde aprendices pueden publicar sus dudas o solicitudes de tutoría, y otros usuarios pueden ofrecer ayuda.",
        "La idea es fomentar el aprendizaje entre pares, creando una comunidad solidaria dentro del entorno educativo.",
      ],
    },
    {
      value: "item-2",
      title: "¿Debo pagar por recibir o brindar ayuda?",
      content: [
        "No. Tudami es completamente gratuita. Cualquier aprendiz puede participar sin costo alguno, tanto para recibir como para ofrecer apoyo.",
        "En el futuro podríamos ofrecer funciones premium, pero la base del proyecto será siempre accesible para todos.",
      ],
    },
    {
      value: "item-3",
      title: "¿Cómo me postulo para ayudar en una oferta?",
      content: [
        "Simplemente inicia sesión, encuentra una oferta que te interese y haz clic en 'Postularme'. Podrás ponerte en contacto con el aprendiz mediante WhatsApp o correo electrónico.",
        "Recuerda ser respetuoso y claro en tu comunicación. Nuestro objetivo es crear un espacio seguro y útil para todos.",
      ],
    },
    {
      value: "item-4",
      title: "¿Necesito registrarme para hacer preguntas?",
      content: [
        "Sí. Solo los usuarios registrados pueden publicar preguntas u ofertas, esto nos permite mantener la seguridad y el orden en la plataforma.",
        "Puedes registrarte fácilmente usando tu cuenta de Google o GitHub.",
      ],
    },
  ];

  return (
    <>
      <div className="text-center">
        <h4 className="text-center font-bold text-2xl md:text-3xl mb-3">
          Preguntas Frecuentes
        </h4>
        <p className="text-muted-foreground  mx-auto text-sm md:text-base text-pretty px-2">
          ¿Tienes dudas sobre cómo funciona Tudami o quieres conocer mejor la
          plataforma?
        </p>
        <p className="text-muted-foreground  mx-auto text-sm md:text-base text-balance">
          Aquí respondemos las preguntas más comunes para ayudarte a aprovechar
          al máximo la experiencia.
        </p>
      </div>

      <div className="my-10 w-11/12 md:w-full md:max-w-4xl mx-auto ">
        <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
          {itemsAcordion.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="bg-accent dark:bg-[#0d1828] rounded-lg shadow-sm mb-3 px-4 "
            >
              <AccordionTrigger className="md:text-lg cursor-pointer  ">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col text-pretty md:text-base  dark:bg-[#0b1422] px-4 py-2 ">
                {item.content.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
