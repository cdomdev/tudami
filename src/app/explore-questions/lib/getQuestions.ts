
/**
 *
 * This function fetches general questions with pagination
 */
export async function fetchGeneralQuestionsApi(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const url = `/api/explore-questions/general-questions?page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    console.error("Error fetching general questions:", data.statusText);
    throw new Error("Failed to fetch general questions");
  }

  const { questions, total } = await data.json();
  console.log("Fetching general questions from API:", { questions, total });

  return { questions, total };
}

export async function getPopularQuestionsApi(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const url = `/api/explore-questions/popular-questions?page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error fetching popular questions:", res.statusText);
    throw new Error("Failed to fetch popular questions");
  }

  const data = await res.json();

  return data || [];
}

export async function getUnansweredQuestionsApi(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const url = `/api/explore-questions/unanswer-questions?page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("Error fetching unanswered questions:", res.statusText);
    throw new Error("Failed to fetch unanswered questions");
  }
  const data = await res.json();

  return data ?? [];
}

export async function getMyQuestionsApi(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const url = `/api/explore-questions/my-questions?page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error fetching my questions:", res.statusText);
    throw new Error("Failed to fetch my questions");
  }

  const data = await res.json();

  return data ?? [];
}

export async function getQuestionsByIdApi(
  page = 1,
  pageSize = 10,
  search?: string,
  id?: string
) {
  const url = `/api/explore-questions/question-by-id?id=${id}&page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("Error fetching question by ID:", res.statusText);
    throw new Error("Failed to fetch question by ID");
  }

  const data = await res.json();
  return data || [];
}

/**
 * This function fetches questions by a specific tags selected by the user.
 * It retrieves the tag ID based on the slug and then fetches questions that contain that tag
 */

export async function getQuestionsByTagApi(
  tagSlug: string,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const url = `/api/explore-questions/questions-by-tag?slug=${tagSlug}&page=${page}&pageSize=${pageSize}${
    search ? `&search=${search}` : ""
  }`;


  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error fetching questions by tag:", res.statusText);
    throw new Error("Failed to fetch questions by tag");
  }
  const data = await res.json();
  console.log("Fetching questions by tag from API:", data);

  return data || [];
}
