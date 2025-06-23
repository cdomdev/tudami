import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Editor() {
  return (
    <div className="flex flex-col px-4 ">
      <h1 className="text-center font-semibold mb-10 text-2xl md:text-4xl text-primary">
        ¿En qué necesitas ayuda?
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 w-full p-6 bg-accent border rounded-lg shadow-sm">
          <div className="mb-6">
            <label htmlFor="titulo" className="font-semibold text-lg">
              Dale un título claro a tu pregunta
            </label>
            <input
              type="text"
              id="titulo"
              placeholder="Ej: ¿Cómo vincular varias evidencias en Sofiaplus?"
              className="w-full border py-2 px-3 mt-2 rounded-md focus:outline-none text-xs md:text-base focus:ring-1 focus:ring-primary bg-white text-black"
            />
          </div>

          <div>
            <span className="font-semibold text-lg block mb-3">
              Escribe tu pregunta con detalle
            </span>
            <SimpleEditor />
          </div>
        </div>

        <div className="md:col-span-2 border rounded-lg p-6 bg-muted shadow-md">
          <h3 className="font-semibold text-xl mb-4 text-primary">
            Antes de publicar tu pregunta
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <li>
              <strong>Explica lo que quieres lograr:</strong> No solo qué está
              fallando, sino qué esperabas que pasara.
            </li>
            <li>
              <strong>Cuenta el contexto:</strong> ¿Es una evidencia del SENA?
              ¿Un reto? ¿Un proyecto personal?
            </li>
            <li>
              <strong>Muestra lo que intentaste:</strong> Aunque no haya
              funcionado, eso ayuda a entender tu camino.
            </li>
            <li>
              <strong>Habla con tus palabras:</strong> No necesitas usar
              términos técnicos, lo importante es que se entienda.
            </li>
            <li>
              <strong>Tu pregunta puede ayudar a otros:</strong> ¡Anímate a
              escribirla!
            </li>
          </ul>
          <div className="mt-5 text-sm text-muted-foreground italic">
            Cuanto más claro seas, más fácil será ayudarte.
          </div>
        </div>
      </div>
    </div>
  );
}
