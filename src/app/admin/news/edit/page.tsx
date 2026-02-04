import { FormEditNew } from "../../components/form/FormEditNew";
import { BtnBackHm } from "../../components/BtnBakcHm";

export default function PageEditNew() {
  return (
    <main>
      <div className="py-3 grid place-content max-w-2xl mx-auto">
        <BtnBackHm url="/admin/news" />
        <div className="text-center mb-6">
          <h1 className="mb-3 text-2xl font-semibold text-slate-800 dark:text-white">
            Revisar noticia
          </h1>
        </div>
        <FormEditNew />
      </div>
    </main>
  );
}
