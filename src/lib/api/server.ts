

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const MutateData = async <T,>(
  path: string,
  data: T,
  method = "POST",
) => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const ServerFetch = async (path: string) => {
  // console.log("URL check:", serverUrl)
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};
