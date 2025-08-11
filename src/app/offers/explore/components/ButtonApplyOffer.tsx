import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { toast } from "sonner";
export function ButtonApplytOffer({ user_id }: { user_id: string }) {
    const { user } = useSession()
    
    function apply() {
        if (user_id === user?.id) return toast("¡No puedes aplicar a tu propia oferta!")
        console.log(user_id)
    }

    return (
        <Button onClick={apply} className="flex items-center gap-1 cursor-pointer">
            <MousePointerClick className="w-4 h-4 " /> Aplicar a la oferta
        </Button>
    )
}