
export async function subscribe(email: string) {
  const url = "api/subcription/new";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return data;
}
