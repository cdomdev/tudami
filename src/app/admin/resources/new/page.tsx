import { FormNewResounce } from "../../components/form/Form"

export default function PageNewResource() {
    return (
        <div className="py-3 grid place-content max-w-2xl mx-auto  ">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                    Agregar un nuevo recurso
                </h1>
            </div>
            <FormNewResounce isAdmin={true} />
        </div>
    )
}