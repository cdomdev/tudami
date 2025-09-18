export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface QueryOptions {
  headers?: HeadersInit;
  timeout?: number;
}

export async function query(
  url: string,
  method: HttpMethod = "GET",
  body?: unknown,
  options: QueryOptions = {}
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeout || 30000
  );

  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const config: RequestInit = {
      method,
      headers,
      signal: controller.signal,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      return error;
    }

    return error;
  }
}
