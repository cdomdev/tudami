import { FormEditResounce } from "../../components/form/FormEdit";
import { BtnBackHm } from "../../components/BtnBakcHm";


export default function PageEditResource() {
  return (
    <div className="py-3 grid place-content max-w-2xl mx-auto">
      <BtnBackHm url="/admin/resources" />
      <div className="text-center mb-6">
        <h1 className="mb-3 text-2xl font-semibold text-slate-800 dark:text-white">
          Revisar recurso
        </h1>
        <p>
          Revisa el recurso, puede ser alguno de los propuestos por la
          comunidad, pude aprobar o rechazar el recurso.
        </p>
      </div>
      <FormEditResounce isAdmin={true} />
    </div>
  );
}
