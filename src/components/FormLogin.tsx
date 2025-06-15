"use client"
import { useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase"
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
export default function FormLogin() {
    const [open, setOpen] = useState(false);

    const loginWith = async (provider: "google" | "github") => {
        await supabase.auth.signInWithOAuth({ provider });
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="ghost">
                <span className="bg-blue-500 rounded-full p-2">
                    <User className="size-5" />
                </span>
                <span className="hidden md:flex">
                    Iniciar sesion
                </span>

            </Button >
            <Modal
                modalTitle="Crear pregunta"
                isOpen={open}
                onOpenChange={setOpen}
            >
                <h4>Estan son las opciones de atuh</h4>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => loginWith("google")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Iniciar sesión con Google
                    </button>
                    <button
                        onClick={() => loginWith("github")}
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        Iniciar sesión con GitHub
                    </button>
                </div>
            </Modal>

        </>
    );
}

