import { ButtonCs } from "../components/ui/Button"
import { Plus } from "lucide-react"

export default function PageResourcesAmd() {
    return (
        <section className="flex justify-between ">
            <div>
                <h1 className="text-lg md:text-2xl mb-3">Recursos</h1>
                <p className="text-foreground">Recursos recomendados por la comunidad</p>
            </div>
            <ButtonCs text="Agregar nuevo recurso" icon={Plus} variant={"default"} className="group" href="/admin/resources/new" />
        </section>
    )
}