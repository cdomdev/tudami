export async function addOffer(title: string, content: string) {
  const url = "/api/offers/create/new";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error("Error al crear la pregunta");
  }

  const { data } = await response.json();

  return {
    success: true,
    data,
  };
}
