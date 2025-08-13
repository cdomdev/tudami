export async function applyOffer(offer_id: number, user_id: string) {
    const path = `/api/offers/explore/apply?offer_id=${offer_id}&user_id=${user_id}`;
    const res = await fetch(path, { method: "POST" });

    if (!res.ok) throw new Error("Error on apply offer");

    return await res.json();
}

export async function deleteApplyOffer(offer_id: number, user_id: string) {
    const path = `/api/offers/explore/delete?offer_id=${offer_id}&user_id=${user_id}`;
    const res = await fetch(path, { method: "DELETE" });

    if (!res.ok) throw new Error("Error on delete apply");

    return await res.json();
}

export async function toggleApply(offer_id: number, user_id: string) {
    const path = `/api/offers/explore/toggle?offer_id=${offer_id}&user_id=${user_id}`;
    const res = await fetch(path, { method: "POST" });

    if (!res.ok) throw new Error("Error on toggle apply");

    return await res.json();
}
