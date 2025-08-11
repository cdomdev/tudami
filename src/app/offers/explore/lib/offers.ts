
export async function getAllOffers(page = 1, pageSize = 10) {
    const path = `/api/offers/explore/getAllOffers?page=${page}&pageSize=${pageSize}`

    const response = await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })


    if (!response.ok) {
        console.error("Error feching data offers")
        throw new Error("Failed to fech data offers")
    }

    const { offers, count } = await response.json()


    return { offers,  count }
}

