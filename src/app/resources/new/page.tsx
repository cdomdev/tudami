import { FormNewResounce } from "@/app/admin/components/form/Form";

export default function PageNewResource() {
  return (
    <>
      <h1 className="max-w-2xl mx-auto mb-4 text-2xl font-bold text-center mt-5">
        Proponer un nuevo recurso
      </h1>
      <p className="max-w-2xl px-2 mx-auto mb-10 dark:text-gray-300 text-wrap">
        Este espacio está pensado para que la comunidad comparta herramientas,
        cursos, documentación o materiales útiles. Completa el formulario con
        los detalles del recurso y nuestro equipo lo revisará antes de
        publicarlo.
      </p>
      <div className="max-w-2xl mx-auto mb-5 px-2">
        <FormNewResounce isAdmin={false} urlRedirect="/resources/success" />
      </div>
    </>
  );
}
