import { supabase } from "@/lib/supabase"

export default function Home() {
    const loginWith = async (provider: "google" | "github") => {
        await supabase.auth.signInWithOAuth({ provider });
    };

    return (
        <>
            <h2>Estan son las opciones de atuh</h2>
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
        </>
    );
}
