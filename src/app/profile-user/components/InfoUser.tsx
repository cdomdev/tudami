
import { useSession } from "@/context/context.sesion"
import { Label } from "@/components/ui/label";

export function InfoUser() {
    const { user } = useSession();
    return (
        <div className="space-y-4">
            <div>
                <Label className="text-sm text-muted-foreground">Nombre:</Label>
                <p className="text-base font-medium text-accent-foreground">
                    {user?.full_name || "No disponible"}
                </p>
            </div>

            <div>
                <Label className="text-sm text-muted-foreground">Correo:</Label>
                <p className="text-base font-medium text-accent-foreground">
                    {user?.email || "No disponible"}
                </p>
            </div>

            <div>
                <Label className="text-sm text-muted-foreground">Teléfono:</Label>
                <p className="text-base font-medium text-accent-foreground">
                    {user?.phone || "No disponible"}
                </p>
            </div>
        </div>
    )
}