import { BtnBackHm } from "../../components/BtnBakcHm";
import { FormNewResource } from "../../components/form/Form";

export default function PageNewResource() {
  return (
    <div className="py-3 grid place-content max-w-2xl mx-auto  ">
      <BtnBackHm url="/admin/resources" />
      <div className="text-center my-10">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Agregar un nuevo recurso
        </h1>
      </div>
      <FormNewResource isAdmin={true} />
    </div>
  );
}
