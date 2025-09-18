import { FormEditResounce } from "../../components/form/FormEdit";

export default function PageEditResource() {
  return (
    <div className="py-3 grid place-content max-w-2xl mx-auto  ">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Editar recurso
        </h1>
      </div>
      <FormEditResounce isAdmin={true} />
    </div>
  );
}
