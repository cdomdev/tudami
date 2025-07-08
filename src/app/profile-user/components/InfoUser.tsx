"use client"

import { useSession } from "@/context/context.sesion"
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function InfoUser() {
    const { user } = useSession();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // Mostrar skeleton mientras se hidrata
    if (!mounted) {
        return (
            <div className="space-y-4 animate-pulse">
                <div>
                    <Label className="text-sm text-muted-foreground">Nombre:</Label>
                    <div className="h-5 bg-muted rounded w-3/4 mt-1"></div>
                </div>
                <div>
                    <Label className="text-sm text-muted-foreground">Correo:</Label>
                    <div className="h-5 bg-muted rounded w-2/3 mt-1"></div>
                </div>
                <div>
                    <Label className="text-sm text-muted-foreground">Teléfono:</Label>
                    <div className="h-5 bg-muted rounded w-1/2 mt-1"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-3">
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