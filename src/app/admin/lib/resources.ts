import {SchemaResources} from "@/schemas"

export async function saveResource(data: SchemaResources) {
    try {
        const res = await fetch(`/api/admin/resources/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error("Error en el proceso de subida de los recursos")
        }
        
        const dataJson = await res.json();
        return dataJson;
    } catch (error) {
        console.log("Error en el proceso de subida de los recursos")
    }
}