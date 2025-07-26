export async function getQuestionUserBy(userId: string) {
  if (!userId) {
    console.error("User ID is required to fetch questions");
    return [];
  }
  const response = await fetch(`/api/profile/questions?id=${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }
  const data = await response.json();
  return data;
}
