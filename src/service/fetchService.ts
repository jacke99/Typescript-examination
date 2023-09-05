export default function fetchOptions<T>(method: string, body: T) {
  const fetchOptions = {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetchOptions;
}
