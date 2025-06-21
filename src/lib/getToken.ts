export async function getToken() {
  try {
    const response = await fetch("/api/getToken", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
    return null;
  } catch (error) {
    console.error("Error feching token", error);
    return null;
  }
}
