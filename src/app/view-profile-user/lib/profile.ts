export async function getQuestionUserBy(userId: string, approval: string | undefined) {
  if (!userId) {
    console.error("User ID is required to fetch questions");
    return [];
  }
  const url = `/api/view-profile/questions?id=${userId}&u_view_profile_p=${approval}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }
  const data = await response.json();
  return data;
}

/**
 * 
 * Fetches answers for a user by their ID and approval.
 * @param userId 
 * @param approval 
 * @returns 
 */
export async function getAnswerUserBy(
  userId: string,
  approval: string | undefined
) {
  if (!userId) {
    console.error("User ID is required to fetch answers");
    return [];
  }
  const url = `/api/view-profile/answers?id=${userId}&u_view_profile_p=${approval}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }

  const data = await response.json();
  return data;
}

export async function getTagsUserBy(userId: string, approval: string | undefined) {
  if (!userId) {
    console.error("User ID is required to fetch tags");
    return [];
  }
  const url = `/api/view-profile/tags?id=${userId}&u_view_profile_p=${approval}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching profile data");
  }

  const data = await response.json();
  return data;
}
