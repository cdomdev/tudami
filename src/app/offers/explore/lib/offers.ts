export async function getAllOffers(page = 1, pageSize = 10) {
  const path = `/api/offers/explore/get-all-offers?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error feching data offers");
    throw new Error("Failed to fech data offers");
  }

  const data = await response.json();
  return data ?? [];
}

export async function getPopularOffers(page = 1, pageSize = 10) {
  const path = `/api/offers/explore/get-popular-offers?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error feching data offers");
    throw new Error("Failed to fech data offers");
  }

  const data = await response.json();

  return data ?? [];
}

export async function getOffersById(page = 1, pageSize = 10, id?: string) {
  const path = `/api/offers/explore/get-offer-by-id?page=${page}&pageSize=${pageSize}&id=${id}`;

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error feching data offers");
    throw new Error("Failed to fech data offers");
  }

  const data = await response.json();

  return data ?? [];
}

export async function getUnansweredOffers(page = 1, pageSize = 10) {
  const path = `/api/offers/explore/get-unanswered-offers?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error feching data offers");
    throw new Error("Failed to fech data offers");
  }

  const data = await response.json();
  return data ?? [];
}

export async function getMyOffersApi(page = 1, pageSize = 10) {
  const path = `/api/offers/explore/get-my-offers?page=${page}&pageSize=${pageSize}`;

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Error feching data offers");
    throw new Error("Failed to fech data offers");
  }

  const data = await response.json();

  console.log("Fetched offers --->[API OFFERS CLIENT]:", data);

  return data ?? [];
}
