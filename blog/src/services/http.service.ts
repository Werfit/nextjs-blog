type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
type Data = Record<string, unknown> | FormData;
type Body = string | FormData;

const formBodyAndHeaders = (data: Data): { body: Body; headers: Headers } => {
  const headers = new Headers();

  if (data instanceof FormData) {
    return { body: data, headers };
  }

  headers.append("Content-type", "application/json");
  return {
    body: JSON.stringify(data),
    headers,
  };
};

export const request = async <T>(
  url: string,
  method: RequestMethods,
  data: Record<string, unknown> | FormData,
): Promise<T> => {
  const { body, headers } = formBodyAndHeaders(data);

  const response = await fetch(url, {
    method,
    body,
    headers,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.body;
};
