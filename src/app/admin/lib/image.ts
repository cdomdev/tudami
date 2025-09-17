
export async function uploadImage(file: File, slug: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);

    try {
        const res = await fetch(`/api/admin/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            console.error("Error en API upload:", data);
            throw new Error(
                data?.error || `Error al subir la nueva imagen de perfil`
            );
        }

        return data;
    } catch (error) {
        console.error("Error en uploadImage:", error);
        return null;
    }
}