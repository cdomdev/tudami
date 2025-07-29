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


export async function getAnswerUserBy(userId: string) {
  if (!userId) {
    console.error("User ID is required to fetch answers");
    return [];
  }
  const response = await fetch(`/api/profile/answers?id=${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }

  const data = await response.json();
  return data;
}


export async function getTagsUserBy(userId: string) {
  if (!userId) {
    console.error("User ID is required to fetch tags");
    return [];
  }
  const response = await fetch(`/api/profile/tags?id=${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }

  const data = await response.json();
  return data;
}