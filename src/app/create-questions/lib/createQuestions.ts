
export async function createQuestion(
  title: string,
  content: string,
  tags: string[] = []
) {
  const url = "/api/create-questions/new";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, tags }),
  });

  if (!response.ok) {
    throw new Error("Error al crear la pregunta");
  }

  const { data, datainsignia } = await response.json();
  return {
    success: true,
    data,
    datainsignia,
  };
}
