type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
type Data = Record<string, any> | FormData;
type Body = string | FormData;

const formBodyAndHeaders = (
  data: Data,
): { body: Body; headers: Record<string, any> } => {
  if (data instanceof FormData) {
    return { body: data, headers: {} };
  }

  return {
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };
};

export const request = async <T>(
  url: string,
  method: RequestMethods,
  data: Record<string, any> | FormData,
): Promise<T> => {
  const { body, headers } = formBodyAndHeaders(data);

  const response = await fetch(url, {
    method: "PUT",
    body,
    headers,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.body;
};
