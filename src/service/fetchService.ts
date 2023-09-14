export type fethMethod = "POST" | "PUT" | "DELETE";

export default function fetchOptions<T>(method: fethMethod, body: T) {
  const fetchOptions = {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetchOptions;
}
