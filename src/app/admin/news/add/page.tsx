import { BtnBackHm } from "../../components/BtnBakcHm";
import { FormAddNews } from "../../components/form/FormAddNews";

export default function PageAddNews() {
  return (
    <main>
      <section className="py-3 max-w-4xl mx-auto">
        <BtnBackHm url="/admin/news" />
        <header>
          <h1 className="text-2xl font-bold text-center mb-16">
            Agregar Noticia
          </h1>
        </header>
      </section>
      <section className="lg:max-w-4xl mx-auto">
        <FormAddNews />
      </section>
    </main>
  );
}
